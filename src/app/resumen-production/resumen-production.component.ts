import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { combineLatest, Observable, startWith } from 'rxjs';
import { RestProduction } from '../RestClases/RestProduction';

interface ProductionByArea
{
	production_area:any;
	production_by_category: ProductionByCategory[];
	total_kgs: number;
	total_pieces: number;
}


interface ProductionByCategory
{
	category_name: string;
	kgs: number;
	pieces: number;
	production_by_item: CProductionInfo[];
}


interface CProductionInfo {
	item: any;
	total: number;
	pieces: number;
	production_info_list: any[];
}

interface CategoryProduction {
	category_name: string;
	kgs: number;
	pieces: number;
	production_by_item: CProductionInfo[];
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
	production_by_area_list:ProductionByArea[] = [];
	production_info_list:any[] = [];
	is_loading: boolean = false;
	item_info_list:any[] = [];
	structured_production_data: ProductionData = [];


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
		console.log("this.production_area_list", this.production_area_list);
		console.log("this.production_info_list", this.production_info_list);

		let production_by_area_list: ProductionByArea[] = [];

		for(let production_area of this.production_area_list)
		{
			let filter_prod = (prod_info:any) =>{
				return prod_info.production_area.id === production_area.id
			};

			let production_info_list = this.production_info_list.filter( filter_prod );

			let production_by_area:ProductionByArea | undefined = production_by_area_list.find(pba => pba.production_area.id === production_area.id);

			if (!production_by_area)
			{
				production_by_area = {
					production_area,
					production_by_category: [],
					total_kgs: 0,
					total_pieces: 0
				};
				production_by_area_list.push(production_by_area);
			}


			for (const production_info of production_info_list)
			{
				let category_name = production_info?.category?.name || 'N/A';
				let production_by_category = production_by_area.production_by_category.find(pbc => pbc.category_name === category_name);

				if (!production_by_category)
				{
					production_by_category = {
						category_name,
						kgs: 0,
						pieces: 0,
						production_by_item: []
					};
					production_by_area.production_by_category.push(production_by_category);
				}

				let production_by_item = production_by_category.production_by_item.find(pbi => pbi.item.id === production_info.item_id);

				if (!production_by_item)
				{
					production_by_item = {
						item: production_info.item,
						total: 0,
						pieces: 0,
						production_info_list: []
					};
					production_by_category.production_by_item.push(production_by_item);
				}

				production_by_item.production_info_list.push( production_info );

				production_by_area.total_kgs += production_info.production.qty;
				production_by_area.total_pieces += production_info.production.alternate_qty;

				production_by_category.kgs += production_info.production.qty;
				production_by_category.pieces += production_info.alternate_qty;

				production_by_item.total += production_info.production.qty;
				production_by_item.pieces += production_info.production.alternate_qty;
			}
		}

		this.production_by_area_list = production_by_area_list;
		console.log("this.production_by_area_list", this.production_by_area_list);

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
