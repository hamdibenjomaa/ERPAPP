import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(private userService: UserService, private router: Router) {}

redirectToPath(): void {
  // Check if the user is already logged in
  if (this.userService.isAuthenticated()) {
    // Redirect the user to their respective path based on their role
    this.userService.getUserProfile().subscribe(
      (userProfile: any) => {
        const currentUserRole = userProfile.role;

        switch (currentUserRole) {
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
            // Redirect to default path if the role is not recognized
            this.router.navigate(['/default']);
            break;
        }
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
        // Redirect to login page if user profile cannot be fetched
        this.router.navigate(['/login']);
      }
    );
  } else {
    // If the user is not authenticated, redirect them to the login page
    this.router.navigate(['/login']);
  }
}
}
