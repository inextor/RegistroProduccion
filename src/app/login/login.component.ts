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
		private restService: RestService,
		private router: Router // Inject Router
	) {}

	async onSubmit()
	{
		this.loginError = null;
		this.loginSuccess = null;
		const loginData = { username: this.username, password: this.password };

		try {
			console.log('Attempting login with:', loginData);

			const response = await this.restService.postLogin(loginData);
			console.log('Login successful, response:', response);

			if (response && response.user && response.session && response.user_permission)
			{
				this.loginSuccess = `Login successful! Welcome ${response.user.name}. Redirecting...`;
				console.log('User data in RestService:', this.restService.getUser());

				// Redirect to registrar-produccion
				this.router.navigate(['/registrar-produccion']);

			}
			else {
				this.loginError = 'Login successful, but received unexpected data from server.';
				console.warn('Unexpected login response:', response);
				// Do not redirect if the response is not as expected
			}
		} catch (error: any) {
			console.error('Login failed:', error);
			this.loginError = `Login failed: ${error.message || 'Server error'}`;
			this.restService.clearAuthData();
		}
	}
}
