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


	constructor(public rest_service: RestService, public route: ActivatedRoute, router: Router)
	{
		this.rest_production = new RestProduction(rest_service);
	}

	ngOnInit()
	{
		this.getQueryParamObservable().subscribe(([queryParams, paramMap]) =>
		{
			let keys = queryParams.keys;

			let obj:Record<string,string> = {};

			for(let key of keys)
			{
				obj[key] = queryParams.get(key) as string;
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
			.then(([production_info_list, production_area_list]) =>
			{
				this.production_info_list = production_info_list;
				this.production_area_list = production_area_list;

				return this.rest_production.getProductionAreaItems(production_area_list.map((area:any) => area.id));
			})
			.then(item_info_list =>
			{
				this.item_info_list = item_info_list;

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
		for(let production_area of this.production_area_list)
		{
			let production_info_list = this.production_info_list.filter(info => info.production_area_id === production_area.id);

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


	getUrlParams(x_obj:any):URLSearchParams
	{
		let obj = x_obj;

		if (obj === null || obj === undefined) {
			obj = {};
		}
		const params = new URLSearchParams();
		for (const key in obj)
		{
			if (obj.hasOwnProperty(key))
			{
				params.set(key, String(obj[key]));
			}
		}
		return params;
	}

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
