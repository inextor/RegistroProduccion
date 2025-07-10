import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { combineLatest, Observable, of, startWith } from 'rxjs';
import { RestProduction } from '../RestClases/RestProduction';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Utils } from '../classes/DateUtils';
import { FormsModule } from '@angular/forms';

interface ProductionByArea
{
	production_area:any;
	production_by_category: ProductionByCategory[];
	total_kgs: number;
	total_pieces: number;
	open: boolean;
	string_id: string;
}


interface ProductionByCategory
{
	category_name: string;
	total_kgs: number;
	total_pieces: number;
	production_by_item: CProductionInfo[];
	open: boolean;
	string_id: string;
}

interface CProductionInfo
{
	item: any;
	total_kgs: number;
	total_pieces: number;
	production_info_list: any[];
	open: boolean;
	string_id: string;
}

interface CategoryProduction {
	category_name: string;
	total_kgs: number;
	total_pieces: number;
	production_by_item: CProductionInfo[];
	open: boolean;
	string_id: string;
}

interface ProductionArea {
	production_area: any;
	category_production: CategoryProduction[];
}

type ProductionData = ProductionArea[];


@Component({
	selector: 'app-resumen-production',
	imports: [FormsModule,DatePipe,CommonModule],
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

	total_kgs: number = 0;
	total_pieces: number = 0;
	end_date: string = '';
	start_date: string = '';
    attributes: any[] = [];

	constructor(public rest_service: RestService, public route: ActivatedRoute,public router: Router)
	{
		this.rest_production = new RestProduction(rest_service);
	}

	ngOnInit()
	{
		this.getQueryParamObservable().subscribe(([query_params, param_map]) =>
		{
			let keys = query_params.keys;
			let obj:Record<string,string> = {};

			if( query_params.has('start_date') )
			{
				this.start_date = query_params.get('start_date') as string;
			}
			else
			{
				let d = new Date();
				d.setHours(0,0,0,0);
				this.start_date = Utils.getLocalMysqlStringFromDate(d).substring(0,10);
			}

			let sd = Utils.getLocalDateFromMysqlString(this.start_date) as Date;
			sd.setHours(0,0,0,0);
			obj['created>~'] = sd.toISOString().substring(0,19).replace('T',' ');

			if( query_params.has('end_date') )
			{
				this.end_date = query_params.get('end_date') as string;
			}
			else
			{
				let d = new Date();
				d.setHours(0,0,0,0);
				d.setDate(d.getDate() + 1);
				this.end_date = Utils.getLocalMysqlStringFromDate(d).substring(0,10);
			}

			console.log("this.start_date", this.start_date);
			console.log("this.end_date", this.end_date);


			let ed = Utils.getLocalDateFromMysqlString(this.end_date) as Date;
			ed.setHours(23,59,59,0);
			obj['created<~'] = ed.toISOString().substring(0,19).replace('T',' ');
			obj['limit'] = '999999';

			this.is_loading = true;

			Promise.all
			([
				this.rest_production.getProductionInfo(obj),
				this.rest_production.getAllProductionAreas(),
				this.rest_production.getAttributes(),
			])
			.then(([production_info_response, production_area_list, attributes]) =>
			{
				this.attributes = attributes;
				this.production_area_list = production_area_list;
				this.production_info_list = production_info_response.sort((a:any,b:any)=>
				{
					console.log("a.production.created", a.production.created);
					console.log("b.production.created", b.production.created);
					return a.production.created.localeCompare(b.production.created);
				});

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

		let total_kgs = 0;
		let total_pieces = 0;

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
					total_pieces: 0,
					open: false,
					string_id: 'p_area_'+production_area.id
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
						total_kgs: 0,
						total_pieces: 0,
						production_by_item: [],
						open: false,
						string_id: 'p_cat_'+( production_info?.category?.id || 'NULL')

					};
					production_by_area.production_by_category.push(production_by_category);
				}

				let find_lamnda = (pbi:any) =>{
					return pbi.item.id === production_info.item.id;
				};

				let production_by_item = production_by_category.production_by_item.find(pbi => pbi.item.id === production_info.item.id);

				if (!production_by_item)
				{
					production_by_item = {
						item: production_info.item,
						total_kgs: 0,
						total_pieces: 0,
						production_info_list: [],
						open: false,
						string_id: 'p_item_'+production_info.item.id
					};
					production_by_category.production_by_item.push(production_by_item);
				}

				production_by_item.production_info_list.push( production_info );

				production_by_area.total_kgs += production_info.production.qty;
				production_by_area.total_pieces += production_info.production.alternate_qty;

				production_by_category.total_kgs += production_info.production.qty;
				production_by_category.total_pieces += production_info.production.alternate_qty;

				production_by_item.total_kgs += production_info.production.qty;
				production_by_item.total_pieces += production_info.production.alternate_qty;

				total_kgs += production_info.production.qty;
				total_pieces += production_info.production.alternate_qty;
			}
		}

		this.total_kgs = total_kgs;
		this.total_pieces = total_pieces;

		this.production_by_area_list = production_by_area_list;
		console.log("this.production_by_area_list", this.production_by_area_list);
	}

	/*
	let x = [
		{
			production_area:any;
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

	search($event: MouseEvent)
	{
		this.router.navigate(['/resumen-production'], { queryParams:{
			start_date: this.start_date,
			end_date: this.end_date
		}});
	}
}
