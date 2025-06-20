import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { RestProduction } from '../RestClases/RestProduction';
import { GetEmpty } from '../RestClases/GetEmpty';

@Component({
	selector: 'app-registrar-produccion',
	standalone: true,
	imports: [FormsModule, CommonModule ],
	templateUrl: './registrar-produccion.component.html',
	styleUrls: ['./registrar-produccion.component.css']
})
export class RegistrarProduccionComponent implements OnInit
{
	production_areas: any[] = [];
	is_loading = false;
	error_message: string | null = null;
	search_term: string = '';
	filtered_production_areas: any[] = [];
	show_autocomplete = false;
	selected_production_area: any = null; // To store the selected area object
	item_array: any[] = [];
	users: any[] = [];
	selected_item_id: number = 0; // This will probably be the item info id
	production:Production;
	extra_qty: number = 0; //pieces???
	qty: number | '' = ''; //kilos
	store = GetEmpty.store();
    production_role_prices: any;
	alternate_qty: number | '' = '';;
	last_production_info_list:any[] = [];

	kg_total = 0;
	pieces_total = 0;

	constructor(public rest_service: RestService, private elementRef: ElementRef)
	{
		// Production is actually RestProduction
		this.production = new Production(rest_service);
	}

	ngOnInit(): void
	{
		this.loadProductionAreas();
	}

	async loadProductionAreas(): Promise<void>
	{
		const currentStore = this.rest_service.getStore();

		if (currentStore && currentStore.id)
		{
			this.is_loading = true;
			this.error_message = null;
			try
			{
				const areas = await this.production.getProductionAreas(currentStore.id);
				this.production_areas = areas.data || areas;
				console.log('Production areas loaded:', this.production_areas);
			}
			catch (error: any)
			{
				this.error_message = `Failed to load production areas: ${error.message}`;
				console.error(this.error_message, error);
				this.production_areas = [];
			}
			finally
			{
				this.is_loading = false;
			}
		}
		else
		{
			this.error_message = 'Store information is not available. Cannot load production areas.';
			console.warn(this.error_message);
			this.production_areas = [];
		}
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

		this.show_autocomplete = this.filtered_production_areas.length > 0;
	}

	selectProductionArea(area: any): void
	{
		this.selected_production_area = area;
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
		.then(([users, items, roles]) =>
		{
			this.users = users.map((u:any)=>
			{
				u.role = roles.find((r:any)=>r.id == u.role_id) || {name:'Sin Rol'};
				return u;
			});

			this.item_array = items;
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
		})
		.catch(error =>
		{
			console.error('Error loading production area items:', error);
		});
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
		}

		if( !this.selected_item_id )
		{
			alert('Por favor seleccione un producto');
			return;
		}

		console.log('Guardar button clicked');
		// Implement save logic here, potentially using this.selected_production_area
		// Implement save logic here, potentially using this.selected_production_area

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

		let data = {
			users, //Production_user
			production :
			{
				lote,
				item_id: this.selected_item_id,
				production_area_id : this.selected_production_area.id,
				store_id: this.selected_production_area.store_id,
				qty: this.qty || parseInt( this.qty as '' ),
				alternate_qty: this.alternate_qty
			}
		};

		this.qty = '';

		this.production.addProduction(data).then(response =>
		{
				console.log('Production added:', response);
			this.last_production_info_list.push({
				production: response.production,
				item: this.item_array.find(item => item.id == this.selected_item_id),
				production_area: this.selected_production_area
			})

			let kg_total = 0;
			let pieces_total = 0;

			for( let production_info of this.last_production_info_list )
			{
				kg_total += parseInt( ''+production_info.production.qty);
				pieces_total += parseInt( ''+production_info.production.alternate_qty);
			}

			this.kg_total = kg_total;
			this.pieces_total = pieces_total;
		})
		.catch(error =>
		{
			alert('Error al registrar producto');
			this.rest_service.showError(error);
		})
	}

	guraderProduction(event: Event):void
	{
		event.preventDefault();
	}
}
