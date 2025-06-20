import { Utils } from "../classes/DateUtils";
import { RestService } from "../rest.service";


export class RestProduction
{
	constructor(private rest_service: RestService)
	{

	}

	zero(x:number):string
	{
		return x < 10 ? '0'+x : ''+x;
	}

	async getProductionAreas(storeId: number): Promise<any>
	{
		const url = `${this.rest_service.getBaseUrl()}/production_area.php?store_id=${storeId}&limit=999999`;
		try
		{
			let headers =	{ 'Authorization': `Bearer ${this.rest_service.session.id}` };

			const response = await fetch(url, { method: 'GET', headers: headers });

			if (!response.ok)
			{
				const errorData = await response.text();
				throw new Error(`HTTP error fetching production areas: ${response.status}, message: ${errorData}`);
			}

			return await response.json();
		}
		catch (error)
		{
			console.error(`Error in getProductionAreas for store ID ${storeId}:`, error);
			throw error; // Re-throw to be handled by the component
		}
	}

	getProductionAreaItems(production_area_id: any):Promise<any[]>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/production_area_item.php?production_area_id=${production_area_id}&limit=999999`;
		return fetch(url, options )
			.then(response => response.json())
			.then(data => data.data)
			.then(items =>
			{
				let item_ids = items.map((item:any) => item.item_id);
				let url_items = `${this.rest_service.getBaseUrl()}/item.php?id,=${item_ids.join(',')}&limit=999999`;

				return fetch( url_items , options )
					.then(response => response.json())
					.then(data => data.data)
			})
		}

	/*
	* @returns Promise:<{total:number,data:{production_area:Object, users:Array, store:Object}[]>
	*/

	getProductionArea(production_area_id: any):Promise<any>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/production_area.php?id=${production_area_id}`;
		return fetch(url, options )
			.then(response => response.json())
	}

	getUsersFromProductionArea(production_area_id: any): Promise<any>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/user.php?production_area_id=${production_area_id}&limit=999999`;

		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data)
		}

	addProduction(production: any): Promise<any>
	{

		let headers =	{
			'Authorization': `Bearer ${this.rest_service.session.id}`,
			'Content-Type': 'application/json'
		};

		let method = 'POST';
		let body = JSON.stringify(production);


		const url = `${this.rest_service.getBaseUrl()}/production_info.php`;
		return fetch(url, { method, headers, body })
			.then(this.getJsonLambda())
			.then(data => data)
		}

	getRolesItemPrices(role_ids:number[]):Promise<any[]>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/role_item_price.php?role_id,=${role_ids.join(',')}&limit=999999`;
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data)
	}

	getAllRoles():Promise<any[]>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/role.php?limit=999999`;
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data)
	}

	getJsonLambda()
	{
		return (response:any) =>
		{
			if( !response.ok )
			{
				throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
			}

			return response.json();
		};
	}

	getAllProductionAreas():Promise<any[]>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/production_area.php?limit=999999`;
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data);
	}

	getAllProduction():Promise<any[]>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/production_info.php?limit=999999`;
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data);
	}

	getProductionItems():Promise<any[]>
	{
		return this.getAllRoles().then(roles =>
		{
			let role_ids = roles.filter((role:any)=>role.id).map((role:any) => role.id) as number[];
			return this.getRolesItemPrices(role_ids);
		})
		.then((role_item_prices:any) =>
		{
			let item_ids = role_item_prices.map((role_item_price:any) => role_item_price.item_id);

			let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
			let url = `${this.rest_service.getBaseUrl()}/item_info.php?limit=999999&id,=${item_ids.join(',')}`;
			return fetch(url, options )
		})
		.then(this.getJsonLambda())
		.then(data => data.data)
	}

	getProductionItemInfoByItemId(item_id: any,date:string):Promise<any[]>
	{
		let d = Utils.getDateFromLocalMysqlString(date);
		d.setHours(0,0,0,0);

		let end = new Date();
		end.setTime(d.getTime() + 24 * 60 * 60 * 1000);
		end.setSeconds(end.getSeconds() - 1);


		let start_utc_string = d.toISOString().substring(0,19).replace('T',' ');
		let end_utc_string = end.toISOString().substring(0,19).replace('T',' ');

		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/production_info.php?item_id=${item_id}&created>=${start_utc_string}&created<=${end_utc_string}&limit=999999&_sort_order=id_DESC`;

		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data)
	}

	getItemInfo(item_id: any): Promise<any>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/item_info.php?id=${item_id}`;
		return fetch(url, options )
			.then(this.getJsonLambda())
	}

	updateProduction(production:any):Promise<any>
	{
		let headers =	{
			'Authorization': `Bearer ${this.rest_service.session.id}`,
			'Content-Type': 'application/json'
		};

		let method = 'PUT';
		let body = JSON.stringify(production);
		let options = { method, body, headers };
		const url = `${this.rest_service.getBaseUrl()}/production.php`;

		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data)
	}


	getLocalMysqlStringFromDate(date:Date):string
	{
		let d= new Date();
		d.setTime(date.getTime());

		let event_string = d.getFullYear()
		+ '-' + this.zero(d.getMonth() + 1)
		+ '-' + this.zero(d.getDate())
		+ ' ' + this.zero(d.getHours())
		+ ':' + this.zero(d.getMinutes())
		+ ':' + this.zero(d.getSeconds());

		return event_string;
	}

	getDateFromLocalMysqlString(str:string):Date
	{
		let components = str.split(/-|:|\s|T/g);

		let f:number[] = [];

		f.push( parseInt(components[0]) );
		f.push( parseInt(components[1])-1 );
		f.push( parseInt(components[2]) );
		f.push( components.length<4?0:parseInt(components[3]))
		f.push( components.length<5?0:parseInt(components[4]))
		f.push( components.length<6?0:parseInt(components[5]))

		return new Date( f[0], f[1], f[2], f[3], f[4], f[5], 0);
	}

	getProductionInfo(p: URLSearchParams | Object):Promise<any[]>
	{
		const params = p instanceof URLSearchParams ? p : this.getUrlParams(p);
		const url = new URL(`${this.rest_service.getBaseUrl()}/production_info.php`);
		url.search = params.toString(); // Handles '?' and encoding

		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		return fetch(url, options )
			.then(this.getJsonLambda());
	}

	getUrlParams(obj:any):URLSearchParams
	{
		if (obj === null || obj === undefined) {
			obj = {};
		}
		const params = new URLSearchParams();
		for (const key in obj)
		{
			if (obj.hasOwnProperty(key))
			{
				params.set(key, String(obj[key]));
			}
		}
		return params;
	}

	getProductionByGroup(group_id:string, start_date:Date, end_date:Date):Promise<any[]>
	{

		let start_utc_string = start_date.toISOString().substring(0,19).replace('T',' ');
		let end_utc_string = end_date.toISOString().substring(0,19).replace('T',' ');

		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/reports/production_by_area.php?production_area_id=${group_id}&start=${start_utc_string}&end=${end_utc_string}`;
		return fetch(url, options )
			.then(this.getJsonLambda())
	}
}
