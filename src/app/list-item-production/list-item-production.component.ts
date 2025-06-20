import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { RestProduction } from '../RestClases/RestProduction';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ConfirmationResult, ConfirmationService } from '../services/confirmation.service';
import { Utils } from '../classes/DateUtils';

@Component
({
	selector: 'app-list-item-production',
	imports: [FormsModule],
	templateUrl: './list-item-production.component.html',
	styleUrl: './list-item-production.component.css'
})
export class ListItemProductionComponent implements OnInit
{

	item_info_list: any[] = [];
	item_info: any = {
		item: { name: '' },
		category: { name: '' }
	};


	rest_production: RestProduction;
	production_item_info_list: any[] = [];

	date:string = '';
    is_loading: boolean = false;

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
				let item_id = params.get('item_id');
				let d = new Date();
				this.date = d.getFullYear() + '-' + this.zero(d	.getMonth() + 1) + '-' + d.getDate();
				this.loadData(item_id, this.date);
			}
		});
	}

	loadData(item_id:any, date:string)
	{

		this.date = date;

		console.log("Buscando datos",item_id, date);
		this.item_info_list = [];
		this.is_loading = true;

		Promise.all
		([
			this.rest_production.getItemInfo(item_id),
			this.rest_production.getProductionItemInfoByItemId(item_id, date),
		])
		.then(([item_info, production_item_info]) =>
		{
			this.is_loading = false;
			console.log('Received',item_info, production_item_info);

			if( !item_info )
			{
				console.error("No se encontro el item");
				return;
			}

			this.item_info = item_info;
			this.production_item_info_list = production_item_info;

		}).catch((error:any) => console.error(error));
	}

	update(production_item_info: any)
	{
		this.confirmation_service.showConfirmAlert
		(
			production_item_info,
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
				return from(this.rest_production.updateProduction(production_item_info.production));
			})
		)
		.subscribe
		({
			next:(production:any)=>
			{
				this.loadData(production_item_info.item_id, this.date);
			},
			error:(error:any) =>
			{
				this.rest_service.showError(error);
			}
		});
	}
}
