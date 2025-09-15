import { Component, OnInit } from '@angular/core';
import { RestProduction } from '../RestClases/RestProduction';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestConsumption } from '../RestClases/RestConsumption';
import { ShortDatePipe } from '../pipes/short-date.pipe';
import { Payroll_Value } from '../Models/Payroll_Value';
import { Payroll } from '../Models/Payroll';
import { User } from '../Models/User';
import { ProductionAreaInfo } from '../Models/ProductionAreaInfo';
import { mergeMap } from 'rxjs';

interface PayrollInfo
{
	values: Payroll_Value[];
	user: User;
	payroll:Payroll;
}


interface ProductionDetail {
  date: string;
  product: string;
  pieces: number;
  kg: number;
}

interface ItemTotal {
  product: string;
  pieces: number;
  kg: number;
}

@Component({
	selector: 'app-generar-nomina-alterno',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule, ShortDatePipe],
	templateUrl: './generar-nomina-alterno.component.html',
	styleUrls: ['./generar-nomina-alterno.component.css']
})
export class GenerarNominaAlternoComponent implements OnInit {

	rest_production: RestProduction;
	rest_consumption: RestConsumption;
	production_area_list: any[] = [];
	production_area_id: number | '' = '';
	production_info_list: any[] = [];
	consumption_info_list: any[] = [];
	produccionPorDia: any[] = [];
	start_date: string = '';
	end_date: string = '';
	totalesPorProducto: any[] = [];
	user_list: any[] = [];
	payroll_info_list: PayrollInfo[] = [];
	production_detail_list: ProductionDetail[] = [];
	item_total_list: ItemTotal[] = [];
	total_pieces: number = 0;
	total_kg: number = 0;

	production_area_info:ProductionAreaInfo | null = null;
	user_extra_deductions:Map<number,Payroll_Value[]> = new Map();

	constructor(public rest_service: RestService, public route: ActivatedRoute, public router:Router) {
		this.rest_production = new RestProduction(rest_service);
		this.rest_consumption = new RestConsumption(rest_service);
	}

	ngOnInit() {
		this.route.queryParamMap.subscribe((params: any) => {
			this.start_date = params.get('start_date') || '';
			this.end_date = params.get('end_date') || '';
			let index = 'production_area_id';
			this.production_area_id = params.has(index) ? parseInt( params.get(index) ):'';
			if(!(this.production_area_id == '' || this.start_date == '' || this.end_date =='' ))
				this.searchProductionAreaData();
		});

		this.rest_production.getAllProductionAreas()
			.then((data: any) => {
				this.production_area_list = data;
			});

	}

	submitSearch(evt:any)
	{
		const search_params: any = {
			'production_area_id': this.production_area_id,
			'status': 'ACTIVE',
			'limit': 99999,
			'start_date': this.start_date,
			'end_date': this.end_date
		};

		this.router.navigate(['/generar-nomina-alterno'], {queryParams: search_params });
	}

	searchProductionAreaData() {
		this.production_info_list = [];
		this.totalesPorProducto = [];

		const search_params: any = {
			'production_area_id': this.production_area_id,
			'status': 'ACTIVE',
			'limit': 99999,
		};


		let production_search = {...search_params};
		let consumed_search = {...search_params};

		if (this.start_date) {
			production_search['produced>~'] = this.start_date;
			consumed_search['consumed>~'] = this.start_date;

		}

		if (this.end_date) {
			production_search['produced<~'] = this.end_date;
			consumed_search['consumed<~'] = this.end_date;
		}


		Promise.all([
			this.rest_production.getUsersFromProductionArea(this.production_area_id),
			this.rest_production.searchProductionInfo(production_search),
			this.rest_consumption.searchConsumptionInfo(consumed_search)
		])
		.then(([users, production_info, consumption_info]) => {

			this.user_list = users;

			production_info.sort((a,b)=>{
				let date_a = a.production.produced.substring(0,10);
				let date_b = b.production.produced.substring(0,10);

				if (date_a.localeCompare(date_b) === 0) {
					return a.item.name.localeCompare(b.item.name);
				}
				return date_a.localeCompare(date_b);
			})

			this.production_info_list = production_info;
			this.consumption_info_list = consumption_info;
			this.agruparYCalcularTotales();
		})
		.catch((error) => {
			this.rest_service.showError(error);
		});
	}

