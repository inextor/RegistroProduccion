import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
	providedIn: 'root'
})
export class RestService
{


    private base_url = environment.base_url;


	public user: any = null;
	public session: any = null;
	public permission: any = null;
	public store: any = null;

	constructor()
	{
		this.loadAuthDataFromLocalStorage();
	}

	getBaseUrl(): string
	{
		return this.base_url;
	}

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

}
