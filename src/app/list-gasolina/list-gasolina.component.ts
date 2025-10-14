import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RestService } from '../rest.service';
import { RestProduction } from '../classes/RestProduction';
import { RestConsumption } from '../classes/RestConsumption';
import { Utils } from '../classes/DateUtils';
import { ConsumptionInfo } from '../ComplexModels/ConsumptionInfo';
import { ProductionAreaInfo } from '../ComplexModels/ProductionAreaInfo';
import { ConfirmationService } from '../services/confirmation.service';

@Component({
	selector: 'app-list-gasolina',
	standalone: true,
	imports: [FormsModule, CommonModule, RouterLink],
	templateUrl: './list-gasolina.component.html',
	styleUrls: ['./list-gasolina.component.css']
})
export class ListGasolinaComponent implements OnInit {
	gasolina_consumptions: ConsumptionInfo[] = [];
	production_area_info_list: ProductionAreaInfo[] = [];
	selected_production_area_id: number | '' = '';
	start_date: string = '';
	end_date: string = '';
	is_loading = false;
	error_message: string | null = null;
	total_liters: number = 0;
	total_cost: number = 0;
	gas_item_id: number = 56;

	private rest_production: RestProduction;
	private rest_consumption: RestConsumption;

	constructor( public rest_service: RestService, private confirmation_service: ConfirmationService) {
		this.rest_production = new RestProduction(rest_service);
		this.rest_consumption = new RestConsumption(rest_service);

		const today = new Date();
		this.end_date = Utils.getLocalMysqlStringFromDate(today).split(' ')[0];
		const sevenDaysAgo = new Date(new Date().setDate(today.getDate() - 7));
		this.start_date = Utils.getLocalMysqlStringFromDate(sevenDaysAgo).split(' ')[0];
	}

	ngOnInit(): void {
		this.loadInitialData();
	}

	async loadInitialData(): Promise<void> {
		this.is_loading = true;
		this.error_message = null;
		try {
			this.production_area_info_list = await this.rest_production.searchProductionAreaInfo({ limit: 999999 });
			await this.loadConsumptions();
		} catch (error: any) {
			this.error_message = `Error al cargar datos iniciales: ${error.message}`;
			console.error(this.error_message, error);
		} finally {
			this.is_loading = false;
		}
	}

	async loadConsumptions(): Promise<void> {
		this.is_loading = true;
		this.error_message = null;
		try {
			const filters: any = {
				item_id: this.gas_item_id,
				'consumed>~': this.start_date + ' 00:00:00',
				'consumed<~': this.end_date + ' 23:59:59',
				_sort: 'consumed_DESC',
				limit: 999999
			};

			if (this.selected_production_area_id) {
				filters.production_area_id = this.selected_production_area_id;
			}

			this.gasolina_consumptions = await this.rest_consumption.searchConsumptionInfo(filters);
			this.calculateTotals();
		} catch (error: any) {
			this.error_message = `Error al cargar consumos de gasolina: ${error.message}`;
			console.error(this.error_message, error);
		} finally {
			this.is_loading = false;
		}
	}

	onFilterChange(): void {
		this.loadConsumptions();
	}

	calculateTotals(): void {
		this.total_liters = 0;
		this.total_cost = 0;
		for (const consumption_info of this.gasolina_consumptions) {
			this.total_liters += consumption_info.consumption.qty;
			this.total_cost += consumption_info.consumption.qty * consumption_info.consumption.price;
		}
	}

	removeConsumption(consumption_info: ConsumptionInfo): void {
		this.confirmation_service.showConfirmAlert(
			consumption_info,
			'Eliminar consumo',
			'¿Está seguro de que desea eliminar este consumo?'
		).subscribe(result => {
			if (result.accepted) {
				this.rest_consumption.remove(consumption_info.consumption.id)
					.then(() => {
						this.rest_service.showSuccess('Consumo eliminado correctamente');
						this.loadConsumptions();
					})
					.catch(error => {
						this.rest_service.showError(error);
					});
			}
		});
	}
}
