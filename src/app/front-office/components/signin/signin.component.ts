import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignupComponent {

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  signUp(fullName: string, email: string, password: string, confirmPassword: string): void {
    if (!fullName || !email || !password || !confirmPassword) {
      // One or more fields are empty
      this.toastr.error('All fields are required', 'Error');
      return;
    }
    if (!this.isEmailValid(email)) {
      // Email format is not valid
      this.toastr.error('Please enter a valid email address', 'Error');
      return;
    }
    if (password !== confirmPassword) {
      // Passwords do not match
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }
    if (!this.isPasswordValid(password)) {
      // Password does not meet criteria
      this.toastr.error('Password must be at least 8 characters long with at least one letter and one number', 'Error');
      return;
    }

    this.userService.signup(fullName, email, password)
      .subscribe(
        response => {
          // Signup successful
          this.toastr.success('Signup successful. Please login to continue.', 'Success');
          this.router.navigate(['/login']);
          // You can use router navigation here to redirect to the login page
        },
        error => {
          // Signup failed
          console.error('Signup error:', error);
          this.toastr.error('Signup failed. Please try again later.', 'Error');
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
