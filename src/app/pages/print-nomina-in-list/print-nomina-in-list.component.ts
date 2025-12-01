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
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { PayrollInfo } from '../../ComplexModels/PayrollInfo';

interface Perception {
    description: string;
    qty_kgs: number;
    qty_pieces: number;
    amount: number;
}

interface UserResume{
	price: number;
	user: any;
	total_pieces: number;
	total_kgs: number;
	total_kgs_muerta: number;
	total_pieces_muerta: number;
	total_to_pay: number;
	role: any;
	total_consumo_liters: number;
	total_consumo_total: number;
	deductions: Payroll_Value[]; // Now explicitly Payroll_Value to ensure datetime is present
	perceptions: Perception[];
	total_abono: number;
	prices: number[]; // Array of unique prices used
};


@Component({
  selector: 'app-print-nomina-in-list',
  standalone: true,
  imports: [CommonModule],
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

	user_resume_list: UserResume[] = [];
	total_pieces: number = 0;
	total_kgs: number = 0;
	total_kgs_muerta: number = 0;
	total_pieces_muerta: number = 0;
	all_users_total_consumption: number = 0;
	all_users_total_to_pay: number = 0;
	all_users_total_abono: number = 0;
	consumption_user_list: any[] = [];


	ngOnInit()
	{
		this.user_list = [];
		this.role_list = [];
		this.production_info_list = [];

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

		this.start_date = query_params.get('start_date') || '';
		this.end_date = query_params.get('end_date') || '';

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
			if( production_info.length>0 )
				this.production_area = production_info[0].production_area || GetEmpty.production_area();

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
		.then((response) =>
		{
			this.consumption_user_list = response.data;
			this.generateReumenDays();
		})
		.catch((error)=>
		{
			this.showError(error);
		})
	}

	unique_items: any[] = [];
	resume: any[] = [];

	generateReumenDays()
	{
		this.total_pieces = 0;
		this.total_pieces_muerta = 0;
		this.total_kgs = 0;
		this.total_kgs_muerta = 0;

		// 1. Generate Production Summary Matrix (Resumen Produccion)
		this.resume = [];
		this.unique_items = [];
		let item_map = new Map<number, any>();
		let date_map = new Map<string, any>(); // date -> { date: string, totals: { [itemId: number]: { qty: number, pieces: number } } }

		for(let pi of this.production_info_list)
		{
			// Collect unique items
			if(!item_map.has(pi.item.id))
			{
				item_map.set(pi.item.id, pi.item);
			}

			// Aggregate by date
			let date = pi.production.produced.substring(0, 10);
			if(!date_map.has(date))
			{
				date_map.set(date, { date: date, totals: {} });
			}
			let day_entry = date_map.get(date);

			if(!day_entry.totals[pi.item.id])
			{
				day_entry.totals[pi.item.id] = { qty: 0, pieces: 0 };
			}

			day_entry.totals[pi.item.id].qty += pi.production.qty;
			day_entry.totals[pi.item.id].pieces += pi.production.alternate_qty;

			// Global totals
			this.total_pieces += pi.production.alternate_qty;
			this.total_kgs += pi.production.qty;
		}

		// Sort items by name (or any other criteria)
		this.unique_items = Array.from(item_map.values()).sort((a, b) => a.name.localeCompare(b.name));

		// Sort dates
		this.resume = Array.from(date_map.values()).sort((a, b) => a.date.localeCompare(b.date));


		// 2. Generate User Resume (Nominas por Usuario)
		let user_resume_list = [];
		this.all_users_total_to_pay = 0;
		this.all_users_total_consumption = 0;

		for(let u of this.user_list)
		{
			let role = this.role_list.find(r=>r.id == u.role_id);
			let total_pieces = 0;
			let total_kgs = 0;
			let total_to_pay = 0;
			let prices_set = new Set<number>();
			let perceptions_map = new Map<string, Perception>(); // Aggregate by description

			for(let pi of this.production_info_list)
			{
				for(let pu of pi.users)
				{
					if( pu.user_id != u.id )
						continue;

					if( pu.price > 0 )
					{
						const amount = pi.production.qty * pu.price;
						const description = pi.item.name;

						if (!perceptions_map.has(description)) {
							perceptions_map.set(description, {
								description: description,
								qty_kgs: 0,
								qty_pieces: 0,
								amount: 0
							});
						}
						const perception = perceptions_map.get(description)!;
						perception.qty_kgs += pi.production.qty;
						perception.qty_pieces += pi.production.alternate_qty;
						perception.amount += amount;

						total_pieces += pi.production.alternate_qty;
						total_kgs += pi.production.qty;
						total_to_pay += amount;
						this.all_users_total_to_pay += amount;
						prices_set.add(pu.price);
					}
				}
			}

			let total_consumo_liters = 0;
			let total_consumo_total = 0;

			for(let ci of this.consumption_info_list)
			{
				for(let cu of ci.users)
				{
					if( cu.user_id != u.id )
						continue;

					if( cu.price > 0 )
					{
						total_consumo_liters += ci.consumption.qty;
						total_consumo_total += ci.consumption.qty * cu.price;
						this.all_users_total_consumption += ci.consumption.qty * cu.price;
					}
				}
			}

			user_resume_list.push({
				user:u,
				total_pieces,
				total_kgs,
				total_to_pay,
				role,
				total_consumo_liters,
				total_consumo_total,
				total_pieces_muerta:0,
				total_kgs_muerta:0,
				price: 0,
				total_abono:0,
				deductions: [],
				perceptions: Array.from(perceptions_map.values()), // Convert map to array
				prices: Array.from(prices_set).sort((a, b) => b - a)
			});
		}

		this.user_resume_list = user_resume_list;

		let total_abono = 0;
		for (const ur of this.user_resume_list) {
			const payroll_info = this.current_payroll_info_list.find(p => p.user.id === ur.user.id);
			if (payroll_info) {
				ur.deductions = payroll_info.values.filter((v:any) => v.type === 'DEDUCTION');
			}
			ur.total_abono = this.getAbono(ur);
			total_abono += ur.total_abono;
		}
		this.all_users_total_abono = total_abono;
	}

	getAbono(user_resume: UserResume): number {
		if (!user_resume.deductions) {
			return 0;
		}
		// Any deduction with an account_id (not null) creates an abono to that account
		return user_resume.deductions
			.filter(d => d.account_id != null && d.account_id !== 0)
			.reduce((total, deduction) => total + deduction.value, 0);
	}

	trackByConsumptionId(index: number, item: any): number {
		return item.consumption.id;
	}

	trackByDate(index: number, item: any): string {
		return item.date;
	}

	trackByProductionId(index: number, item: any): number {
		return item.production.id;
	}

	trackByUserId(index: number, item: any): number {
		return item.user.id;
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

			this.rest.externalPost(url, html_object)
				.then(response => {
					const pdf_url = URL.createObjectURL(response);
					window.open(pdf_url, '_blank');
				})
				.catch(error => {
					this.showError('Error al generar el PDF');
				});
		}
	}

	// Format prices for display: "137 x ($172.5, $49.00)"
	formatPricesDisplay(ur: UserResume): string {
		if (!ur.prices || ur.prices.length === 0) {
			return '';
		}

		const kgs = ur.total_kgs.toFixed(2);
		const pricesStr = ur.prices.map(p => '$' + p.toFixed(2)).join(', ');

		return `${kgs} x (${pricesStr})`;
	}

}

