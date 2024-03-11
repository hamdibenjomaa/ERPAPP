import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-company-user',
  templateUrl: './company-user.component.html',
  styleUrl: './company-user.component.css'
})
export class CompanyUserComponent implements OnInit {
  users: any[] = [];
  companyId: string | null = null; // Track the company ID

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        // Assuming company ID is directly available in the user profile
        this.companyId = response.company ? response.company._id : null;

        if (this.companyId) {
          this.userService.getAllUsersByCompany(this.companyId).subscribe(
            (response: any[]) => {
              this.users = response;
            },
            error => {
              console.error('Failed to fetch users:', error);
              // Handle error
            }
          );
        } else {
          console.error('Company ID not available in user profile');
          // Handle case where the company ID is not available
        }
      },
      error => {
        console.error('Failed to fetch user profile:', error);
        // Handle error
      }
    );
  }
}