	agruparYCalcularTotales() {
		this.payroll_info_list = [];

		for (const user of this.user_list) {
			const payroll: Payroll = {
				id: 0,
				store_id: 1,
				start_date: this.start_date,
				end_date: this.end_date,
				status: 'ACTIVE',
				created: new Date().toISOString().slice(0, 19).replace('T', ' '),
				paid_status: 'PENDING',
				subtotal: 0,
				total: 0
			};

			const payroll_values_map = new Map<string, Payroll_Value>();

			// Producción
			for (const pi of this.production_info_list) {
				for (const pu of pi.users) {
					if (pu.user_id === user.id) {
						const date = pi.production.produced.substring(0, 10);
						const key = `Producción-${date}`;

						let payroll_value = payroll_values_map.get(key);

						if (payroll_value == undefined) {

							payroll_value = {
								id: 0,
								payroll_id: 0,
								description: 'Producción del día ' + date,
								type: 'PERCEPTION',
								value: 0,
								datetime: null,
								status: 'ACTIVE',
								created: date
							};

							payroll_values_map.set(key, payroll_value as Payroll_Value);
						}

						payroll_value.value += pi.production.qty * pu.price;
					}
				}
			}

			// Consumos
			for (const ci of this.consumption_info_list) {
				for (const cu of ci.users) {
					if (cu.user_id === user.id && cu.price && cu.price > 0) {
						const date = ci.consumption.consumed.substring(0, 10);
						const key = `${ci.item.name}-${date}`;

						let payroll_value:Payroll_Value | undefined = payroll_values_map.get(key);

						if (payroll_value == undefined) {
							payroll_value = {
								id: 0,
								payroll_id: 0,
								description: 'CONSUMO',
								type: 'DEDUCTION',
								datetime: null,
								value: 0,
								status: 'ACTIVE',
								created: date
							};
							payroll_values_map.set(key, payroll_value as Payroll_Value);
						}
						payroll_value.value+= cu.total;
					}
				}
			}

			const payroll_values = Array.from(payroll_values_map.values());
			payroll_values.sort((a, b) => a.description.localeCompare(b.description));

			const subtotal = payroll_values.filter(pv => pv.type === 'PERCEPTION').reduce((acc, pv) => acc + pv.value, 0);
			const deductions = payroll_values.filter(pv => pv.type === 'DEDUCTION').reduce((acc, pv) => acc + pv.value, 0);
			payroll.subtotal = subtotal;
			payroll.total = subtotal - deductions;

			const payroll_info: PayrollInfo = {
				user: user,
				payroll: payroll,
				values: payroll_values
			};

			this.payroll_info_list.push(payroll_info);
		}

		const production_detail_map = new Map<string, ProductionDetail>();

		for (const pi of this.production_info_list) {
			const date = pi.production.produced.substring(0, 10);
			const key = `${pi.item.name}-${date}`;

			let detail = production_detail_map.get(key);

			if (!detail) {
				detail = {
					date: date,
					product: pi.item.name,
					pieces: 0,
					kg: 0
				};
				production_detail_map.set(key, detail);
			}

			detail.pieces += pi.production.alternate_qty;
			detail.kg += pi.production.qty;
		}

		this.production_detail_list = Array.from(production_detail_map.values());

		const item_total_map = new Map<string, ItemTotal>();

		for (const pi of this.production_info_list) {
			const key = pi.item.name;

			let total = item_total_map.get(key);

			if (!total) {
				total = {
					product: pi.item.name,
					pieces: 0,
					kg: 0
				};
				item_total_map.set(key, total);
			}

			total.pieces += pi.production.alternate_qty;
			total.kg += pi.production.qty;
		}

		this.item_total_list = Array.from(item_total_map.values());

		this.total_pieces = this.item_total_list.reduce((acc, item) => acc + item.pieces, 0);
		this.total_kg = this.item_total_list.reduce((acc, item) => acc + item.kg, 0);
	}


	savePayroll()
	{
		let payroll_info_array = [];

		this.rest_production.getProductionAreaInfo( this.production_area_id  as number)
		.then((production_area_info:ProductionAreaInfo)=>
		{
			let payroll_info_array = production_area_info.users.map((production_user)=>{
				let payroll:Payroll= {
					id: 0,
					created:'',
					end_date:this.end_date,
					paid_status: 'PENDING',
					start_date:this.start_date,
					status: 'ACTIVE',
					store_id: 1,
					subtotal: 0,
					total: 0,
				}

				let payroll_values:Payroll_Value[] = [];

				let payroll_info:Partial<PayrollInfo> = {
					payroll,
					values: payroll_values
				}

				return payroll_info;
			});
		});
	}
}
