import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestService } from '../rest.service';
// import { Router } from '@angular/router'; // Import Router if you want to navigate

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginError: string | null = null;
  loginSuccess: string | null = null;

  constructor(
    private restService: RestService,
    // private router: Router // Inject Router if you want to navigate
  ) {}

  async onSubmit() {
    this.loginError = null;
    this.loginSuccess = null;
    const loginData = { username: this.username, password: this.password };

    try {
      console.log('Attempting login with:', loginData);
      const response = await this.restService.postLogin(loginData);
      console.log('Login successful, response:', response);

      if (response && response.user && response.session && response.user_permission) {
        this.loginSuccess = `Login successful! Welcome ${response.user.name}.`;
        // Data is now saved to localStorage and set in RestService automatically by postLogin
        console.log('User data in RestService:', this.restService.getUser());
        // Example navigation:
        // this.router.navigate(['/dashboard']); // Navigate to a dashboard or home page
      } else {
        // Handle cases where the server response is OK but doesn't contain expected data
        this.loginError = 'Login successful, but received unexpected data from server.';
        console.warn('Unexpected login response:', response);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      this.loginError = `Login failed: ${error.message || 'Server error'}`;
      // Ensure any stale auth data is cleared if login fails critically
      this.restService.clearAuthData();
    }
  }
}
