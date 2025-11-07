import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { RestProduction } from '../classes/RestProduction';
import { RestConsumption } from '../classes/RestConsumption';
import { Consumption } from '../Models/Consumption'; // Import Consumption interface
import { Consumption_User } from '../Models/Consumption_User'; // Import ConsumptionUser interface
import { Production_Area } from '../Models/Production_Area'; // Import ProductionArea interface
import { ConfirmationService } from '../services/confirmation.service';
import { ProductionAreaInfo } from '../ComplexModels/ProductionAreaInfo';
import { ConsumptionInfo } from '../ComplexModels/ConsumptionInfo';
import { GetEmpty3 } from '../classes/GetEmpty3';
import { Rest } from '../classes/Rest';
import { Account } from '../Models/Account';
import { SearchObject } from '../classes/SearchObject';

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
	selected_production_area_id: number | '' = '';
	total_cost: number = 0;
	litros: number | '' = '';
	precio: number | '' = '';
	fecha: string = new Date().toISOString().split('T')[0];
	is_loading = false;
	error_message: string | null = null;
	production: RestProduction;
	consumption: RestConsumption;
	store = GetEmpty3.store();
	gas_item_info: any = null;
	users: any[] = [];
	role_list:any[] = [];
	rest_account: Rest;
	user_accounts: Map<number, Account | null> = new Map(); // Map of user_id to their main account

	constructor(public rest_service: RestService, private confirmation_service: ConfirmationService) {
		this.production = new RestProduction(rest_service);
		this.consumption = new RestConsumption(rest_service);
		this.rest_account = new Rest(rest_service, 'account');
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
			consumed: this.fecha,
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

		// Filter users by role
		const filtered_users = this.users.filter(u => role_ids.includes(u.role_id));

		// Collect users who need a Gasolina account created (total > 0 and no account)
		const users_needing_accounts: number[] = [];
		for (const user of filtered_users) {
			let total = Math.round(Number(this.precio) * Number(this.litros)*100)/400;

			// Check if user is buzo (total = 0)
			if (user.role.name.toLowerCase() === 'buzo') {
				total = 0;
			}

			// If total > 0 and user doesn't have a Gasolina account, add to list
			if (total > 0 && !this.user_accounts.get(user.id)) {
				users_needing_accounts.push(user.id);
			}
		}

		// Create all Gasolina accounts in one batch request
		if (users_needing_accounts.length > 0) {
			try {
				console.log('Users needing accounts:', users_needing_accounts);

				// Double-check: search again for these specific users to avoid duplicates
				// Use SearchObject with csv syntax
				const recheck_search = new SearchObject<Account>(['id', 'user_id', 'name', 'balance', 'currency_id', 'status', 'is_main']);
				recheck_search.csv.user_id = users_needing_accounts; // This will become user_id,=1,2,3
				recheck_search.eq.name = 'Gasolina';
				recheck_search.limit = 999999;

				const recheck_response = await this.rest_account.search(recheck_search);

				// Validate recheck response
				if (!recheck_response || !recheck_response.data) {
					console.error('Invalid response from recheck search:', recheck_response);
					this.rest_service.showError('Error al verificar cuentas existentes');
					return;
				}

				const existing_accounts: Account[] = recheck_response.data;
				console.log('Recheck found existing accounts:', existing_accounts);

				// Filter out users who already have accounts
				const final_users_to_create = users_needing_accounts.filter(user_id => {
					const exists = existing_accounts.find(acc => acc.user_id === user_id && acc.name === 'Gasolina');
					if (exists) {
						console.log(`User ${user_id} already has Gasolina account, skipping creation`);
						this.user_accounts.set(user_id, exists);
						return false;
					}
					return true;
				});

				console.log('Final users to create accounts for:', final_users_to_create);

				// Only create if there are users without accounts
				if (final_users_to_create.length > 0) {
					const currentUserId = this.rest_service.session.user_id;
					const accounts_to_create = final_users_to_create.map(user_id => ({
						user_id: user_id,
						name: 'Gasolina',
						currency_id: 'MXN',
						balance: 0,
						is_main: false,
						created_by_user_id: currentUserId,
						updated_by_user_id: currentUserId,
						status: 'ACTIVE'
					}));

					console.log('Creating accounts:', accounts_to_create);

					// Create all accounts in one request
					const created_accounts = await this.rest_account.createMultiple(accounts_to_create);

					// Validate creation response
					if (!created_accounts || !Array.isArray(created_accounts)) {
						console.error('Invalid response from createMultiple:', created_accounts);
						this.rest_service.showError('Error al crear cuentas: respuesta inválida');
						return;
					}

					// Map the created accounts to users
					for (const account of created_accounts) {
						this.user_accounts.set(account.user_id, account);
					}

					console.log(`Created ${created_accounts.length} Gasolina accounts successfully`);
				} else {
					console.log('All accounts already exist, no creation needed');
				}
			} catch (error: any) {
				console.error('Error creating Gasolina accounts:', error);
				this.rest_service.showError('Error al crear cuentas de Gasolina: ' + (error.message || error));
				return;
			}
		}

		// Now create consumption_user objects with the correct account_id
		let consumption_users = filtered_users.map(user =>
		{
			let total = Math.round(Number(this.precio) * Number(this.litros)*100)/400;
			let price = Number(this.precio)/4;

			if(user.role.name.toLowerCase() === 'buzo'){
				total = 0;
				price = 0;
			}

			// Get the user's "Gasolina" account (should exist now if total > 0)
			// Only assign account_id if the total is greater than zero
			const user_account = this.user_accounts.get(user.id);
			const account_id = (total > 0 && user_account) ? user_account.id : null;

			let consumption_user: Consumption_User =
			{
				id: 0, // Will be set by backend
				created_by_user_id: 0,
				created: '', // Will be set by backend
				currency_id: 'MXN', // Assuming MXN as default currency
				price: price,
				consumption_id: 0,
				total: total,
				updated_by_user_id: 0,
				updated: '',
				user_id: user.id,
				account_id: account_id, // Assigned when total > 0
			};

			return consumption_user;
		});


		const data: ConsumptionInfo = {
			consumption: consumption,
			production_area: ({} as Production_Area),
			users: consumption_users,
		};

		this.consumption.addConsumptionInfo(data)
		.then((response:any) =>
		{
			console.log('Consumption added:', response);
			this.rest_service.showSuccess('Consumo de gasolina registrado exitosamente!');
			// Clear form fields
			this.selected_production_area_id = '';
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
		this.loadUserAccounts();
	}

	/**
	 * Load "Gasolina" accounts for all users in the current production area
	 * Searches for accounts with name='Gasolina' and currency_id='MXN' for each user
	 */
	async loadUserAccounts(): Promise<void>
	{
		if (this.users.length === 0) {
			return;
		}

		try {
			// Get all user IDs
			const user_ids = this.users.map(u => u.id);

			// Create SearchObject to use csv syntax for multiple user_ids
			const search = new SearchObject<Account>(['id', 'user_id', 'name', 'balance', 'currency_id', 'status', 'is_main']);
			search.csv.user_id = user_ids; // This will become user_id,=1,2,3
			search.eq.name = 'Gasolina';
			search.limit = 999999;

			// Search for "Gasolina" accounts
			const response = await this.rest_account.search(search);

			// Validate response
			if (!response || !response.data) {
				console.error('Invalid response from account search:', response);
				this.rest_service.showError('Error al buscar cuentas: respuesta inválida');
				return;
			}

			const accounts: Account[] = response.data;
			console.log('Found Gasolina accounts:', accounts);

			// Map each user to their Gasolina account (or null if they don't have one yet)
			this.user_accounts.clear();
			for (const user of this.users) {
				const gasolina_account = accounts.find(acc =>
					acc.user_id === user.id &&
					acc.name === 'Gasolina'
				);
				this.user_accounts.set(user.id, gasolina_account || null);
			}

			console.log('User Gasolina accounts loaded:', this.user_accounts);
		} catch (error: any) {
			console.error('Error loading user Gasolina accounts:', error);
			this.rest_service.showError('Error al buscar cuentas de Gasolina: ' + (error.message || error));
		}
	}

	last_consumptions: ConsumptionInfo[] = [];

	productionAreaSelected(id: number | undefined): void
	{
		this.selected_production_area_id = id || '';
		let production_area_info = this.production_area_info_list.find(pa => pa.production_area.id == id) as ProductionAreaInfo;
		this.store = production_area_info.store;

		console.log('Selected production area:', production_area_info);

		this.users = production_area_info.users.map(u=>
		{
			u.role = this.role_list.find(r=>r.id == u.role_id) || {name:'Sin Rol'};
			return u;
		});
		console.log('Selected production area:', production_area_info);
		console.log('Users:', this.users);
		this.loadUserAccounts(); // Load accounts for the selected users
		this.loadLastConsumptions();
	}

	loadLastConsumptions():void
	{
		if (!this.selected_production_area_id)
		{
			return;
		}

		this.consumption.searchConsumptionInfo
		({
			production_area_id: this.selected_production_area_id, item_id: this.gas_item_info.item.id,
			limit: 3,
			_sort: 'consumed_DESC',
		})
		.then((consumptions:any[]) =>
		{
			consumptions.sort((a, b) => a.consumed > b.consumed ? 1 : -1);
			this.last_consumptions = consumptions;
		})
		.catch((error:any) =>
		{
			this.rest_service.showError("No se pudieron cargar los últimos consumos")
		});
	}

	removeConsumption(consumption_info: ConsumptionInfo): void {
		this.confirmation_service.showConfirmAlert(
			consumption_info,
			'Eliminar consumo',
			'¿Está seguro de que desea eliminar este consumo?'
		).subscribe(result => {
			if (result.accepted) {
				this.consumption.remove(consumption_info.consumption.id)
					.then(() => {
						this.rest_service.showSuccess('Consumo eliminado correctamente');
						this.loadLastConsumptions();
					})
					.catch(error => {
						this.rest_service.showError(error);
					});
			}
		});
	}
}
