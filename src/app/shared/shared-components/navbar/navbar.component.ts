import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  companyName: string = ''; // Define the user object
  userRole: string = ''; // Define user role
  roleRoutes: any = {
    SuperAdmin: '/Admin/profile',
    admin: '/AdminCompany/profile', 
    salesManager: '/Sales/profile',
    stockManager: '/Stock/profile',
    auditor: '/Audit/profile'
  };
  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    // Fetch user's information from the backend after successful login
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        // Assuming the backend returns the user's name as 'fullName'
        this.userName = response.fullName;
        // Access company name if it exists
        this.companyName = response.company ? response.company.nameCompany : '';
        // Access user role if it exists
        this.userRole = response.role;

      },
      error => {
        console.error('Failed to fetch user profile:', error);
        // Handle error
      }
    );
  }
  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
