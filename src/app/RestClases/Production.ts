import { RestService } from "../rest.service";


export class Production
{
	constructor(private rest_service: RestService)
	{

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
		const url = `${this.rest_service.getBaseUrl()}/production_area_item.php?store_id=${production_area_id}&limit=999999`;
		return fetch(url, options )
			.then(response => response.json())
			.then(data => data.data)
			.then(items =>
			{
				let item_ids = items.map((item:any) => item.id);
				let url_items = `${this.rest_service.getBaseUrl()}/item.php?id,=${item_ids.join(',')}&limit=999999`;

				return fetch( url_items , options )
					.then(response => response.json())
					.then(data => data.data)
			})
		}

	/*
	* @returns Promise:<{total:number,data:{production_area:Object, users:Array, store:Object}[]>
	*/

	getProductionAreaInfo(production_area_id: any):Promise<any>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/production_area.php?id=${production_area_id}`;
		return fetch(url, options )
			.then(response => response.json())
			.then(data => data.data)
	}

	getUsersFromProductionArea(production_area_id: any): Promise<any>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/user.php?production_area_id=${production_area_id}&limit=999999`;

		return fetch(url, options )
			.then(response => response.json())
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
			.then(data => data.data)
		}

	getRolesItemPrices(role_ids:number[]):Promise<any[]>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/role_item_price.php?role_id,=${role_ids.join(',')}&limit=999999`;
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data)
	}

	getAllRoles()
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

	getAllProductionAreas()
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/production_area.php?limit=999999`;
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data);
	}

	getAllProduction()
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = `${this.rest_service.getBaseUrl()}/production_info.php?limit=999999`;
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data => data.data);
	}
}
