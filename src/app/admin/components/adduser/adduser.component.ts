// adduser.component.ts

import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  fullName: string = '';
  login: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  submit(): void {
    if (!this.fullName || !this.login || !this.password || !this.confirmPassword) {
      // One or more fields are empty
      this.toastr.error('All fields are required', 'Error');
      return;
    }
    if (!this.isEmailValid(this.login)) {
      // Email format is not valid
      this.toastr.error('Please enter a valid email address', 'Error');
      return;
    }
    if (this.password !== this.confirmPassword) {
      // Passwords do not match
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }
    if (!this.isPasswordValid(this.password)) {
      // Password does not meet criteria
      this.toastr.error('Password must be at least 8 characters long with at least one letter and one number', 'Error');
      return;
    }

    this.userService.createUser({
      fullName: this.fullName,
      login: this.login,
      password: this.password
    }).subscribe(
      () => {
        // User created successfully
        this.toastr.success('User created successfully');
        this.router.navigate(['/Admin/Users']); // Navigate to home page or any other desired route
      },
      error => {
        // Error occurred while creating user
        console.error('Error creating user:', error);
        this.toastr.error('Error occurred while creating user. Please try again later.', 'Error');
      }
    );
  }

  isPasswordValid(password: string): boolean {
    // Password must be at least 8 characters long with at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  isEmailValid(email: string): boolean {
    // Email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
}
