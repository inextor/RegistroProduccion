import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { User } from '../Models/User';
import { Item } from '../Models/Item';
import { Ledger } from '../Models/Ledger';
import { Rest } from '../classes/Rest';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../Models/Account';

@Component({
	selector: 'app-agregar-prestamo',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './agregar-prestamo.component.html',
	styleUrl: './agregar-prestamo.component.css'
})
export class AgregarPrestamoComponent extends BaseComponent implements OnInit {
	amount: number | '' = '';
	date: string = new Date().toISOString().split('T')[0];
	user_rest: Rest;
	rest_account: Rest;
	account: Account | null = null;
	user: User = this.getEmptyUser();
	rest_ledger: Rest;

	constructor(public rest_service: RestService, private route: ActivatedRoute) {
		super(rest_service);
		this.user_rest = new Rest(rest_service, 'user');
		this.rest_account = new Rest(rest_service, 'account');
		this.rest_ledger = new Rest(rest_service, 'ledger');
	}

	ngOnInit(): void {
		this.is_loading = true;
		this.route.queryParamMap.subscribe(params => {

			this.account = null;

			const userIdFromParams = params.get('user_id');
			if (!userIdFromParams) {
				this.is_loading = false;
				this.showError("No se proporcionó un ID de usuario.");
				return;
			}

			const user_id = Number(userIdFromParams);

			Promise.all
			([
				this.user_rest.get(user_id),
				this.rest_account.search({ user_id: user_id, limit: 1 })
			])
			.then(([user_response, account_response]) => {
				this.is_loading = false;
				this.user = user_response;
				this.account = account_response.data.length > 0 ? account_response.data[0] : null;
			})
			.catch(error => {
				this.is_loading = false;
				this.showError(error);
			});
		});
	}

	onGuardar(): void {
		if (!this.user || !this.user.id) {
			this.showError('No se ha cargado la información del usuario.');
			return;
		}
		if (this.amount === '' || this.amount <= 0) {
			this.showError('Por favor, ingrese una cantidad válida.');
			return;
		}

		this.is_loading = true;

		const newLedger: Partial<Ledger> = {
			account_id: this.account ? this.account.id : -1,
			amount: Number(this.amount) * -1, // Los préstamos son un débito (negativo) en la cuenta
			description: 'Préstamo',
			transaction_type: 'DEBIT',
			source_document_type: null,
			currency_id: 'MXN'
		};


		let p_account = this.account
			? Promise.resolve(this.account)
			: this.rest_account.create
			({
				user_id: this.user.id,
				currency_id: 'MXN',
				is_main: true,
				balance: 0,
				created: this.date,
				updated: this.date,
				created_by_user_id: this.user.id,
				updated_by_user_id: this.user.id
			});

		Promise.all([p_account,Promise.resolve(newLedger)])
		.then(([account, newLedger]) =>
		{
			newLedger.account_id = account.id;
			this.account = account;

			this.rest_ledger.create(newLedger)
			.then(() =>
			{
				this.is_loading = false;
				this.showSuccess('Préstamo registrado exitosamente.');
				this.amount = '';
			})
			.catch(error => {
				this.is_loading = false;
				this.showError(error);
			});
		});
	}

	getEmptyUser(): User {
		return {
			id: 0,
			name: '',
			email: null,
			phone: null,
			status: 'ACTIVE',
			store_id: null,
			created: '',
			updated: '',
			created_by_user_id: null,
			updated_by_user_id: null,
			credit_days: null,
			credit_limit: 0,
			default_billing_address_id: null,
			default_shipping_address_id: null,
			image_id: null,
			lat: null,
			lng: null,
			password: null,
			platform_client_id: null,
			points: 0,
			price_type_id: null,
			production_area_id: null,
			type: 'USER',
			username: null,
			workshift_id: null
		};
	}
}
