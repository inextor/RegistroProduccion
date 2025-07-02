import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { RestProduction } from '../RestClases/RestProduction';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ConfirmationResult, ConfirmationService } from '../services/confirmation.service';
import { CommonModule } from '@angular/common';

@Component
({
	selector: 'app-list-production-area-production',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './list-production-area-production.component.html',
	styleUrl: './list-production-area-production.component.css'
})
export class ListProductionAreaProductionComponent implements OnInit
{

	production_area_info_list: any[] = [];
	production_area_info: any = {
		production_area: { name: '' }
	};

	rest_production: RestProduction;
	production_item_info_list: any[] = [];

	date:string = '';
    is_loading: boolean = false;
    production_info_list: any[] = [];

	constructor(private rest_service: RestService, private route: ActivatedRoute, public confirmation_service:ConfirmationService)
	{
		this.rest_production = new RestProduction(rest_service);
		let d = new Date();
		this.date = d.getFullYear() + '-' + this.zero(d	.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
	}

	zero(x:number):string
	{
		return x < 10 ? '0'+x : ''+x;
	}

	ngOnInit()
	{
		this.route.queryParamMap.subscribe
		({
			error:(error:any) => console.error(error),
			next: (params:ParamMap) =>
			{
				let production_area_id = params.get('production_area_id');
				let d = new Date();
				this.date = d.getFullYear() + '-' + this.zero(d	.getMonth() + 1) + '-' + d.getDate();
				this.loadData(production_area_id, this.date);
			}
		});
	}

	loadData(production_area_id:any, date:string)
	{

		this.date = date;

		console.log("Buscando datos",production_area_id, date);
		this.production_area_info_list = [];
		this.is_loading = true;

		Promise.all
		([
			this.rest_production.getProductionAreaInfo(production_area_id),
			this.rest_production.getProductionInfoByProductionAreaId(production_area_id, date),
		])
		.then(([production_area_info, production_info_list]) =>
		{
			this.is_loading = false;
			console.log('Received',production_area_info, production_info_list);

			if( !production_area_info )
			{
				console.error("No se encontro el area de produccion");
				return;
			}

			this.production_area_info = production_area_info;
			this.production_info_list = production_info_list;

		}).catch((error:any) => console.error(error));
	}

	update(production_info: any)
	{
		this.confirmation_service.showConfirmAlert
		(
			production_info,
			'Confirmación',
			'¿Está seguro de que desea actualizar la cantidad?',
			'Aceptar',
			'Cancelar',
			true,
			'Nota'
		)
		.pipe
		(
			filter(result => result.accepted),
			mergeMap((result:ConfirmationResult) =>
			{
				console.log('Confirmed');
				return from(this.rest_production.updateProduction(production_info.production));
			})
		)
		.subscribe
		({
			next:(production:any)=> //production is the updated production
			{
				this.loadData(production_info.production_area.id, this.date);
			},
			error:(error:any) =>
			{
				this.rest_service.showError(error);
			}
		});
	}
}
