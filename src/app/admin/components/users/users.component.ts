import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  pagedUsers: any[] = [];
  currentPage = 1;
  itemsPerPage = 10; // Change as needed
  totalPages = 1;
  showConfirmationModal = false;
  userIdToDeactivate: string | null = null;

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any[]) => {
        this.users = response.map(user => ({
          ...user,
          companyName: user.company ? user.company.nameCompany : null
        }));
        this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
        this.updatePage();
      },
      error => {
        console.error('Failed to fetch users:', error);
      }
    );
  }

  confirmDeactivate(userId: string): void {
    this.userIdToDeactivate = userId;
    this.showConfirmationModal = true;
  }

  confirmDeactivation(): void {
    if (this.userIdToDeactivate) {
      this.userService.deactivateUser(this.userIdToDeactivate).subscribe(
        response => {
          console.log('User deactivated successfully');
          this.closeModal();
          this.toastr.success('User deactivated successfully', 'Success');
          this.loadUsers(); // Reload users after deactivation
        },
        error => {
          console.error('Failed to deactivate user:', error);
          this.toastr.error('Failed to deactivate user', 'Error');
        }
      );
    }
  }

  cancelDeactivation(): void {
    this.closeModal();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  private updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.users.length);
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  private closeModal(): void {
    this.showConfirmationModal = false;
    this.userIdToDeactivate = null;
  }

  activateUser(userId: string): void {
    this.userService.activateUser(userId).subscribe(
      response => {
        console.log('User activated successfully');
        this.toastr.success('User activated successfully', 'Success');
        this.loadUsers(); // Reload users after activation
      },
      error => {
        console.error('Failed to activate user:', error);
        this.toastr.error('Failed to activate user', 'Error');
      }
    );
  }
}
