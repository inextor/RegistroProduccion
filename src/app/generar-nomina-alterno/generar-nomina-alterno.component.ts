import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortDatePipe } from '../pipes/short-date.pipe';
import { Payroll_Value } from '../Models/Payroll_Value';
import { Payroll } from '../Models/Payroll';
import { User } from '../Models/User';
import { mergeMap } from 'rxjs';
import { Rest } from '../classes/Rest';
import { ProductionAreaInfo } from '../ComplexModels/ProductionAreaInfo';
import { RestProduction } from '../classes/RestProduction';
import { RestConsumption } from '../classes/RestConsumption';
import { Account } from '../Models/Account';
import { SearchObject } from '../classes/SearchObject';

// Constant to indicate that the default/main account should be used
// When account_id is set to this value, the backend will retrieve or create the user's main account
const DEFAULT_ACCOUNT_ID = -1;

interface PayrollInfo
{
	values: Payroll_Value[];
	user: User;
	payroll:Payroll;
	role?: any;
	prices: number[];
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
	rest_payroll_info: Rest;
	rest_account: Rest;
	user_account_map: Map<number, number> = new Map();
	user_account_balance_map: Map<number, number> = new Map();
	user_gasolina_account_map: Map<number, number> = new Map(); // Map user_id -> gasolina_account_id
	user_accounts: Account[] = []; // All accounts for the current user being edited
	selected_account_id: number = DEFAULT_ACCOUNT_ID;
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

	is_adding_deduction:boolean = false;
	editing_payroll_info: PayrollInfo | null = null;
	editing_user_balance:number = 0;
	new_deduction: Payroll_Value = {
		id: 0,
		payroll_id: 0,
		type: 'DEDUCTION',
		description: '',
		value: 0,
		datetime: new Date().toISOString().slice(0, 10),
		status: 'ACTIVE',
		created: new Date().toISOString().slice(0, 10),
		account_id: null
	};


	production_area_info:ProductionAreaInfo | null = null;
	user_extra_deductions:Map<number,Payroll_Value[]> = new Map();
	super_total: number = 0;
	current_payroll_info_list: PayrollInfo[] = [];

	constructor(public rest_service: RestService, public route: ActivatedRoute, public router:Router) {
		this.rest_production = new RestProduction(rest_service);
		this.rest_consumption = new RestConsumption(rest_service);
		this.rest_payroll_info = new Rest(rest_service,'payroll_info');
		this.rest_account = new Rest(rest_service, 'account');
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
			production_search['produced>~'] = this.start_date+' 00:00:00';
			consumed_search['consumed>~'] = this.start_date+' 00:00:00';

		}

		if (this.end_date) {
			production_search['produced<~'] = this.end_date+' 23:59:59';
			consumed_search['consumed<~'] = this.end_date+' 23:59:59';
		}

