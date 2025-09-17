import { RestService } from "../rest.service";

export interface RestResponse<T>
{
	data:T[];
	total:number;
}

export class Rest
{
	constructor(private rest_service: RestService,private path:string)
	{

	}

	get(id:number|string,path:string):Promise<any>
	{
		const url = `${this.rest_service.getBaseUrl()}/${path}.php?id=${id}`;
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		return fetch(url, options )
			.then(this.getJsonLambda())
	}

	create(x:any):Promise<any>
	{
		const url = `${this.rest_service.getBaseUrl()}/${this.path}.php`;
		let headers = {
			'Authorization': `Bearer ${this.rest_service.session.id}`,
			'Content-Type': 'application/json'
		};
		let options = { method: 'POST', headers, body: JSON.stringify(x) };
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data =>{
				return data;
			});
	}

	update(x:any)
	{
		const url = `${this.rest_service.getBaseUrl()}/${this.path}.php`;
		let headers = {
			'Authorization': `Bearer ${this.rest_service.session.id}`,
			'Content-Type': 'application/json'
		};

		let options = { method: 'PUT', headers, body: JSON.stringify(x) };
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data =>{
				return data;
			});
	}

	search(p: URLSearchParams | Object):Promise<RestResponse<any>>
	{
		const params = p instanceof URLSearchParams ? p : this.getUrlParams(p);
		const url = new URL(`${this.rest_service.getBaseUrl()}/${this.path}.php`);
		url.search = params.toString(); // Handles '?' and encoding

		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		return fetch(url, options )
			.then(this.getJsonLambda())
			.then(data =>{
				return data;
			});
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

	getJsonLambda()
	{
		return (response:any) =>
		{
			if( !response.ok )
			{
				return response.json().then((data:any) =>
				{
					if(typeof data == 'object' && 'error' in data )
					{
						throw data.error;
					}
					else if( typeof data == 'string' )
					{
						throw new Error(data);
					}

					throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
				})
			}

			return response.json();
		};
	}
}
