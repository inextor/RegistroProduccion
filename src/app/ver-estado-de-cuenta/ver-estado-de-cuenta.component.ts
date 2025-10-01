import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Rest, RestResponse } from '../classes/Rest';
import { Account } from '../Models/Account';
import { Utils } from '../classes/DateUtils';
import { ActivatedRoute } from '@angular/router';

interface CData
{
	account: Account;
	ledgers: any[];
}

@Component({
	selector: 'app-ver-estado-de-cuenta',
	imports: [],
	templateUrl: './ver-estado-de-cuenta.component.html',
	styleUrl: './ver-estado-de-cuenta.component.css'
})
export class VerEstadoDeCuentaComponent implements OnInit {

	rest_user: Rest;
	rest_ledger: Rest;
	rest_account: Rest;
	account: Account=this.getEmptyAccount();
	ledgers: any[] = [];

	constructor(private rest_service:RestService,private route:ActivatedRoute) {
		this.rest_user = new Rest(rest_service,'/user.php');
		this.rest_ledger = new Rest(rest_service,'/ledger.php');
		this.rest_account = new Rest(rest_service,'/account.php');
	}

	ngOnInit(): void {
		this.route.queryParamMap.subscribe((params) =>
		{
			let page = params.has('page') ? parseInt(params.get('page') as string) : 1;
			let limit = params.has('limit') ? parseInt(params.get('limit') as string) : 100;
			let user_id = params.has('user_id') ? parseInt(params.get('user_id') as string) : 0;

			this.getData(user_id, page, limit)
			.then((response)=>{
				this.account =  response.account;
				this.ledgers = response.ledgers;
			})
			.catch((error) =>
			{
				this.rest_service.showError(error);
			})
		});
	}


	getData(user_id:number, page:number, limit:number):Promise<CData>
	{
		return this.rest_account.search({user_id:user_id, currency_id:'MXN',limit: 1})
		.then((response:RestResponse<Account>)=>
		{
			let account_ids = response.data.map(a => a.id);

			let p_ledgers = account_ids.length > 0
				? this.rest_ledger.search({account_id:account_ids, page, limit})
				: Promise.resolve({total:0,data:[]});

			return Promise.all([ response.data, p_ledgers ]);
		})
		.then(([accounts,ledgers]) =>
		{
			if( accounts.length === 0 )
			{
				return Promise.resolve({
					account: this.getEmptyAccount(),
					ledgers: []
				});
			}

			let account = accounts[0];

			return { account, ledgers: ledgers.data };
		})
	}

	getEmptyAccount():Account
	{
		return {
			id: 0,
			user_id: 0,
			currency_id: 'MXN',
			balance: 0,
			created: Date.toString().substring(0,19).replace('T',' '),
			updated: Date.toString().substring(0,19).replace('T',' '),
			created_by_user_id: 0,
			updated_by_user_id: 0,
		};
	}
}
