import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { Rest, RestResponse } from '../classes/Rest';
import { Utils } from '../classes/DateUtils';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Ledger } from '../Models/Ledger';
import { GetEmpty3 } from '../classes/GetEmpty3';
import { Account, User } from '../RestModels';
import { LocalDatePipe } from "../pipes/local-date.pipe";

interface CData
{
	user: User;
	account: Account;
	ledgers: Ledger[];
}

@Component({
	selector: 'app-ver-estado-de-cuenta',
	standalone: true,
	imports: [CommonModule, RouterModule, LocalDatePipe],
	templateUrl: './ver-estado-de-cuenta.component.html',
	styleUrl: './ver-estado-de-cuenta.component.css'
})
export class VerEstadoDeCuentaComponent implements OnInit {

	rest_user: Rest;
	rest_ledger: Rest;
	rest_account: Rest;
	account: Account= GetEmpty3.account();
	ledgers: any[] = [];
	user: User=GetEmpty3.user();

	constructor(private rest_service:RestService,private route:ActivatedRoute) {
		this.rest_user = new Rest(rest_service,'/user');
		this.rest_ledger = new Rest(rest_service,'/ledger');
		this.rest_account = new Rest(rest_service,'/account');
	}

	ngOnInit(): void {
		this.route.queryParamMap.subscribe((params) =>
		{
			let page = params.has('page') ? parseInt(params.get('page') as string) : 0;
			let limit = params.has('limit') ? parseInt(params.get('limit') as string) : 100;
			let account_id = params.has('account_id') ? parseInt(params.get('account_id') as string) : 0;

			if (account_id > 0) {
				this.getDataByAccountId(account_id, page, limit)
				.then((response)=>{
					this.user = response.user;
					this.account =  response.account;
					this.ledgers = response.ledgers;
				})
				.catch((error) =>
				{
					this.rest_service.showError(error);
				});
			} else {
				this.rest_service.showError('Se requiere account_id en la URL');
			}
		});
	}


	getDataByAccountId(account_id:number, page:number, limit:number):Promise<CData>
	{
		return this.rest_account.get(account_id)
		.then((account:Account)=>
		{
			return Promise.all([
				this.rest_user.get(account.user_id),
				Promise.resolve(account)
			]);
		})
		.then(([user,account]:[User,Account])=>
		{
			let p_ledgers = account.id > 0
				? this.rest_ledger.search({account_id:account.id, page, limit, _sort:'created_ASC'}) as Promise<RestResponse<Ledger>>
				: Promise.resolve({total:0,data:[]} as RestResponse<Ledger>);

			return Promise.all([user,account, p_ledgers]) as Promise<[User, Account, RestResponse<Ledger>]>;
		})
		.then(([user, account, ledgers]: [User, Account, RestResponse<Ledger>]) =>
		{
			ledgers.data.sort((a,b)=>a.created.localeCompare(b.created));
			return Promise.resolve({user, account:account, ledgers: ledgers.data });
		})
	}
}
