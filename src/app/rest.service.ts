import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestProduction } from './RestClases/RestProduction';
import { ActivatedRoute } from '@angular/router';

export class ErrorMessage
{
	count:number;
	message:string;
	type:string;
	msg_button:string;
	color:string;
	auto_hide:boolean = true;
	constructor(message:string,type:string, auto_hide:boolean=true)
	{
		this.message	= message;
		this.type	= type;
		this.count = 0;
		this.auto_hide = auto_hide;

		if( type == 'alert-success')
		{
			this.msg_button = '✔️';
			this.color = 'green';
		}
		else
		{
			this.msg_button = '✖';
			this.color = 'red';
		}
	}
}

@Injectable({
	providedIn: 'root'
})
export class RestService
{

	error_behavior_subject = new BehaviorSubject<ErrorMessage>(new ErrorMessage('',''));
	public error_observable = this.error_behavior_subject.asObservable();

	private base_url = environment.base_url;
	public user: any = null;
	public session: any = null;
	public permission: any = null;
	public store: any = null;

	constructor(private route: ActivatedRoute)
	{
		this.loadAuthDataFromLocalStorage();
		this.is_logged_in = localStorage.getItem('session') !== null;

		route.params.subscribe((_params:any) =>
		{
			document.body.style.backgroundColor = '#ffffff';
		});

		route.queryParams.subscribe((_params:any) =>
		{
			document.body.style.backgroundColor = '#ffffff';
		});
	}

	getBaseUrl(): string
	{
		return this.base_url;
	}

	is_logged_in:boolean = false;

	async postLogin(data: any): Promise<any>
	{
		const url = `${this.base_url}/login.php`;
		try
		{
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams(data).toString()
			});

			if (!response.ok)
			{
				const errorData = await response.text();
				throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
			}
			const responseData = await response.json();
			if (responseData && responseData.user && responseData.session && responseData.user_permission && responseData.store)
			{
				this.setAuthData(responseData.user, responseData.session, responseData.user_permission, responseData.store);
			}
			else if (responseData && responseData.user && responseData.session && responseData.user_permission)
			{
				this.setAuthData(responseData.user, responseData.session, responseData.user_permission, null);
			}
			return responseData;
		}
		catch (error)
		{
			console.error('Error in postLogin:', error);
			this.clearAuthData();
			throw error;
		}
	}

	setAuthData(user: any, session: any, permission: any, store: any): void
	{
		this.user = user;
		this.session = session;
		this.permission = permission;
		this.store = store;
		this.saveAuthDataToLocalStorage(user, session, permission, store);
	}

	getStores(): any
	{
		return fetch(`${this.base_url}/store.php?limit=999999`)
			.then(response => response.json())
			.then(data => data.data);
	}

	saveAuthDataToLocalStorage(user: any, session: any, permission: any, store: any): void
	{
		if (typeof localStorage !== 'undefined')
		{
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('session', JSON.stringify(session));
			localStorage.setItem('permission', JSON.stringify(permission));

			if (store)
			{
				localStorage.setItem('store', JSON.stringify(store));
			}
			else
			{
				localStorage.removeItem('store');
			}
		}
	}

	loadAuthDataFromLocalStorage(): void
	{
		if (typeof localStorage !== 'undefined')
		{
			const userStr = localStorage.getItem('user');
			const sessionStr = localStorage.getItem('session');
			const permissionStr = localStorage.getItem('permission');
			const storeStr = localStorage.getItem('store');

			if (userStr) this.user = JSON.parse(userStr);
			if (sessionStr) this.session = JSON.parse(sessionStr);
			if (permissionStr) this.permission = JSON.parse(permissionStr);
			if (storeStr) this.store = JSON.parse(storeStr);
		}
	}

	async setStore(store_id: number): Promise<any>
	{
		const url = `${this.base_url}/store.php?store_id=${store_id}`;
		try
		{
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					// 'Authorization': `Bearer ${this.session?.id}`
				}
			});
			if (!response.ok)
			{
				const errorData = await response.text();
				throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
			}
			const storeData = await response.json();
			if (storeData)
			{
				this.store = storeData;
				if (typeof localStorage !== 'undefined')
				{
					localStorage.setItem('store', JSON.stringify(storeData));
				}
			}
			return storeData;
		}
		catch (error)
		{
			console.error(`Error fetching store (ID: ${store_id}):`, error);
			this.store = null;
			if (typeof localStorage !== 'undefined')
			{
				localStorage.removeItem('store');
			}
			throw error;
		}
	}

	clearAuthData(): void
	{
		this.user = null;
		this.session = null;
		this.permission = null;
		this.store = null;

		localStorage.removeItem('user');
		localStorage.removeItem('session');
		localStorage.removeItem('permission');
		localStorage.removeItem('store');
	}

	getUser(): any
	{
		return this.user;
	}

	getStore(): any
	{
		return this.store;
	}

	isLoggedIn(): boolean
	{
		return !!this.session && !!this.user;
	}

	getErrorString(error:any):string
	{
		if (error == null || error === undefined)
			return 'Error desconocido';

		if (typeof error === "string")
			return error;

		if( 'error' in error )
		{
			if( typeof(error.error) == 'string' )
			{
				return error.error;
			}

			if( error.error && 'error' in error.error && error.error.error )
			{
				return error.error.error;
			}
		}
		return 'Error desconocido';
	}

	showError(error: any, auto_hide:boolean = true)
	{
		console.log('Error to display is', error);
		if( error instanceof ErrorMessage )
		{
			this.showErrorMessage(error);
			return;
		}
		let str_error = this.getErrorString(error);

		this.showErrorMessage(new ErrorMessage(str_error, 'alert-danger', auto_hide));
	}

	showErrorMessage(error: ErrorMessage)
	{
		this.error_behavior_subject.next(error);
	}
}
