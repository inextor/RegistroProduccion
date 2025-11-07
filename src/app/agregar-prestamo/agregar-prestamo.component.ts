import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { Rest } from '../classes/Rest';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../classes/DateUtils';
import { GetEmpty3 } from '../classes/GetEmpty3';
import { Account, Ledger, User } from '../RestModels';

// Constant to indicate that the default/main account should be used
// When account_id is set to this value, the backend will retrieve or create the user's main account
const DEFAULT_ACCOUNT_ID = -1;

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
	account: Account = GetEmpty3.account();
	user: User = GetEmpty3.user();
	rest_ledger: Rest;
    description: string  = '';

	constructor(public rest_service: RestService, private route: ActivatedRoute) {
		super(rest_service);
		this.user_rest = new Rest(rest_service, 'user');
		this.rest_account = new Rest(rest_service, 'account');
		this.rest_ledger = new Rest(rest_service, 'ledger');
	}

	ngOnInit(): void {
		this.is_loading = true;
		this.description = 'Préstamo '+Utils.getDateString(this.date);

		this.route.queryParamMap.subscribe(params =>
		{
			const accountIdFromParams = params.get('account_id');
			if (!accountIdFromParams) {
				this.is_loading = false;
				this.showError("No se proporcionó un ID de cuenta.");
				return;
			}

			const account_id = Number(accountIdFromParams);

			// Load account and then user
			this.rest_account.get(account_id)
			.then((account: Account) => {
				this.account = account;
				return this.user_rest.get(account.user_id);
			})
			.then((user: User) => {
				this.user = user;
				this.is_loading = false;
			})
			.catch(error => {
				this.is_loading = false;
				this.showError(error);
			});
		});
	}

	onGuardar(): void {
		if (!this.account || !this.account.id) {
			this.showError('No se ha cargado la información de la cuenta.');
			return;
		}
		if (this.amount === '' || this.amount <= 0) {
			this.showError('Por favor, ingrese una cantidad válida.');
			return;
		}

		this.is_loading = true;

		const newLedger: Partial<Ledger> = {
			account_id: this.account.id,
			amount: Number(this.amount), // Positive amount for loan
			description: this.description,
			transaction_type: 'DECREMENT', // DECREMENT = worker receives loan (balance becomes negative/owes company)
			source_document_type: null,
			currency_id: this.account.currency_id
		};

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
	}
}
