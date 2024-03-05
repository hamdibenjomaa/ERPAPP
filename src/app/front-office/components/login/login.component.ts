import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

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
