import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { RestProduction } from '../RestClases/RestProduction';
import { Rest, RestResponse } from '../classes/Rest';
import { Account } from '../Models/Account';
import { User } from '../Models/User';
import { Production_Area } from '../Models/Production_Area';

interface CUser extends User
{
	accounts: Account[];
}

interface CProductionAreaInfo
{
	users: CUser[];
	production_area: Production_Area;
}

@Component({
	selector: 'app-list-users',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './list-users.component.html',
	styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
	production_area_info_list: CProductionAreaInfo[] = [];
	is_loading = false;
	error_message: string | null = null;
	rest_account: Rest;
	rest_production: RestProduction;

	constructor(public rest_service: RestService) {

		this.rest_production = new RestProduction(rest_service);
		this.rest_account = new Rest(rest_service,'/account.php');
	}

	ngOnInit(): void
	{
		this.loadProductionAreasWithUsers().then((response) =>
		{
			this.production_area_info_list = response;
		})
		.catch((error) =>
		{
			this.error_message = error;
		})
		.finally(() =>
		{
			this.is_loading = false;
		});
	}

	loadProductionAreasWithUsers(): Promise<CProductionAreaInfo[]>
	{
		this.is_loading = true;
		this.error_message = null;

		return this.rest_production.searchProductionAreaInfo({ limit: 999999 })
		.then((production_area_info_list) =>
		{
			let user_ids = production_area_info_list.reduce((acc, pa_info) =>
			{
				for(let user of pa_info.users)
				{
					acc.push(user.id);
				}

				return acc;
			}, [] as number[]);

			let p_accounts = user_ids.length > 0
				? this.rest_account.search({ user_id: user_ids, limit: 999999 })
				: Promise.resolve({total:0,data:[]});

			return Promise.all([production_area_info_list, p_accounts ])
		})
		.then(([production_area_info_list, accounts]) =>
		{
			for(let pa_info of production_area_info_list)
			{
				for(let user of pa_info.users)
				{
					user.accounts = accounts.data.filter(a => a.id === user.id);
				}
			}

			let c_prod_area_info_list = production_area_info_list.map((pa_info:any) =>
			{
				return {
					production_area: pa_info.production_area,
					users: pa_info.users.map((user:any) =>
					{
						return {
							...user,
							accounts: accounts.data.filter(a => a.id === user.id)
						}
					})
				}
			});

			return Promise.resolve(c_prod_area_info_list);
		});
	}


	/*
	getAccountsData(user_id:number):Promise<any>
	{
		return this.rest_account.search({id:user_id}).then(data =>
		{
			return this.rest_account.search({user_id:user_id, limit: 999999});
		})
		.then((response:RestResponse<Account>)=>
		{
			let account_ids = response.data.map(a => a.id);

			let p_ledgers = account_ids.length > 0 ? this.rest_ledger.search({account_id:account_ids}) : Promise.resolve({total:0,data:[]});

			return Promise.all
			([
				response.data,
				p_ledgers
			]);
		})
		.then(([accounts,ledgers]) =>
		{
			return accounts.map((account:any) =>{
				return {
					account,
					ledgers: ledgers.data.filter((l:any) => l.account_id === account.id)
				}
			});
		})
	}
	*/
}
