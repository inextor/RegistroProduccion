import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RestService } from '../rest.service';
import { Rest } from '../classes/Rest';
import { RestProduction } from '../classes/RestProduction';
import { User } from '../Models/User';
import { Account } from '../Models/Account';
import { Payroll } from '../Models/Payroll';
import { Payroll_Value } from '../Models/Payroll_Value';
import { ProductionInfo } from '../ComplexModels/ProductionInfo';
import { ShortDatePipe } from '../pipes/short-date.pipe';
import { environment } from '../../environments/environment';

interface ProductionDetail {
	product: string;
	date: string;
	pieces: number;
	kg: number;
	price: number;
	total: number;
}

@Component({
	selector: 'app-detalle-nomina-usuario',
	standalone: true,
	imports: [CommonModule, RouterModule, ShortDatePipe],
	templateUrl: './detalle-nomina-usuario.component.html',
	styleUrl: './detalle-nomina-usuario.component.css'
})
export class DetalleNominaUsuarioComponent implements OnInit {
	user: User | null = null;
	user_id: number | null = null;
	start_date: string = '';
	end_date: string = '';
	is_loading: boolean = true;

	production_details: ProductionDetail[] = [];
	accounts: Account[] = [];
	gasolina_account: Account | null = null;
	main_account: Account | null = null;

	subtotal: number = 0;
	gasolina_deduction: number = 0;
	prestamo_deduction: number = 0;
	total: number = 0;

	has_zero_price_production: boolean = false;

	rest_user: Rest;
	rest_account: Rest;
	rest_payroll: Rest;
	rest_payroll_value: Rest;
	rest_production: RestProduction;

	constructor(
		private route: ActivatedRoute,
		private rest_service: RestService
	) {
		this.rest_user = new Rest(rest_service, 'user');
		this.rest_account = new Rest(rest_service, 'account');
		this.rest_payroll = new Rest(rest_service, 'payroll');
		this.rest_payroll_value = new Rest(rest_service, 'payroll_value');
		this.rest_production = new RestProduction(rest_service);
	}

	ngOnInit(): void {
		this.route.queryParamMap.subscribe(params => {
			const user_id_param = params.get('user_id');
			this.start_date = params.get('start_date') || '';
			this.end_date = params.get('end_date') || '';

			if (!user_id_param) {
				this.rest_service.showError('No se proporcionó un ID de usuario.');
				this.is_loading = false;
				return;
			}

			this.user_id = Number(user_id_param);
			this.loadData();
		});
	}

	async loadData(): Promise<void> {
		if (!this.user_id) {
			return;
		}

		try {
			this.is_loading = true;

			// Load user
			this.user = await this.rest_user.get(this.user_id);

			// Load user accounts
			const accounts_response = await this.rest_account.search({
				user_id: this.user_id,
				limit: 999999
			});
			this.accounts = accounts_response.data || [];

			// Find Gasolina and Main accounts
			this.gasolina_account = this.accounts.find(acc => acc.name === 'Gasolina') || null;
			this.main_account = this.accounts.find(acc => acc.is_main) || null;

			// Load production info
			await this.loadProductionData();

			// Calculate totals
			await this.calculateTotals();

			this.is_loading = false;
		} catch (error) {
			this.rest_service.showError(error);
			this.is_loading = false;
		}
	}

	async loadProductionData(): Promise<void> {
		if (!this.user_id) {
			return;
		}

		// Reset the zero-price flag
		this.has_zero_price_production = false;

		const search_params: any = {
			status: 'ACTIVE',
			limit: 999999
		};

		if (this.start_date) {
			search_params['produced>~'] = this.start_date + ' 00:00:00';
		}

		if (this.end_date) {
			search_params['produced<~'] = this.end_date + ' 23:59:59';
		}

		const production_info_list: ProductionInfo[] = await this.rest_production.searchProductionInfo(search_params);

		// Group production by day/product for this user
		const grouped_map = new Map<string, ProductionDetail>();

		for (const pi of production_info_list) {
			// Find if this user participated in this production
			const production_user = pi.users.find(pu => pu.user_id === this.user_id);

			if (production_user && production_user.price >= 0) {
				// Track if there are zero-price production records
				if (production_user.price === 0) {
					this.has_zero_price_production = true;
				}

				const date = pi.production.produced.substring(0, 10);
				const key = `${date}-${pi.item.name}-${production_user.price}`;

				if (grouped_map.has(key)) {
					// Add to existing group
					const existing = grouped_map.get(key)!;
					existing.pieces += pi.production.alternate_qty;
					existing.kg += pi.production.qty;
					existing.total += pi.production.qty * production_user.price;
				} else {
					// Create new group
					const detail: ProductionDetail = {
						product: pi.item.name,
						date: date,
						pieces: pi.production.alternate_qty,
						kg: pi.production.qty,
						price: production_user.price,
						total: pi.production.qty * production_user.price
					};
					grouped_map.set(key, detail);
				}
			}
		}

		this.production_details = Array.from(grouped_map.values());

		// Sort by date, then by product
		this.production_details.sort((a, b) => {
			const dateCompare = a.date.localeCompare(b.date);
			if (dateCompare !== 0) return dateCompare;
			return a.product.localeCompare(b.product);
		});
	}

	async calculateTotals(): Promise<void> {
		// Calculate subtotal from production
		this.subtotal = this.production_details.reduce((acc, detail) => acc + detail.total, 0);

		// Load payroll deductions for the period
		this.gasolina_deduction = 0;
		this.prestamo_deduction = 0;

		try {
			// Find payroll for this user in this period
			const payroll_search = {
				user_id: this.user_id,
				'start_date<~': this.end_date,
				'end_date>~': this.start_date,
				status: 'ACTIVE',
				limit: 1
			};

			const payroll_response = await this.rest_payroll.search(payroll_search);

			if (payroll_response.data && payroll_response.data.length > 0) {
				const payroll: Payroll = payroll_response.data[0];

				// Load payroll values (deductions)
				const payroll_values_response = await this.rest_payroll_value.search({
					payroll_id: payroll.id,
					type: 'DEDUCTION',
					limit: 999999
				});

				const payroll_values: Payroll_Value[] = payroll_values_response.data || [];

				// Calculate deductions by account
				for (const pv of payroll_values) {
					if (pv.account_id === this.gasolina_account?.id) {
						this.gasolina_deduction += pv.value;
					} else if (pv.account_id === this.main_account?.id) {
						this.prestamo_deduction += pv.value;
					}
				}
			}
		} catch (error) {
			console.error('Error loading payroll deductions:', error);
		}

		// Calculate total to pay
		this.total = this.subtotal - this.gasolina_deduction - this.prestamo_deduction;
	}

	generatePDF(): void {
		const pdfContainer = document.getElementById('pdf_container');
		if (pdfContainer) {
			const html = pdfContainer.innerHTML;
			const html_object = {
				html: html,
				orientation: 'P',
				default_font_size: 9,
				default_font: 'Helvetica',
				download_name: `detalle_nomina_${this.user?.name || 'usuario'}.pdf`
			};

			const url = environment.pdf_service_url + '/index.php';

			this.rest_service.externalPost(url, html_object)
				.then(response => {
					const pdf_url = URL.createObjectURL(response);
					window.open(pdf_url, '_blank');
				})
				.catch(error => {
					this.rest_service.showError('Error al generar el PDF');
				});
		}
	}
}
