import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { RestService } from '../rest.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent
{

	username = '';
	password = '';
	loginError: string | null = null;
	loginSuccess: string | null = null;

	constructor(
		public rest_service: RestService,
		private router: Router // Inject Router
	) {}

	async onSubmit()
	{
		this.loginError = null;
		this.loginSuccess = null;
		const loginData = { username: this.username, password: this.password };

		try {
			console.log('Attempting login with:', loginData);

			let login_promise = this.rest_service.postLogin(loginData);
			let store_promise = this.rest_service.getStores();

			Promise.all([login_promise, store_promise])
			.then(values =>
			{
				let response = values[0];

				let stores = values[1];

				if( stores.length > 0 )
				{
					//localStorage.setItem('store', JSON.stringify(stores));
				}

				if (response && response.user && response.session && response.user_permission)
				{
					this.loginSuccess = `Login successful! Welcome ${response.user.name}. Redirecting...`;

					if( response.user.store_id )
					{
						this.rest_service.store = stores.find((s:any) => s.id === response.user.store_id);
						localStorage.setItem('store', JSON.stringify(this.rest_service.store));
						console.log('Store set');
					}

					this.rest_service.is_logged_in = true;
					// Redirect to registrar-produccion
					this.router.navigate(['/molusca-home']);
				}
				else
				{
					this.loginError = 'Login successful, but received unexpected data from server.';
					console.warn('Unexpected login response:', response);
				}

			});
		}
		catch (error: any)
		{
			console.error('Login failed:', error);
			this.loginError = `Login failed: ${error.message || 'Server error'}`;
			this.rest_service.clearAuthData();
		}
	}
}
