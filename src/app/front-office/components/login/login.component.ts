import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ''; // Initialize with an empty string
  password: string = ''; // Initialize with an empty string
  loginError: string = ''; // Initialize with an empty string for error message
  
  constructor(private authService: UserService, private router: Router) {}

<<<<<<< HEAD
  login(): void {
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          // Handle successful login response
          console.log('Login successful:', response);
          // Redirect to Admin page
          this.router.navigate(['/Admin']);
        },
        error => {
          // Handle login error
          console.error('Login error:', error);
          // Display error message to the user
          this.loginError = 'Invalid email or password';
        }
      );
  }
}
=======
  loginForm: FormGroup; // Optional, for handling forms

  constructor(private http: HttpClient, private fb: FormBuilder) {
    // Initialize the form (optional)
    this.loginForm = this.fb.group({
      login: [''],
      password: ['']
    });
  }

  // Method to handle login
  login() {
    console.log('Submit button clicked!');
    const { login, password } = this.loginForm.value; // Get values from the form (optional)

    // Make HTTP request to your NestJS login endpoint
    this.http.post<any>('http://localhost:3000/auth/login', { login, password })
      .subscribe(
        user => {
          console.log('Login successful!', user); // Log the user object
          // You can also redirect to another page or perform other actions here
        },
        error => {
          console.error('Login failed:', error);
        }
      );
  }

}
>>>>>>> 9802b1ba3fc1f21eea1f47fea931fe2a533517ac
