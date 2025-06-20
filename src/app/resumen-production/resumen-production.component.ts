import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { combineLatest, Observable, startWith } from 'rxjs';
import { RestProduction } from '../RestClases/RestProduction';

interface ProductionByArea
{
	production_area:any;
	production_info:any[];
}


interface ProductionInfo {
	item: any;
	total: number;
	pieces: number;
	production_info_list: any[];
}

interface CategoryProduction {
	category: any;
	kgs: number;
	pieces: number;
	production_by_item: ProductionInfo[];
}

interface ProductionArea {
	production_area: any;
	category_production: CategoryProduction[];
}

type ProductionData = ProductionArea[];


@Component({
	selector: 'app-resumen-production',
	imports: [],
	templateUrl: './resumen-production.component.html',
	styleUrl: './resumen-production.component.css'
})
export class ResumenProductionComponent {
	rest_production: RestProduction;

	production_area_list:any[] = [];
	production_info_list:any[] = [];
	is_loading: boolean = false;
	item_info_list:any[] = [];
	structuredProductionData: ProductionData = [];


	constructor(public rest_service: RestService, public route: ActivatedRoute, router: Router)
	{
		this.rest_production = new RestProduction(rest_service);
	}

	ngOnInit()
	{
		this.getQueryParamObservable().subscribe(([query_params, param_map]) =>
		{
			let keys = query_params.keys;

			let obj:Record<string,string> = {};

			for(let key of keys)
			{
				obj[key] = query_params.get(key) as string;
			}

			if(!('created>=' in obj) )
			{
				let d = new Date();
				d.setHours(0,0,0,0);

				obj['created>~'] = d.toISOString().substring(0,19).replace('T',' ');
			}

			if(!('created<=' in obj) )
			{
				let d = new Date();
				d.setHours(0,0,0,0);
				d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
				d.setSeconds(d.getSeconds() - 1);

				obj['created<'] = d.toISOString().substring(0,19).replace('T',' ');
			}

			Promise.all
			([
				this.rest_production.getProductionInfo(obj),
				this.rest_production.getAllProductionAreas(),
			])
			.then(([production_info_response, production_area_list]) =>
			{
				this.production_info_list = production_info_response.data;
				this.production_area_list = production_area_list;

				return this.rest_production.getProductionAreaItems(production_area_list.map((area:any) => area.id));
			})
			.then(item_info_list =>
			{
				this.item_info_list = item_info_list;
				console.log("item_info_list", this.item_info_list);
				this.createStructures();

			})
			.catch(error =>
			{
				this.rest_service.showError(error);
			})
			.finally(() =>
			{
				this.is_loading = false;
			});
		});
	}


	createStructures()
	{
		this.structuredProductionData = [];
		for(let production_area of this.production_area_list)
		{
			let production_info_list = this.production_info_list.filter(info => info.production_area_id === production_area.id);

			const category_map: Map<string, ProductionInfo[]> = new Map();

			for (const productionInfo of production_info_list) {
				const itemInfo = this.item_info_list.find(item => item.id === productionInfo.item_id);
				if (itemInfo && itemInfo.category) {
					const categoryName = itemInfo.category.name;
					if (!category_map.has(categoryName)) {
						category_map.set(categoryName, []);
					}
					category_map.get(categoryName)!.push({
						item: itemInfo,
						total: productionInfo.qty,
						pieces: productionInfo.alternate_qty,
						production_info_list: [productionInfo] // Store the original production info object
					});
				}
			}

			const categoryProduction: CategoryProduction[] = [];

			for (const [categoryName, productionByItem] of category_map.entries())
			{
				let categoryKgs = 0;
				let categoryPieces = 0;

				// Further group by item within category
				const itemMap = new Map<number, ProductionInfo>();
				for(const prodInfo of productionByItem){
					if(!itemMap.has(prodInfo.item.id)){
						itemMap.set(prodInfo.item.id, {item: prodInfo.item, total: 0, pieces: 0, production_info_list: []});
					}
					itemMap.get(prodInfo.item.id)!.total += prodInfo.total;
					itemMap.get(prodInfo.item.id)!.pieces += prodInfo.pieces;
					itemMap.get(prodInfo.item.id)!.production_info_list.push(...prodInfo.production_info_list);
					categoryKgs += prodInfo.total;
					categoryPieces += prodInfo.pieces;
				}

				categoryProduction.push({
					category: productionByItem[0].item.category, // Assuming all items in a category have the same category object
					kgs: categoryKgs,
					pieces: categoryPieces,
					production_by_item: Array.from(itemMap.values())
				});
			}
			this.structuredProductionData.push({
				production_area: production_area,
				category_production: categoryProduction
			});
		}
	}

	/*
	let x = [
		{
a			production_area:any;
			category_production: [
				{
					category: any,
					kgs:number,
					pieces:number,
					production_by_item:[
						{
							item:any,
							total:number,
							pieces:number
							production_info_list:any[]
						}
					]
				}
			]
		}
	]
	*/



	getQueryParamObservable():Observable<ParamMap[]>
	{
		let p:ParamMap = {
			has:(_prop)=>false,
			keys:[],
			get:(_value:string)=>{ return null},
			getAll:()=>{ return []},
		};

		return combineLatest
		([
			this.route.queryParamMap.pipe(startWith(p)),
			this.route.paramMap
		])
	}
}
