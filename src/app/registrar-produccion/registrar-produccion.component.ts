import { Component, OnInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { RestProduction } from '../RestClases/RestProduction';
import { GetEmpty } from '../RestClases/GetEmpty';
import { ItemInfo } from '../Models/ItemInfo';

import { ConfirmationService } from '../services/confirmation.service';
import { filter, mergeMap, Subscription } from 'rxjs';
import { Utils } from '../classes/DateUtils';


@Component({
	selector: 'app-registrar-produccion',
	standalone: true,
	imports: [FormsModule, CommonModule ],
	templateUrl: './registrar-produccion.component.html',
	styleUrls: ['./registrar-produccion.component.css']
})
export class RegistrarProduccionComponent implements OnInit, OnDestroy
{
	production_areas: any[] = [];
	is_loading = false;
	error_message: string | null = null;
	search_term: string = '';
	filtered_production_areas: any[] = [];
	show_autocomplete = false;
	selected_production_area: any = null; // To store the selected area object
	item_info_array: ItemInfo[] = [];
	users: any[] = [];
	selected_item_id: number | undefined = 0; // This will probably be the item info id
	production: RestProduction;
	extra_qty: number = 0; //pieces???
	qty: number | '' = ''; //kilos
	store: any = GetEmpty.store();
	production_role_prices: any;
	alternate_qty: number | '' = '';
	total_registrado: number = 0;
	last_production_info_list:any[] = [];
	control:number =  1;
	selected_item: any = {name:'', background:''};

	min_weight_limit: number | null = null;
	max_weight_limit: number | null = null;

	peso_inferior_attribute_id: number | null = null;
	peso_superior_attribute_id: number | null = null;

	kg_total = 0;
	pieces_total = 0;

	produced_date: string = this.getCurrentDate();

	stores: any[] = [];
	selected_store_id: number | undefined;
	loss_percent: number | '' = '';
	total_loss=0;
	sink: Subscription | null = null;

	constructor(public rest_service: RestService, private elementRef: ElementRef, private confirmation: ConfirmationService)
	{
		// RestProduction is actually RestProduction
		this.production = new RestProduction(rest_service);
	}

	ngOnInit(): void
	{
		this.rest_service.getStores().then((stores: any[]) =>
		{
			this.stores = stores;
			const currentStore = this.rest_service.getStore();
			if (currentStore && currentStore.id)
			{
				this.selected_store_id = currentStore.id;
				this.store = currentStore;
			}
			else if (this.stores.length > 0)
			{
				this.selected_store_id = this.stores[0].id;
				this.store = this.stores[0];
			}
			this.loadProductionAreas();
		}).catch((error: any) =>
		{
			this.rest_service.showError(`Failed to load stores: ${error.message}`);
		});
	}

	onStoreSelected(store_id: number): void
	{
		this.selected_store_id = store_id;
		const selectedStore = this.stores.find(s => s.id === Number(store_id));
		this.selected_production_area = null;
		this.users = [];

		if (selectedStore)
		{
			this.store = selectedStore;

			let percents = {
				'MS': 17, //Mollusca SF
				'TN': 10, //Tina
				'ME': 10, //Mollusca Enseanada
				'CN': 10, //COnrado
				'MN': 10, //Ming
			};

			if( this.store.code in percents )
			{
				this.loss_percent = '';//(percents as any)[this.store.code] as number;
			}

			this.rest_service.setStore(store_id).then(() =>
			{
				this.selected_production_area = null;
				this.search_term = '';
				this.loadProductionAreas();
			}).catch((error: any) =>
			{
				this.rest_service.showError(`Failed to set store: ${error.message}`);
			});
		}
		else
		{
			this.rest_service.showError('Selected store not found.');
		}
	}

	loadProductionAreas()
	{
		const currentStore = this.store;

		//if (!currentStore || !currentStore.id)
		//{
		//	this.rest_service.showError('Store information is not available. Cannot load production areas.');
		//	this.production_areas = [];
		//}

		this.is_loading = true;
		this.error_message = null;

		Promise.all
		([
			this.production.getAttributes(),
			this.production.getProductionAreas(currentStore.id)
		])
		.then(([attributes,areas])=>
		{
			const pesoInferior = attributes.find((attr: any) => attr.name === 'Peso Inferior');
			const pesoSuperior = attributes.find((attr: any) => attr.name === 'Peso Superior');

			if (pesoInferior)
			{
				this.peso_inferior_attribute_id = pesoInferior.id;
			}

			if (pesoSuperior)
			{
				this.peso_superior_attribute_id = pesoSuperior.id;
			}

			console.log('PA',this.production_areas);
			this.production_areas = areas.data || areas;
		})
		.catch((error: any) =>
		{
			this.error_message = `Failed to load production areas: ${error.message}`;
			console.error(this.error_message, error);
			this.production_areas = [];
		})
		.finally(()=>
		{
			console.log('finally',this.production_areas);
			this.is_loading = false;
			this.reloadProduction();
		})

	}

	filterProductionAreas(): void
	{
		if (this.search_term.trim() === '')
		{
			this.filtered_production_areas = [];
			this.show_autocomplete = false;
			return;
		}
		this.filtered_production_areas = this.production_areas.filter(area =>
			area.name && area.name.toLowerCase().includes(this.search_term.toLowerCase())
		);

		console.log('ST',this.production_areas);
		console.log('TF',this.filtered_production_areas);

		this.show_autocomplete = this.filtered_production_areas.length > 0;
	}

	selectProductionArea(area: any): void
	{
		this.selected_production_area = area;
		this.alternate_qty = '';
		this.qty = '';
		this.search_term = area.name;
		this.show_autocomplete = false;
		this.filtered_production_areas = [];
		console.log('Selected production area:', area);

		this.is_loading = true;


		Promise.all
		([
			this.production.getUsersFromProductionArea(area.id),
			this.production.getProductionAreaItems(area.id),
			this.production.getAllRoles()
		])
		.then(([users, item_info_array, roles]) =>
		{
			this.control = 1;

			this.users = users.map((u:any)=>
			{
				u.role = roles.find((r:any)=>r.id == u.role_id) || {name:'Sin Rol'};
				return u;
			});

			this.item_info_array = item_info_array;
			console.log('Items:',this.item_info_array);

			let role_ids = this.users.filter(user=>user.role_id).map(user => user.role_id) as number[];
			return this.production.getRolesItemPrices(role_ids);
		})
		.then((production_role_prices) =>
		{
			this.production_role_prices = production_role_prices;
			this.is_loading = false;

			this.users.forEach(user =>
			{
				user.role_prices = this.production_role_prices.filter((prp:any)=>prp.role_id == user.role_id);
			});

			this.last_production_info_list = [];
			this.updateTotal()
		})
		.catch((error: any) =>
		{
			console.error('Error loading production area items:', error);
		})
		.finally(()=>
		{
			this.is_loading = false;
			this.reloadProduction();
		});
	}

	reloadProduction()
	{
		if( this.selected_production_area && this.selected_item_id && this.selected_store_id && this.produced_date )
		{
			this.is_loading = true;

			let d = Utils.getDateFromLocalMysqlString(this.produced_date);
			d.setHours(0,0,0,0);

			let end = new Date();
			end.setTime(d.getTime());
			end.setHours(23,59,59,0);

			let end_local_string = Utils.getLocalMysqlStringFromDate(end);

			this.production.getProductionInfo
			({
				item_id: this.selected_item_id,
				'produced>~':this.produced_date+' 00:00:00',
				'produced<~':end_local_string,
				production_area_id: this.selected_production_area.id,
				store_id: this.selected_store_id,
				_sort_order: 'control_DESC',
				limit: 999999
			})
			.then((response:any) =>
			{
				console.log('Reloaded production info:', response);
				response.sort((a:any,b:any) =>{
					let aa = parseInt(a.production.control);
					let bb = parseInt(b.production.control);
					return aa > bb ? -1 : 1;
				});

				this.last_production_info_list = response.map((production_info:any) =>
				{
					let ratio = production_info.production.qty_reported / production_info.production.alternate_qty;
					production_info.production.is_out_of_range = this.min_weight_limit !== null && this.max_weight_limit !== null
						&& ( ratio < this.min_weight_limit || ratio > this.max_weight_limit );

					production_info.agua_percent = production_info.production.merma_qty / production_info.production.reported_qty;

					return production_info;
				});

				this.control = response.length+1;
				this.updateTotal();
			})
			.finally(()=>
			{
				this.is_loading = false;
			});
		}
	}

	onItemSelected(item_id: number): void
	{
		this.selected_item_id = item_id;


		let item_info = this.item_info_array.find(item_info => item_info.item.id == item_id) as ItemInfo;
		let item = item_info.item;
		this.selected_item = item_info.item;

		console.log('Item selected:', item);

		if (item && item.background)
		{
			document.body.style.backgroundColor = item.background;
		}
		else
		{
			document.body.style.backgroundColor = '#ffffff';
		}

		// Load last production info for the selected item
		if (this.selected_production_area && this.selected_item_id)
		{
			let d = new Date();
			d.setHours(0,0,0,0);

			Promise.all
			([
				this.production.getProductionInfo
				({
					item_id: this.selected_item_id,
					'produced>~':d.toISOString().substring(0,19).replace('T',' '),
					production_area_id: this.selected_production_area.id,
					_sort_order: 'alternate_qty_DESC,id_DESC',
					limit: 999999
				}),
				this.production.getItemInfo(item_id)
			])
			.then(([response,item_info]) =>
			{
				const attributes = item_info.attributes;
				this.min_weight_limit = null;
				this.max_weight_limit = null;

				if (attributes)
				{
					const minWeightAttr = attributes.find((attr: any) => attr.attribute_id === this.peso_inferior_attribute_id);
					const maxWeightAttr = attributes.find((attr: any) => attr.attribute_id === this.peso_superior_attribute_id);

					this.min_weight_limit = minWeightAttr ? parseFloat(minWeightAttr.value) : null;
					this.max_weight_limit = maxWeightAttr ? parseFloat(maxWeightAttr.value) : null;
				}

				if (response && response.length > 0)
				{
					console.log('Last production info loaded:', response[0]);

					this.control = parseFloat(response[response.length-1].production.control) + 1;

					if( Number.isNaN(this.control) )
					{
						this.control = response.length;
					}
				}
				else
				{
					this.control = 1;
				}

				response.sort((a:any,b:any) =>{
					return a.production.id > b.production.id ? -1 : 1;
				});


				console.log( response );

				let x = response;


				this.last_production_info_list = x.map((production_info:any) =>
				{
					let ratio = production_info.production.qty_reported / production_info.production.alternate_qty;
					production_info.production.is_out_of_range = this.min_weight_limit !== null && this.max_weight_limit !== null
						&& ( ratio < this.min_weight_limit || ratio > this.max_weight_limit );

					return production_info;
				});
				console.log('last_production_info_list before updateTotal:', this.last_production_info_list);
				this.updateTotal();
				console.log('Control number set to:', this.control);

				this.qty = '';
				this.alternate_qty = '';
			})
			.catch((error: any) =>
			{
				console.error('Error loading last production info:', error);
				this.control = 1; // Reset to 1 on error
				this.updateTotal();
			})
			.finally(()=>
			{
				this.reloadProduction();
			});
		}
		else
		{
			this.updateTotal();
		}
	}

	onSearchFocus(): void
	{
		if (this.search_term.trim() !== '' && this.filtered_production_areas.length > 0)
		{
				this.show_autocomplete = true;
		}
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: Event): void
	{
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.show_autocomplete = false;
		}
	}

	async onGuardar():Promise<any>
	{
		if( !this.selected_production_area )
		{
			alert('Por favor seleccione una área de producción');
			//this.show_error('Por favor seleccione una área de producción');
			return;
		}

		if( !this.selected_item_id )
		{
			alert('Por favor seleccione un producto');
			return;
		}

		const calculated_ratio = (this.qty as number) / (this.alternate_qty as number);
		let is_out_of_range = false;

		if (this.min_weight_limit !== null && this.max_weight_limit !== null) {
			if (calculated_ratio < this.min_weight_limit || calculated_ratio > this.max_weight_limit) {
				is_out_of_range = true;
			}
		} else if (this.min_weight_limit !== null) {
			if (calculated_ratio < this.min_weight_limit) {
				is_out_of_range = true;
			}
		} else if (this.max_weight_limit !== null) {
			if (calculated_ratio > this.max_weight_limit) {
				is_out_of_range = true;
			}
		}

		console.log('Guardar button clicked');

		let users = this.users.map(user =>
		{
			let price = user?.role_prices?.find((prp:any) =>
			{
				return	prp.item_id == this.selected_item_id
			});

			return {
				user_id : user.id,
				production_area_id : this.selected_production_area.id,
				price : price?.price || 0,
				currency_id : 'MXN',
			}
		});

		//Lote

		let zero = (x:number) => x < 10 ? '0'+x : x;
		let date = new Date();
		let lote = this.store.code+'-'+date.getFullYear()+'-'+zero(date.getMonth()+1)+'-'+zero(date.getDate());

		let loss_qty = 0;
		let final_qty = parseFloat(this.qty as string);

		if (this.loss_percent && this.loss_percent > 0)
		{
			loss_qty = final_qty * (this.loss_percent / 100);
			final_qty -= loss_qty;
		}

		let data = {
			users, //Production_user
			production :
			{
				lote,
				item_id: this.selected_item_id,
				production_area_id : this.selected_production_area.id,
				store_id: this.selected_store_id,
				qty_reported: this.qty,
				qty: Math.floor( final_qty*100 )/100,
				alternate_qty: this.alternate_qty,
				control: ""+this.control,
				is_out_of_range: is_out_of_range,
				produced: this.produced_date,
				merma_qty: loss_qty
			}
		};

		this.production.addProduction(data).then(response =>
		{
			console.log('Production added:', response);
			this.last_production_info_list.unshift
			({
				production: data.production,
				item: this.item_info_array.find(item_info => item_info.item.id == this.selected_item_id),
				production_area: this.selected_production_area
			})

			this.control++;
			this.updateTotal();

			this.qty = '';
			//this.produced_date = this.getCurrentDate();
		})
		.catch((error: any) =>
		{
			this.rest_service.showError(error);
		})

	}

	getCurrentDate(): string
	{
		// Get the current date and time.
		const now = new Date();
		// Get the timezone offset in minutes. This value is positive if the local timezone is behind UTC and negative if it is ahead.
		const timezoneOffsetInMinutes = now.getTimezoneOffset();
		// Convert the offset to milliseconds.
		const timezoneOffsetInMilliseconds = timezoneOffsetInMinutes * 60000;
		// Subtract the offset from the current time to get the correct local time.
		const correctedTime = now.getTime() - timezoneOffsetInMilliseconds;
		// Create a new Date object with the corrected time.
		const correctedDate = new Date(correctedTime);
		console.log('Corrected date:',correctedDate.toISOString());
		// Return the date in YYYY-MM-DD format.
		return correctedDate.toISOString().split('T')[0];
	}

	updateTotal()
	{
		let kg_total = 0;
		let pieces_total = 0;
		let total_loss = 0;
		let total_registrado = 0;

		for( let production_info of this.last_production_info_list )
		{
			let kgs = parseFloat( ''+production_info.production.qty_reported);
			let merma = parseFloat( ''+production_info.production.merma_qty);

			kg_total += production_info.production.qty;

			pieces_total += parseInt( ''+production_info.production.alternate_qty);
			total_loss += merma;

			total_registrado += kgs;


		}

		this.total_loss = total_loss;
		this.total_registrado = total_registrado;

		this.kg_total = kg_total;
		this.pieces_total = pieces_total;
	}


	guraderProduction(event: Event):void
	{
		event.preventDefault();
	}

	ngOnDestroy(): void
	{
		document.body.style.backgroundColor = ''; // Reset to default or global style
		if(this.sink)
		{
			this.sink.unsubscribe();
		}
	}

	producedDateChange(date: string)
	{
		this.produced_date = date;
		this.reloadProduction();
	}
}
