import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';
  showMaxAttemptsMessage: boolean = false;

  constructor(private authService: UserService, private router: Router, private toastr: ToastrService) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful:', response);

        // Fetch user profile after successful login
        this.authService.getUserProfile().subscribe(
          userProfile => {
            const userRole = userProfile.role;

            // Redirect based on the user's role
            switch (userRole) {
              case 'admin':
                this.router.navigate(['/AdminCompany']);
                break;
              case 'SuperAdmin':
                this.router.navigate(['/Admin']);
                break;
              case 'salesManager':
                this.router.navigate(['/Sales']);
                break;
              case 'stockManager':
                this.router.navigate(['/Stock']);
                break;
              case 'auditor':
                this.router.navigate(['/Audit']);
                break;
              default:
                console.warn('Unknown user role:', userRole);
                // You can handle unknown roles or redirect to a default route
                break;
            }
          },
          error => {
            console.error('Error fetching user profile:', error);
          }
        );
      },
      error => {
        console.error('Login error:', error);
        this.loginError = error;

        if (error === 'Too many requests. Please try again later.') {
          this.showMaxAttemptsMessage = true;
          this.toastr.error(error.error.message);
        } else {
          this.showMaxAttemptsMessage = false;
        }
      }
    );
  }
}
