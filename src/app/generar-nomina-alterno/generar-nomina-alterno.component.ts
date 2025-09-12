import { Component, OnInit } from '@angular/core';
import { RestProduction } from '../RestClases/RestProduction';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestConsumption } from '../RestClases/RestConsumption';
import { ShortDatePipe } from '../pipes/short-date.pipe';
import { Item } from '../Models/Item';

interface ProductionByDate {
  date: string;
  qty: number;
  price: number;
  total: number;
}

interface ProductionByItem {
  item: Item;
  dates: ProductionByDate[];
  total_qty: number;
  total_amount: number;
}

interface UserProduction {
  user: any;
  items: ProductionByItem[];
  total_amount: number;
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
	user_production_list: UserProduction[] = [];

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
			this.searchProductionAreaData();
		});

		this.rest_production.getAllProductionAreas()
			.then((data: any) => {
				this.production_area_list = data;
			});

		if (this.production_area_id && this.start_date && this.end_date) {
				this.searchProductionAreaData();
		}
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
			consumed_search['consumed<~'] = this.start_date;
		}


		Promise.all([
			this.rest_production.getUsersFromProductionArea(this.production_area_id),
			this.rest_production.searchProductionInfo(production_search),
			this.rest_consumption.searchConsumptionInfo(consumed_search)
		])
		.then(([users, production_info, consumption_info]) => {

			this.user_list = users;

			production_info.sort((a,b)=>{
				if(a.production.produced.localeCompare(b.production.produced) ==0 )
			{
					if( a.item.name.toLowerCase().includes('muerta'))
						return 1;

					return a.item.name.toLowerCase().localeCompare(b.item.name.toLowerCase());
				}

				return a.item.name.localeCompare(b.production.produced);
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
		this.user_production_list = [];

		const filtered_production_info = this.production_info_list.filter(pi => {
			return pi.users.some(u => u.price && u.price > 0);
		});

		for (const user of this.user_list) {
			const user_production: UserProduction = {
				user: user,
				items: [],
				total_amount: 0
			};

			const production_by_item = new Map<number, ProductionByItem>();

			for (const pi of filtered_production_info) {
				for (const pu of pi.users) {
					if (pu.user_id === user.id && pu.price && pu.price > 0) {
						let production_item = production_by_item.get(pi.item.id);

						if (!production_item) {
							production_item = {
								item: pi.item,
								dates: [],
								total_qty: 0,
								total_amount: 0
							};
							production_by_item.set(pi.item.id, production_item);
						}

						const date = pi.production.produced.substring(0, 10);
						let production_date = production_item.dates.find(d => d.date === date);

						if (!production_date) {
							production_date = {
								date: date,
								qty: 0,
								price: pu.price,
								total: 0
							};
							production_item.dates.push(production_date);
						}

						const amount = pi.production.qty * pu.price;
						production_date.qty += pi.production.qty;
						production_date.total += amount;
						production_item.total_qty += pi.production.qty;
						production_item.total_amount += amount;
						user_production.total_amount += amount;
					}
				}
			}

			user_production.items = Array.from(production_by_item.values());
			this.user_production_list.push(user_production);
		}
	}
}
