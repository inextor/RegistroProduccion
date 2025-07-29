import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { RestProduction } from '../RestClases/RestProduction';
import { GetEmpty } from '../RestClases/GetEmpty';
import { ConsumptionInfo } from '../Models/ConsumptionInfo';
import { Consumption } from '../Models/Consumption'; // Import Consumption interface
import { Consumption_User } from '../Models/Consumption_User'; // Import ConsumptionUser interface
import { Production_Area } from '../Models/Production_Area'; // Import ProductionArea interface
import { ProductionAreaInfo } from '../Models/ProductionAreaInfo';

@Component
({
	selector: 'app-registrar-gasolina',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './registrar-gasolina.component.html',
	styleUrls: ['./registrar-gasolina.component.css']
})

export class RegistrarGasolinaComponent implements OnInit
{
	production_area_info_list:ProductionAreaInfo[] = [];
	selected_production_area_id: number | undefined;
	total_cost: number = 0;
	litros: number | '' = '';
	precio: number | '' = '';
	fecha: string = new Date().toISOString().split('T')[0];
	is_loading = false;
	error_message: string | null = null;
	production: RestProduction;
	store = GetEmpty.store();
    gas_item_info: any = null;
	users: any[] = [];
	role_list:any[] = [];

	constructor(public rest_service: RestService) {
		this.production = new RestProduction(rest_service);
	}

	ngOnInit(): void
	{
		this.loadProductionAreas();
	}

	calculateTotalCost(): void
	{
		if (this.litros && this.precio) {
			this.total_cost = this.litros * this.precio;
		} else {
			this.total_cost = 0;
		}
	}

	async loadProductionAreas(): Promise<void>
	{
		const currentStore = this.rest_service.getStore();

		if (!(currentStore && currentStore.id))
		{
			this.error_message = 'Store information is not available. Cannot load production areas.';
			console.warn(this.error_message);
			this.production_area_info_list = [];
		}

		this.is_loading = true;
		this.error_message = null;

		try {
			let areas_p = this.production.searchProductionAreaInfo({limit: 999999});
			let gas_p = this.production.searchItemInfo('Gasolina');
			let roles_p = this.production.getAllRoles();

			let [areas, gas, roles] = await Promise.all([areas_p, gas_p, roles_p]);
			this.role_list = roles;

			if( gas.length === 0 )
			{
				throw new Error('No se encontró gasolina en la base de datos');
			}

			this.production_area_info_list = areas;
			this.gas_item_info = gas[0];
			console.log('Production areas loaded:', this.production_area_info_list);
		}
		catch (error: any)
		{
			this.error_message = `Failed to load production areas: ${error.message}`;
			console.error(this.error_message, error);
			this.production_area_info_list = [];
		}
		finally
		{
			this.is_loading = false;
		}
	}

	async onGuardar(): Promise<any>
	{
		if (!this.selected_production_area_id) {
			alert('Por favor seleccione un área de producción');
			return;
		}

		if (this.litros === '' || this.litros <= 0) {
			alert('Por favor ingrese una cantidad de litros válida');
			return;
		}

		if (this.precio === '' || this.precio <= 0) {
			alert('Por favor ingrese un precio válido');
			return;
		}

		console.log('Guardar button clicked');

		let zero = (x: number) => x < 10 ? '0' + x : '' + x;
		let date = new Date();
		let lote = this.store.code + '-' + date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate());

		const currentStore = this.rest_service.getStore();
		const currentUserId = this.rest_service.session.user_id;

		const consumption: Consumption = {
			id: 0, // Will be set by backend
			item_id: this.gas_item_info.item.id,
			qty: Number(this.litros),
			price: Number(this.precio),
			production_area_id: this.selected_production_area_id,
			consumed_by_user_id: null, // Assuming the current user is the consumer
			store_id: this.store.id,
			description: `Gasolina: ${this.litros} litros @ ${this.precio} MXN/litro`,
			status: 'ACTIVE',
			created: this.fecha, // Will be set by backend
			created_by_user_id: currentUserId,
			updated: '', // Will be set by backend
			updated_by_user_id: currentUserId,
		};

		let role_ids = this.role_list.filter(role=>
		{
			return true;
			//let role_name = role.name.toLowerCase();
			//return ['marinero','capitan'].includes(role_name);
		})
		.map(role => role.id) as number[];

		let prices = await this.production.getGasolinaPrice(role_ids, this.gas_item_info.item.id);

		let consumption_users = this.users
		.filter(u=>role_ids.includes(u.role_id))
		.map(user =>
		{
			let price = prices.find(p=>p.role_id == user.role_id);
			let consumption_user: Consumption_User =
			{
				id: 0, // Will be set by backend
				created_by_user_id: 0,
				created: '', // Will be set by backend
				currency_id: 'MXN', // Assuming MXN as default currency
				price: price ? price.price : 0,
				consumption_id: 0,
				total: Math.round(Number(this.precio) * Number(this.litros)*100)/400,
				updated_by_user_id: 0,
				updated: '',
				user_id: user.id,
			};

			return consumption_user;
		});


		const data: ConsumptionInfo = {
			consumption: consumption,
			production_area: ({} as Production_Area),
			users: consumption_users,
		};

		this.production.addConsumptionInfo(data)
		.then(response =>
		{
			console.log('Consumption added:', response);
			alert('Consumo de gasolina registrado exitosamente!');
			// Clear form fields
			this.selected_production_area_id = undefined;
			this.total_cost = 0;
			this.litros = '';
			this.precio = '';
			this.fecha = new Date().toISOString().split('T')[0];
			this.users = []; // Clear selected users if any
		})
		.catch((error: any) =>
		{
			this.rest_service.showError(error);
		});
	}

	public setCurrentUsers(users: any[]): void
	{
		this.users = users.map(u=>
		{
			u.role = this.role_list.find(r=>r.id == u.role_id) || {name:'Sin Rol'};
			return u;
		});
	}

	productionAreaSelected(id: number | undefined): void
	{
		this.selected_production_area_id = id;
		let production_area_info = this.production_area_info_list.find(pa => pa.production_area.id == id) as ProductionAreaInfo;
		this.selected_production_area_id  = id;
		this.store = production_area_info.store;

		console.log('Selected production area:', production_area_info);

		this.users = production_area_info.users.map(u=>
		{
			u.role = this.role_list.find(r=>r.id == u.role_id) || {name:'Sin Rol'};
			return u;
		});
		console.log('Selected production area:', production_area_info);
		console.log('Users:', this.users);
	}
}
