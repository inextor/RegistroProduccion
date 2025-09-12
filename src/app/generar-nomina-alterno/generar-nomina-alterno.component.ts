import { Component, OnInit } from '@angular/core';
import { RestProduction } from '../RestClases/RestProduction';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestConsumption } from '../RestClases/RestConsumption';
import { ShortDatePipe } from '../pipes/short-date.pipe';

interface NominaConcept
{
	description:string;
	date: string;
	qty:number;
	price:number;
	total:number;
}

interface UserConcepts {
  user: any;
  concepts: NominaConcept[];
  total: number;
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
	user_concepts_list: UserConcepts[] = [];

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
		this.user_concepts_list = [];

		for (const user of this.user_list) {
			const user_concepts: UserConcepts = {
				user: user,
				concepts: [],
				total: 0
			};

			const concepts_map = new Map<string, NominaConcept>();

			for (const pi of this.production_info_list) {
				for (const pu of pi.users) {
					if(pu.price == 0 )
						continue;

					if (pu.user_id === user.id) {
						const date = pi.production.produced.substring(0, 10);
						const key = `${pi.item.name}-${date}`;

						let concept = concepts_map.get(key);

						if (!concept) {
							concept = {
								description: pi.item.name,
								date: date,
								qty: 0,
								price: pu.price,
								total: 0
							};
							concepts_map.set(key, concept);
						}

						concept.qty += pi.production.qty;
						concept.total += pi.production.qty * pu.price;
					}
				}
			}

			user_concepts.concepts = Array.from(concepts_map.values());
			user_concepts.total = user_concepts.concepts.reduce((acc, c) => acc + c.total, 0);

			this.user_concepts_list.push(user_concepts);
		}
	}
}