		Promise.all([
			this.rest_production.getUsersFromProductionArea(this.production_area_id),
			this.rest_production.searchProductionInfo(production_search),
			this.rest_consumption.searchConsumptionInfo(consumed_search),
		])
		.then(([users, production_info, consumption_info]) =>
		{
			let user_ids = users.map((user:User)=>user.id);
			const payroll_search= {
				'start_date<~': this.end_date,
				'end_date>~': this.start_date,
				'user_id,' : user_ids.join(','),
				'status' : 'ACTIVE',
				limit : user_ids.length
			};

			return Promise.all
			([
				users,
				production_info,
				consumption_info,
				this.rest_payroll_info.search( payroll_search )
			])
		})
		.then(([users, production_info, consumption_info, response_payroll_info])=>
		{
			this.user_list = users;

			if( response_payroll_info.total )
			{
				this.rest_service.showError('Ya existe una nomina para el equipo en el rango de fecha', false);
				this.current_payroll_info_list = response_payroll_info.data;
			}

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

	processProductionAndConsumption() {
		this.payroll_info_list = [];

		// Check if we're in review mode (existing payroll found)
		const is_review_mode = this.current_payroll_info_list.length > 0;

		for (const user of this.user_list) {
			const payroll: Payroll = {
				id: 0,
				store_id: 1,
				start_date: this.start_date,
				end_date: this.end_date,
				paid_timestamp: null,
				user_id: user.id,
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

						if( pu.price == 0)
						{
							continue;
						}

						if (payroll_value == undefined) {

							payroll_value = {
								id: 0,
								payroll_id: 0,
								description: 'Producción del día ' + date,
								type: 'PERCEPTION',
								value: 0,
								datetime: pi.production.produced,
								status: 'ACTIVE',
								created: date,
								account_id: null
							};

							payroll_values_map.set(key, payroll_value as Payroll_Value);
						}

						payroll_value.value += pi.production.qty * pu.price;
					}
				}
			}

		// Process consumption deductions based on user-specific consumption_user records
		// Skip this in review mode - use saved payroll values instead
		// Each consumption has a users array with per-user amounts already calculated
		if (!is_review_mode) {
			for (const ci of this.consumption_info_list) {
			// Skip if no users array
			if (!ci.users || !Array.isArray(ci.users)) {
				continue;
			}

			// Find the consumption_user record for this specific user
			const cu = ci.users.find((consumption_user: any) => consumption_user.user_id === user.id);

			// Skip if no record for this user or if total is 0 (e.g., Buzo role)
			if (!cu || cu.total === 0) {
				continue;
			}

			const date = ci.consumption.consumed.substring(0, 10);
			const key = `${ci.item.name}-${date}`;

			let payroll_value: Payroll_Value | undefined = payroll_values_map.get(key);

			if (payroll_value == undefined) {
				// Determine the account_id for this deduction
				let deduction_account_id = cu.account_id || null;

				// For gasoline deductions without account_id, use the gasolina account from map
				const is_gasolina = ci.item?.id === 56 || ci.consumption.description?.toLowerCase().includes('gasolina');
				if (!deduction_account_id && is_gasolina) {
					deduction_account_id = this.user_gasolina_account_map.get(user.id) || null;
				}

				payroll_value = {
					id: 0,
					payroll_id: 0,
					description: ci.consumption.description || ci.item.name,
					type: 'DEDUCTION',
					datetime: date,
					value: cu.total, // Use the user-specific deduction amount from consumption_user
					status: 'ACTIVE',
					created: date,
					account_id: deduction_account_id // Use account_id (creates "abono" to that account)
				};

				payroll_values_map.set(key, payroll_value as Payroll_Value);
			} else {
				// If the payroll_value already exists, add the user-specific amount to it
				payroll_value.value += cu.total;
			}
			}
		} // End if (!is_review_mode)

			const payroll_values = Array.from(payroll_values_map.values());
			payroll_values.sort((a, b) => {
				let a_v = a.type === 'PERCEPTION' ? 0 : 1;
				let b_v = b.type === 'PERCEPTION' ? 0 : 1;

				if( a_v === b_v)
				{
					if( a.datetime === b.datetime)
					{
						return a.description.localeCompare(b.description);
					}

					if( a.datetime && !b.datetime)
					{
						return -1;
					}

					if( !a.datetime && b.datetime)
					{
						return 1;
					}
					let aa = a.datetime as string;
					let bb = b.datetime as string;

					return aa.localeCompare(bb);
				}

				return a_v - b_v;
			});

			const subtotal = payroll_values.filter(pv => pv.type === 'PERCEPTION').reduce((acc, pv) => acc + pv.value, 0);
			const deductions = payroll_values.filter(pv => pv.type === 'DEDUCTION').reduce((acc, pv) => acc + pv.value, 0);
			payroll.subtotal = subtotal;
			payroll.total = subtotal - deductions;

			// Collect unique prices for this user from production
			const user_prices_set = new Set<number>();
			for (const pi of this.production_info_list) {
				for (const pu of pi.users) {
					if (pu.user_id === user.id && pu.price > 0) {
						user_prices_set.add(pu.price);
					}
				}
			}
			const user_prices = Array.from(user_prices_set).sort((a, b) => b - a);

			const payroll_info: PayrollInfo = {
				user: user,
				payroll: payroll,
				values: payroll_values,
				role: user.role,
				prices: user_prices
			};

			this.payroll_info_list.push(payroll_info);
		}

		if (is_review_mode) {
			// In review mode, use the saved payroll values entirely
			for (const current_payroll_info of this.current_payroll_info_list) {
				const new_payroll_info = this.payroll_info_list.find(p => p.user.id === current_payroll_info.user.id);
				if (new_payroll_info) {
					// Replace calculated values with saved values (which include all deductions)
					new_payroll_info.values = current_payroll_info.values;
					new_payroll_info.payroll = current_payroll_info.payroll;
					this.updatePayrollInfoTotal(new_payroll_info);
				}
			}
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


		let super_total = 0;

		for(let payroll_info of this.payroll_info_list )
		{
			for(let v of payroll_info.values)
			{
				if( v.type == 'PERCEPTION' )
					super_total += v.value;
			}
		}

		this.super_total = super_total;
	}

	async agruparYCalcularTotales() {
		const user_ids = this.user_list.map(u => u.id);
		if (user_ids.length > 0) {
			try {
				const response = await this.rest_account.search({ 'user_id,': user_ids.join(','), limit: 99999 });
				const accounts = response.data;

				// Create a map of user_id -> account_id (main accounts)
				for (const account of accounts) {
					if (account.is_main && !this.user_account_map.has(account.user_id)) {
						this.user_account_map.set(account.user_id, account.id);
						this.user_account_balance_map.set(account.user_id, account.balance);
					}

					// Track Gasolina accounts
					if (account.name === 'Gasolina') {
						this.user_gasolina_account_map.set(account.user_id, account.id);
					}
				}

				// Ensure all users have a Gasolina account (create if missing)
				await this.ensureGasolinaAccounts();

				this.processProductionAndConsumption();
			} catch (error) {
				this.rest_service.showError(error);
			}
		} else {
			this.processProductionAndConsumption();
		}
	}

	async ensureGasolinaAccounts() {
		const users_without_gasolina: number[] = [];

		// Find users without Gasolina account
		for (const user of this.user_list) {
			if (!this.user_gasolina_account_map.has(user.id)) {
				users_without_gasolina.push(user.id);
			}
		}

		// Create Gasolina accounts for users that don't have one
		if (users_without_gasolina.length > 0) {
			const currentUserId = this.rest_service.session.user_id;
			const accounts_to_create = users_without_gasolina.map(user_id => ({
				user_id: user_id,
				name: 'Gasolina',
				currency_id: 'MXN',
				balance: 0,
				is_main: null, // Gasolina accounts are not main accounts
				created_by_user_id: currentUserId,
				updated_by_user_id: currentUserId,
				status: 'ACTIVE'
			}));

			try {
				const created_accounts = await this.rest_account.createMultiple(accounts_to_create);

				// Add the newly created accounts to the map
				for (const account of created_accounts) {
					this.user_gasolina_account_map.set(account.user_id, account.id);
				}
			} catch (error) {
				console.error('Error creating Gasolina accounts:', error);
				this.rest_service.showError('Error al crear cuentas de Gasolina: ' + error);
			}
		}
	}

	updatePayrollInfoTotal(payroll_info:PayrollInfo)
	{
		let payroll_values = payroll_info.values;
		const subtotal = payroll_values.filter(pv => pv.type === 'PERCEPTION').reduce((acc, pv) => acc + pv.value, 0);
		const deductions = payroll_values.filter(pv => pv.type === 'DEDUCTION').reduce((acc, pv) => acc + pv.value, 0);

		payroll_info.payroll.subtotal = subtotal;
		payroll_info.payroll.total = subtotal - deductions;
	}


	savePayroll()
	{
		let payroll_info_array = [];

		this.rest_production.getProductionAreaInfo( this.production_area_id as number)
		.then((production_area_info:ProductionAreaInfo)=>
		{
			let payroll_info_array = production_area_info.users.map((production_user)=>{
				let payroll:Payroll= {
					id: 0,
					created:'',
					end_date:this.end_date,
					paid_status: 'PENDING',
					paid_timestamp: null,
					user_id: production_user.user_id,
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

	async showAddExtraDeduction(payroll_info: any) {
		this.editing_payroll_info = payroll_info;
		this.editing_user_balance = this.user_account_balance_map.get(payroll_info.user.id) || 0;

		// Load all accounts for this user
		try {
			const search = new SearchObject<Account>(['id', 'user_id', 'name', 'balance', 'currency_id', 'status', 'is_main']);
			search.eq.user_id = payroll_info.user.id;
			search.limit = 999999;

			const response = await this.rest_account.search(search);
			this.user_accounts = response.data || [];

			// Default to the main account or first account
			if (this.user_accounts.length > 0) {
				const main_account = this.user_accounts.find(acc => acc.is_main);
				this.selected_account_id = main_account ? main_account.id : this.user_accounts[0].id;
			} else {
				this.selected_account_id = DEFAULT_ACCOUNT_ID;
			}
		} catch (error) {
			console.error('Error loading user accounts:', error);
			this.user_accounts = [];
			this.selected_account_id = DEFAULT_ACCOUNT_ID;
		}

		// Get default description based on selected account
		let default_description = '';
		const selected_account = this.user_accounts.find(acc => acc.id === this.selected_account_id);
		if (selected_account) {
			default_description = `Abono ${selected_account.name}`;
		} else if (this.selected_account_id === DEFAULT_ACCOUNT_ID) {
			default_description = 'Abono Cuenta Principal';
		}

		this.new_deduction = {
			id: 0,
			payroll_id: payroll_info.payroll.id,
			type: 'DEDUCTION',
			description: default_description,
			value: 0,
			datetime: new Date().toISOString().slice(0, 10),
			status: 'ACTIVE',
			created: new Date().toISOString().slice(0, 10),
			account_id: this.selected_account_id
		};
		this.is_adding_deduction = true;
	}

	onAccountSelectionChange() {
		// Get the selected account
		const selected_account = this.user_accounts.find(acc => acc.id === this.selected_account_id);

		if (selected_account && this.editing_payroll_info) {
			// Set default description for all accounts
			this.new_deduction.description = `Abono ${selected_account.name}`;

			// Special handling for Gasolina account
			if (selected_account.name.toLowerCase().includes('gasolina')) {
				// Calculate gasolina debt (negative balance becomes positive debt)
				const gasolina_debt = selected_account.balance < 0 ? Math.abs(selected_account.balance) : 0;

				// Get the user's current payroll total (salary after existing deductions)
				const payroll_total = this.editing_payroll_info.payroll.total;

				// Auto-populate with the lesser of gasolina debt or salary
				const deduction_amount = Math.min(gasolina_debt, payroll_total);

				// Update the deduction amount
				this.new_deduction.value = deduction_amount;
			}
		} else if (this.selected_account_id === DEFAULT_ACCOUNT_ID) {
			// Default account (main account)
			this.new_deduction.description = 'Abono Cuenta Principal';
		}
	}

	formatDate(dateString: string): string {
		// Convert ISO date to readable format (e.g., "2025-11-04" -> "04/11/2025")
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	saveNewDeduction() {
		if( this.editing_payroll_info == null)
		{
			this.rest_service.showError('Ocurrió un error al agregar la deducción');
			return;
		}

		if( this.new_deduction.value == 0)
		{
			this.rest_service.showError('Debe ingresar un valor para la deducción');
			return;
		}

		// Update the deduction with the selected account
		this.new_deduction.account_id = this.selected_account_id;

		this.editing_payroll_info.values.push({...this.new_deduction});

		this.new_deduction = {
			id: 0,
			account_id: this.selected_account_id,
			payroll_id: 0,
			type: 'DEDUCTION',
			description: '',
			value: 0,
			datetime: this.start_date+' 00:00:00',
			status: 'ACTIVE',
			created: new Date().toISOString().slice(0, 10),
		};

		this.updatePayrollInfoTotal(this.editing_payroll_info);
		// TODO: Save to backend
		this.is_adding_deduction = false;
	}

	removeDeduction(payroll_info: PayrollInfo, value: Payroll_Value) {
		const index = payroll_info.values.indexOf(value);
		if (index > -1) {
			payroll_info.values.splice(index, 1);
			this.updatePayrollInfoTotal(payroll_info);
		}
	}

	cancelNewDeduction() {
		this.is_adding_deduction = false;
	}

	async save()
	{

		let to_save = this.payroll_info_list.filter(p => p.values.length > 0);

		this.rest_payroll_info.create( to_save ).then(()=>
		{
			this.rest_service.showSuccess('Nóminas guardadas');
			this.router.navigate(['/listar-nominas']);
		})
		.catch((error)=>
		{
			this.rest_service.showError(error);
		});
	}
}
