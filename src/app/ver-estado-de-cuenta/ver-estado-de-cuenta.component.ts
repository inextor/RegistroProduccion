import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { Rest, RestResponse } from '../classes/Rest';
import { Account } from '../Models/Account';
import { Utils } from '../classes/DateUtils';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Ledger } from '../Models/Ledger';
import { User } from '../Models/User';

interface CData
{
	user: User;
	account: Account;
	ledgers: Ledger[];
}

@Component({
	selector: 'app-ver-estado-de-cuenta',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './ver-estado-de-cuenta.component.html',
	styleUrl: './ver-estado-de-cuenta.component.css'
})
export class VerEstadoDeCuentaComponent implements OnInit {

	rest_user: Rest;
	rest_ledger: Rest;
	rest_account: Rest;
	account: Account=this.getEmptyAccount();
	ledgers: any[] = [];
	user: User=this.getEmptyUser();

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
			let user_id = params.has('user_id') ? parseInt(params.get('user_id') as string) : 0;

            this.getData(user_id, page, limit)
            .then((response)=>{
				this.user = response.user;
                this.account =  response.account;
                this.ledgers = response.ledgers;
            })
            .catch((error) =>
            {
                this.rest_service.showError(error);
            });
		});
	}


	getData(user_id:number, page:number, limit:number):Promise<CData>
	{
		return Promise.all
		([
			this.rest_user.get(user_id),
			this.rest_account.search({user_id:user_id, currency_id:'MXN', limit:999999})
		])
		.then(([user,response]:[User,RestResponse<Account>])=>
		{
			response.data.sort((_a,b)=>b.is_main ? 1 : -1);

			if( response.data.length )
			{
				return Promise.all([user, response.data[0]]);
			}

			return Promise.resolve([ user, this.getEmptyAccount() ]) as Promise<[User,Account]>;
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

	getEmptyAccount():Account
	{
		return {
			id: -1,
			user_id: 0,
			is_main: false,
			currency_id: 'MXN',
			balance: 0,
			created: Date.toString().substring(0,19).replace('T',' '),
			updated: Date.toString().substring(0,19).replace('T',' '),
			created_by_user_id: 0,
			updated_by_user_id: 0,
		};
	}

	getEmptyUser(): User {
		return {
            id: 0,
            username: '',
            password: '',
            created: Date.toString().substring(0, 19).replace('T', ' '),
            updated: Date.toString().substring(0, 19).replace('T', ' '),
            created_by_user_id: 0,
            updated_by_user_id: 0,
            credit_days: null,
            credit_limit: 0,
            default_billing_address_id: null,
            default_shipping_address_id: null,
            email: null,
            image_id: null,
            lat: null,
            lng: null,
            name: '',
            phone: null,
            platform_client_id: null,
            points: 0,
            price_type_id: null,
            production_area_id: null,
            status: 'ACTIVE',
            store_id: null,
            type: 'CLIENT',
            workshift_id: null
        };
    }
}
