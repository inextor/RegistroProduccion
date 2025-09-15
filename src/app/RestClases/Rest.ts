import { RestService } from "../rest.service";

export class Rest<T>
{
	constructor(private rest_service: RestService, private endpoint: string)
	{

	}

	search(p: URLSearchParams | Object): Promise<T[]>
	{
		const params = p instanceof URLSearchParams ? p : this.getUrlParams(p);
		const url = new URL(`${this.rest_service.getBaseUrl()}/${this.endpoint}`);
		url.search = params.toString();

		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		return fetch(url, options)
			.then(this.getJsonLambda())
			.then((data) =>
			{
				return data.data;
			});
	}

	get(id: number): Promise<T>
	{
		let options = { method: 'GET', headers: { 'Authorization': `Bearer ${this.rest_service.session.id}` } };
		const url = new URL(`${this.rest_service.getBaseUrl()}/${this.endpoint}`);
		url.search = new URLSearchParams({id: id.toString()}).toString();

		return fetch(url, options)
			.then(this.getJsonLambda());
	}

	private getUrlParams(obj: any): URLSearchParams
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

	private getJsonLambda()
	{
		return (response: any) =>
		{
			if (!response.ok)
			{
				return response.json().then((data: any) =>
				{
					if (typeof data === 'string')
					{
						throw data;
					}

					if ('error' in data)
					{
						throw data.error;
					}
					throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
				})
			}

			return response.json();
		};
	}
}
