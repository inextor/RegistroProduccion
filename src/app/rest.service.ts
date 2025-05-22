import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl = 'https://mollusca.integranet.xyz/api';

  public user: any = null;
  public session: any = null;
  public permission: any = null;
  public store: any = null; // Added store property

  constructor() {
    this.loadAuthDataFromLocalStorage(); // Load data on service initialization
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  async postLogin(data: any): Promise<any> {
    const url = `${this.baseUrl}/login.php`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString()
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }
      const responseData = await response.json();
      // Assuming the response will also contain a 'store' object
      if (responseData && responseData.user && responseData.session && responseData.user_permission && responseData.store) {
        this.setAuthData(responseData.user, responseData.session, responseData.user_permission, responseData.store);
        this.saveAuthDataToLocalStorage(responseData.user, responseData.session, responseData.user_permission, responseData.store);
      }
      return responseData;
    } catch (error) {
      console.error('Error in postLogin:', error);
      this.clearAuthData(); // Clear data on failed login attempt to ensure clean state
      throw error;
    }
  }

  setAuthData(user: any, session: any, permission: any, store: any): void {
    this.user = user;
    this.session = session;
    this.permission = permission;
    this.store = store; // Set store property
  }

  saveAuthDataToLocalStorage(user: any, session: any, permission: any, store: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('session', JSON.stringify(session));
      localStorage.setItem('permission', JSON.stringify(permission));
      localStorage.setItem('store', JSON.stringify(store)); // Save store to localStorage
    }
  }

  loadAuthDataFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const userStr = localStorage.getItem('user');
      const sessionStr = localStorage.getItem('session');
      const permissionStr = localStorage.getItem('permission');
      const storeStr = localStorage.getItem('store'); // Load store from localStorage

      if (userStr) this.user = JSON.parse(userStr);
      if (sessionStr) this.session = JSON.parse(sessionStr);
      if (permissionStr) this.permission = JSON.parse(permissionStr);
      if (storeStr) this.store = JSON.parse(storeStr); // Parse and set store property
    }
  }

  clearAuthData(): void {
    this.user = null;
    this.session = null;
    this.permission = null;
    this.store = null; // Clear store property
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('session');
      localStorage.removeItem('permission');
      localStorage.removeItem('store'); // Remove store from localStorage
    }
  }

  getUser(): any {
    return this.user;
  }
  
  getStore(): any { // Added getter for store
    return this.store;
  }

  isLoggedIn(): boolean {
    return !!this.session && !!this.user;
  }
}
