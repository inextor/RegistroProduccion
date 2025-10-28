import { RestService } from "../rest.service";
import { SearchObject } from "./SearchObject";
import { ParamMap } from "@angular/router";

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

	get(id:number|string):Promise<any>
	{
		const url = `${this.rest_service.getBaseUrl()}/${this.path}.php?id=${id}`;
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

	search(p: URLSearchParams | SearchObject<any> | Object):Promise<RestResponse<any>>
	{
		let params: URLSearchParams;

		if( p instanceof URLSearchParams )
		{
			params = p;
		}
		else if( p instanceof SearchObject )
		{
			params = p.getBackendParams();
		}
		else
		{
			params = this.getUrlParams(p);
		}

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
		const params = new URLSearchParams();

		if (obj && typeof obj === 'object' && 'keys' in obj && Array.isArray(obj.keys)) {
			(obj as ParamMap).keys.forEach((key: string) => {
				const value = (obj as ParamMap).get(key);
				if (value !== null) {
					params.set(key, value);
				}
			});
		} else {
			if (obj === null || obj === undefined) {
				obj = {};
			}
			for (const key in obj)
			{
				if (obj.hasOwnProperty(key))
				{
					params.set(key, String(obj[key]));
				}
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

	delete(obj: any): Promise<any>
	{
	    const params = this.getUrlParams(obj); // Use the same parameter conversion as search
		const url = new URL(`${this.rest_service.getBaseUrl()}/${this.path}.php`);
	    url.search = params.toString(); // Handles '?' and encoding automatically

		let method = 'DELETE'

		let headers = {
			'Authorization': `Bearer ${this.rest_service.session.id}`
		};

		let credentials = 'include' as RequestCredentials;

		let options = { method , headers, credentials };

	    return fetch(url.toString(), options)
	        .then(this.getJsonLambda())
	        .then(data => {
	            return data;
	        });
	}
}
