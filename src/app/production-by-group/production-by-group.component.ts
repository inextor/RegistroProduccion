import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { Production } from '../RestClases/Production';
import { combineLatest, mergeMap, Observable, of, startWith } from 'rxjs';
import { ActivatedRoute, ParamMap, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';


interface LocationParameters
{
	query:ParamMap,
	params:ParamMap
}

@Component({
	selector: 'app-production-by-group',
	imports: [RouterModule, CommonModule,FormsModule],
	templateUrl: './production-by-group.component.html',
	styleUrl: './production-by-group.component.css'
})
export class ProductionByGroupComponent
{
	production: Production;
	production_info_list:any[] = [];
	total_alternate:number = 0;
	start_date: string = '';
	end_date: string = '';
	total_qty:number = 0;
	total_alternate_qty:number = 0;
	total_average:number = 0;
	is_loading:boolean = false;

	group_id:string = '';



	constructor(private rest_service:RestService,private route:ActivatedRoute,private router:Router)
	{
		this.production = new Production(rest_service);
	}

	onStartDateChange(date_string:string)
	{
		this.start_date = date_string;
		this.loadData(this.group_id, this.start_date, this.end_date);
		console.log(this.start_date);
	}

	onEndDateChange(date_string:string)
	{
		this.end_date = date_string;
		this.loadData(this.group_id, this.start_date, this.end_date);
		console.log(this.end_date);
	}

	ngOnInit()
	{
		this.getQueryParamObservable().pipe
		(
			mergeMap((data:LocationParameters) =>
			{
				let start = new Date();
				start.setHours(0,0,0,0);

				let end = new Date();
				end.setHours(23,59,59,59);

				this.start_date = this.production.getLocalMysqlStringFromDate(start).substring(0,10)
				this.end_date = this.production.getLocalMysqlStringFromDate(end).substring(0,10)

				this.group_id = data.params.get('id') as string;

				return of( this.group_id );
			})
		)
		.subscribe
		({
			next:(group_id:string) =>
			{

				this.loadData(group_id, this.start_date, this.end_date);
			},
			error:(error:any) =>
			{
				console.log(error);
			}
		});
	}


	loadData(group_id:string, start_date:string, end_date:string)
	{

		this.is_loading = true;
		let s = this.production.getDateFromLocalMysqlString(start_date);
		s.setHours(0,0,0,0);

		let e = this.production.getDateFromLocalMysqlString(end_date);
		e.setHours(23,59,59,59);

		this.production.getProductionByGroup(group_id, s, e)
		.then((data:any) =>
		{
			this.production_info_list = data;
			let total_qty = 0;
			let total_alternate_qty = 0;

			for(let production_info of this.production_info_list)
			{
				total_qty += production_info.total_qty;
				total_alternate_qty += production_info.total_alternate_qty;
			}

			this.total_qty = total_qty;
			this.total_alternate_qty = total_alternate_qty;
			this.total_average = total_qty/total_alternate_qty;
		})
		.catch((error:any) =>
		{
			this.rest_service.showError(error);
		})
		.finally(()=>
		{
			this.is_loading = false;
		});
	}

	getQueryParamObservable():Observable<LocationParameters>
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
		.pipe
		(
			mergeMap((foo:ParamMap[]) =>
			{
				return of
				({
					query: foo[0],
					params: foo[1]
				});
			})
		);
	}
}

