import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = []; // Assuming users array contains user objects with company names

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (response: any[]) => {
        this.users = response.map(user => ({
          ...user,
          companyName: user.company ? user.company.nameCompany : null
        }));
      },
      error => {
        console.error('Failed to fetch users:', error);
        // Handle error
      }
    );
  }
}
