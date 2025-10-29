import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { Rest } from '../classes/Rest';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../classes/DateUtils';
import { GetEmpty3 } from '../classes/GetEmpty3';
import { Account, Ledger, User } from '../RestModels';

// Constant to indicate that the default/main account should be used
// When account_id is set to this value, the backend will retrieve or create the user's main account
const DEFAULT_ACCOUNT_ID = -1;

@Component({
	selector: 'app-agregar-abono',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './agregar-abono.component.html',
	styleUrl: './agregar-abono.component.css'
})
export class AgregarAbonoComponent extends BaseComponent implements OnInit {
	amount: number | '' = '';
	date: string = new Date().toISOString().split('T')[0];
	user_rest: Rest;
	rest_account: Rest;
	accounts: Account[] = [];
	selected_account_id: number = DEFAULT_ACCOUNT_ID;
	user: User = GetEmpty3.user();
	rest_ledger: Rest;
    description: string  = '';
	show_account_selector: boolean = false;

	constructor(public rest_service: RestService, private route: ActivatedRoute, private router: Router) {
		super(rest_service);
		this.user_rest = new Rest(rest_service, 'user');
		this.rest_account = new Rest(rest_service, 'account');
		this.rest_ledger = new Rest(rest_service, 'ledger');
	}

	ngOnInit(): void {
		this.is_loading = true;
		this.description = 'Abono '+Utils.getDateString(this.date);

		this.route.queryParamMap.subscribe(params =>
		{
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
				this.rest_account.search({ user_id: user_id, limit: 999999 })
			])
			.then(([user_response, account_response]) => {
				this.is_loading = false;
				this.user = user_response;
				this.accounts = account_response.data;

				// Logic for automatic account selection
				if (this.accounts.length === 0) {
					// No accounts: use DEFAULT_ACCOUNT_ID (backend will create)
					this.selected_account_id = DEFAULT_ACCOUNT_ID;
					this.show_account_selector = false;
				} else if (this.accounts.length === 1) {
					// Single account: use it automatically
					this.selected_account_id = this.accounts[0].id;
					this.show_account_selector = false;
				} else {
					// Multiple accounts: show selector, preselect main account
					this.show_account_selector = true;
					const main_account = this.accounts.find(acc => acc.is_main);
					this.selected_account_id = main_account ? main_account.id : this.accounts[0].id;
				}
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
			account_id: this.selected_account_id,
			amount: Number(this.amount), // Positive amount for payment
			description: this.description,
			transaction_type: 'INCREMENT', // INCREMENT = worker makes payment (balance increases/less negative)
			source_document_type: null,
			currency_id: 'MXN'
		};

		this.rest_ledger.create(newLedger)
		.then(() =>
		{
			this.is_loading = false;
			this.showSuccess('Abono registrado exitosamente.');
			// Redirect to estado de cuenta after successful save
			this.router.navigate(['/ver-estado-de-cuenta'], { queryParams: { user_id: this.user.id } });
		})
		.catch(error => {
			this.is_loading = false;
			this.showError(error);
		});
	}

	getCurrentBalance(): number {
		if (this.accounts.length === 0) {
			return 0;
		}

		if (this.accounts.length === 1) {
			return this.accounts[0].balance;
		}

		// If multiple accounts, return the balance of the selected account
		const selected = this.accounts.find(acc => acc.id === this.selected_account_id);
		return selected ? selected.balance : 0;
	}

	onAccountChange(): void {
		// Method called when account selection changes
		// The balance display will automatically update via getCurrentBalance()
	}
}
