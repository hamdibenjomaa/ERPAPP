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