import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { ConsumptionInfo } from '../../ComplexModels/ConsumptionInfo';
import { ProductionInfo } from '../../ComplexModels/ProductionInfo';
import { Payroll, Payroll_Value, Production, Production_Area, Role, User } from '../../RestModels';
import { Rest } from '../../classes/Rest';
import { RestProduction } from '../../classes/RestProduction';
import { RestConsumption } from '../../classes/RestConsumption';
import { ParamMap } from '@angular/router';
import { GetEmpty } from '../../classes/GetEmpty';

interface PayrollInfo
{
	values: Payroll_Value[];
	user: User;
	payroll:Payroll;
}


@Component({
  selector: 'app-print-nomina-in-list',
  imports: [],
  templateUrl: './print-nomina-in-list.component.html',
  styleUrl: './print-nomina-in-list.component.css'
})
export class PrintNominaInListComponent extends BaseComponent
{
	user_list: User[] = [];
	role_list: Role[] = [];
	production_info_list: ProductionInfo[] = [];
	consumption_info_list: ConsumptionInfo[] = [];


	rest_production = new RestProduction(this.rest);
	rest_consumption = new RestConsumption(this.rest);
	rest_consumption_user = new Rest(this.rest,'consumption_user');
	rest_ledger = new Rest(this.rest,'ledger_info');
	rest_role = new Rest(this.rest,'role');
	rest_payroll_info = new Rest(this.rest,'payroll_info');
	current_payroll_info_list: PayrollInfo[] = [];

	production_area:Production_Area = GetEmpty.production_area();

    start_date: string = '';
    end_date: string = '';

	ngOnInit()
	{
		this.user_list = [];
		this.role_list = [];
		this.production_info_list = [];


		let start_param = this.start_date+' 00:00:00';
		let end_param = this.end_date+' 23:59:59';

		this.sink = this.route.queryParamMap.subscribe((params:any) =>
		{
			this.loadData(params);
		});
	}

	loadData(query_params:ParamMap)
	{

		let production_area_id = query_params.get('production_area_id');
		let start_param= query_params.get('start_date')+' 00:00:00';
		let end_param = query_params.get('end_date')+' 23:59:59';

		let prodution_search_params = {
			production_area_id: production_area_id,
			'produced>~':start_param,
			'produced<~': end_param,
			status:'ACTIVE',
			limit:99999
		};

		let consumption_search_params = {
			production_area_id: production_area_id,
			'consumed>~':start_param,
			'consumed<~': end_param,
			limit:9999999
		};

		Promise.all
		([
			this.rest_production.getUsersFromProductionArea( production_area_id ),
			this.rest_production.searchProductionInfo( prodution_search_params ),
			this.rest_consumption.searchConsumptionInfo(consumption_search_params),
			this.rest_role.search({limit:999999}),
			this.rest_payroll_info.search({start_date: this.start_date, end_date: this.end_date, production_area_id: production_area_id, limit: 99999})
		])
		.then(([users, production_info, consumption_info,role_response, payroll_info]) =>
		{
			this.production_area = production_info.production_area;
			this.production_info_list = production_info;
			this.consumption_info_list = consumption_info;
			this.user_list = users;
			this.role_list = role_response.data;
			this.current_payroll_info_list = payroll_info.data;

			let user_ids = users.map((user:any) => user.id);

			if( user_ids.length === 0 )
			{
				throw new Error('No se encontraron usuarios asociados a la área de producción seleccionada');
			}

			let consumption_ids = consumption_info.map((c:any) => c.consumption.id).join(',');
			return this.rest_consumption_user.search({'id,':consumption_ids,limit:999999});
		})
	}

	generatePDF() {
		const pdfContainer = document.getElementById('pdf_container');
		if (pdfContainer) {
			const html = pdfContainer.innerHTML;
			const html_object = {
				html: html,
				orientation: 'P',
				default_font_size: 9,
				default_font: 'Helvetica',
				download_name: 'nomina.pdf'
			};

			const url = environment.pdf_service_url + '/index.php';

			this.rest_service.externalPost(url, html_object)
				.then(response => {
					const pdf_url = URL.createObjectURL(response);
					window.open(pdf_url, '_blank');
				})
				.catch(error => {
					this.rest_service.showError('Error al generar el PDF');
				});
		}
	}
}
