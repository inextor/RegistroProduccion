import { Component } from '@angular/core';
import { Production } from '../RestClases/Production';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { combineLatest, Observable, startWith } from 'rxjs';

@Component({
	selector: 'app-resumen-production',
	imports: [],
	templateUrl: './resumen-production.component.html',
	styleUrl: './resumen-production.component.css'
})
export class ResumenProductionComponent {

	rest_production: Production;
	production_area_list:any[] = [];
	production_info_list:any[] = [];
	is_loading: boolean = false;

	constructor(public rest_service: RestService, public route: ActivatedRoute, router: Router)
	{
		this.rest_production = new Production(rest_service);
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

			this.rest_production.getProductionInfo(obj)
			.then(production_info_list =>
			{
				this.production_info_list = production_info_list;
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



	getUrlParams(obj:any):URLSearchParams
	{
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
