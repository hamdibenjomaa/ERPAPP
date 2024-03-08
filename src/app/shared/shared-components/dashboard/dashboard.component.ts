import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentUserRole: string = ''; 
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole(): void {
    this.userService.getUserProfile().subscribe(
      (userProfile: any) => {
        this.currentUserRole = userProfile.role;
        console.log('Current User Role:', this.currentUserRole); // Log the current user role for debugging
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}