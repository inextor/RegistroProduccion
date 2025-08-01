import { Component, OnInit } from '@angular/core';
import { RestProduction } from '../RestClases/RestProduction';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestConsumption } from '../RestClases/RestConsumption';
import { Rest } from '../classes/Rest';

interface Resume{
	date:string;
	piezas: number;
	kilos: number;
	production_info_list: any[];
};

interface UserResume{
	price: number;
	user: any;
	total_pieces: number;
	total_kgs: number;
	total_to_pay: number;
	role: any;
	total_consumo_liters: number;
	total_consumo_total: number;
};

@Component({
	selector: 'app-generar-nomina',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: './generar-nomina.component.html',
	styleUrl: './generar-nomina.component.css'
})
export class GenerarNominaComponent implements OnInit
{

	rest_production: RestProduction;
	rest_consumption: RestConsumption;
	production_area_list:any[] = [];
	production_area_id: number | '' = '';
	production_info_list: any[] = [];
	consumption_info_list: any[] = [];
	rest_ledger:Rest;
	start_date: string = '';
	ledger_info_list:any[] = [];
	end_date: string = '';
	rest_consumption_user: Rest;
	consumption_user_list: any[] = []
	resume: Resume[] = [];
	rest_role: Rest
	role_list: any[] = [];
	user_list: any[] = [];
	user_resume_list: UserResume[] = [];
	total_pieces: number = 0;
	total_kgs: number = 0;

	constructor(public rest_service: RestService, public route: ActivatedRoute, router: Router)
	{
		this.rest_production = new RestProduction(rest_service);
		this.rest_consumption = new RestConsumption(rest_service);
		this.rest_consumption_user = new Rest(rest_service,'consumption_user');
		this.rest_ledger = new Rest(rest_service,'ledger_info');
		this.rest_role = new Rest(rest_service,'role');
	}

	ngOnInit()
	{
		this.route.queryParamMap.subscribe((params:any) =>
		{
			this.start_date = params.get('start_date');
			this.end_date = params.get('end_date');
			this.production_area_id = params.get('production_area_id');
		});

		this.rest_production.getAllProductionAreas()
		.then((data:any) =>
		{
			this.production_area_list = data;
		});

	}

	onDateSearchByDate()
	{

	}

	searchProductionAreaData()
	{
		this.user_list = [];
		this.role_list = [];
		this.production_info_list = [];


		Promise.all
		([
			this.rest_production.getUsersFromProductionArea(this.production_area_id),
			this.rest_production.searchProductionInfo({'production_area_id':this.production_area_id, 'created>~':this.start_date,'status':'ACTIVE'}),
			this.rest_consumption.searchConsumptionInfo({'production_area_id':this.production_area_id, 'created>~':this.start_date}),
			this.rest_role.search({limit:999999})
		])
		.then(([users, production_info, consumption_info,role_response]) =>
		{
			this.production_info_list = production_info;
			this.consumption_info_list = consumption_info;
			this.user_list = users;
			this.role_list = role_response.data;

			let user_ids = users.map((user:any) => user.id);

			if( user_ids.length === 0 )
			{
				throw new Error('No se encontraron usuarios asociados a la área de producción seleccionada');
			}

			return this.rest_consumption_user.search({'user_id,':user_ids,'created>~':this.start_date, 'created<~=':this.end_date, limit:999999});
		})
		.then((response) =>
		{
			this.consumption_user_list = response.data;
			this.generateReumenDays();
		})
		.catch((error) =>
		{
			this.rest_service.showError(error);
		});
	}

	generateReumenDays()
	{
		let days = [];

		for(let pi of this.production_info_list)
		{
			let date = pi.production.produced.substring(0,10);

			let r:Resume |undefined = days.find((d:any)=>date === d.date);

			this.total_pieces += pi.production.alternate_qty;
			this.total_kgs += pi.production.qty;

			if( !r )
			{
				r= {
					date,
					piezas: 0,
					kilos: 0,
					production_info_list: []
				};
				days.push(r);
			}

			let pi_item = r.production_info_list.find((pi:any)=>pi.item.id === pi.item.id);

			if( pi_item )
			{
				pi_item.production.qty += pi.production.qty;
				pi_item.production.alternate_qty += pi.production.alternate_qty;
			}
			else
			{
				let pn = {...pi};
				pn.production = {...pi.production};
				//Ponemos nuevos atributos para nosubreescribir los existentes;
				pn.production.qty = 0;
				pn.production.alternate_qty = 0;
				pi_item = pn;

				r.production_info_list.push(pi_item);
			}

			pi_item.production.qty += pi.production.qty;
			pi_item.production.alternate_qty += pi.production.alternate_qty;

			r.piezas += pi.production.alternate_qty;
			r.kilos += pi.production.qty;
		}

		days.sort((a,b)=>
		{
			return a.date > b.date ? 1 : -1;
		});

		for(let r of days)
		{
			r.production_info_list.sort((a,b)=>
			{
				return a.item.sort_weight < b.item.sort_weight ? 1 : -1;
			});

			console.log(r.production_info_list);
			let m = r.production_info_list.find((pi:any)=>pi.item.name.toLowerCase().includes('muerta'));

			if( !m )
			{
				r.production_info_list.push({item:{name:'Muerta',sort_weight:0},production:{qty:0,alternate_qty:0}});
			}
		}

		//Generarcion resumen usuario

		let user_resume_list = [];

		for(let u of this.user_list)
		{
			let role = this.role_list.find(r=>r.id == u.role_id);
			let total= 0;

			let total_pieces = 0;
			let total_kgs = 0;
			let total_to_pay = 0;

			let price = 0;
			let count = 0;


			for(let pi of this.production_info_list)
			{
				let found = 0;
				for(let pu of pi.users)
				{
					if( pu.user_id != u.id )
						continue;

					count++;

					if( pu.price > 0 )
					{
						total_pieces += pi.production.alternate_qty;
						total_kgs += pi.production.qty;
						total_to_pay += pi.production.qty * pu.price;
						price = pu.price;
						console.log
						console.log('se conto'+u.name+' '+pi.production.id+' '+pi.production.qty );
					}
					else
					{
						console.log("foooo"+JSON.stringify(u));
						//console.log('se conto'+pu.user.name+' '+pi.production.id+' '+pi.production.qty );
					}
					found++;
				}

				if( found === 0 )
				{
					console.log("foooo"+JSON.stringify(u));
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
						console.log('Consumo total', total_consumo_liters, total_consumo_total);
					}
					else
					{
						console.log('No se conto', '\n', ci.consumption.qty);
					}
				}
			}

			user_resume_list.push({user:u,total_pieces,total_kgs,total_to_pay, role, total_consumo_liters, total_consumo_total, price});
		}

		this.resume = days;
		this.user_resume_list = user_resume_list;
		console.log('user_resume_list',this.user_resume_list);
	}


	getDateFromString(str:string):Date
	{
		let components = str.split(/-|:|\s|T/g);

		let f:number[] = [];

		f.push( parseInt(components[0]) );
		f.push( parseInt(components[1])-1 );
		f.push( parseInt(components[2]) );
		f.push( components.length<4?0:parseInt(components[3]))
		f.push( components.length<5?0:parseInt(components[4]))
		f.push( components.length<6?0:parseInt(components[5]))

		return new Date( f[0], f[1], f[2], f[3], f[4], f[5], 0);
	}
}
