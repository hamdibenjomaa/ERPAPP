import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  selectedFile: File | null = null; // Track the selected file
  imagePath: string | null = null; // Track the user's profile picture path
  companyName: string | null = null; // Track the user's company name
  editMode: boolean = false; // Track whether the component is in edit mode
  currentPassword: string = '';
  newPassword: string = '';
  changePasswordMode: boolean = false;
  constructor(private userService: UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        this.user = response;
        this.imagePath = response.picture;
        this.companyName = response.company ? response.company.nameCompany : null; // Assuming company name is in a 'name' field
      },
      error => {
        console.error('Failed to fetch user profile:', error);
        // Handle error
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Get the selected file
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      this.userService.uploadProfilePicture(this.selectedFile, this.user._id).subscribe(
        (response: any) => {
          console.log('Profile picture uploaded:', response);
          // Update user's profile picture path in the frontend
          this.user.profilePicture = response.imagePath;
        },
        error => {
          console.error('Failed to upload profile picture:', error);
          // Handle error
        }
      );
    } else {
      console.error('No file selected.');
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    // Update user data only if edit mode is active
    if (this.editMode) {
      // Call the updateUser method from the UserService
      this.userService.updateUser(this.user._id, this.user).subscribe(
        (response: any) => {
          console.log('User data updated:', response);
          // For demonstration purposes, let's just toggle back to display mode
          this.toggleEditMode();
        },
        error => {
          console.error('Failed to update user data:', error);
          // Handle error
        }
      );
    } else {
      console.warn('Cannot save changes when not in edit mode.');
    }
  }
  toggleChangePasswordMode(): void {
    this.changePasswordMode = !this.changePasswordMode;
  }

  changePassword(): void {
    console.log('Current Password:', this.currentPassword);
    console.log('New Password:', this.newPassword);
  
    // Check if both currentPassword and newPassword are not empty
    if (this.currentPassword.trim() !== '' && this.newPassword.trim() !== '') {
      if (!this.isPasswordValid(this.newPassword)) {
        // Password does not meet criteria
        this.toastr.error('Password must be at least 8 characters long with at least one letter and one number', 'Error');
        return;
      }
      this.userService.changePassword(this.currentPassword, this.newPassword).subscribe(
        (response: any) => {
          console.log('Password changed successfully:', response);
          // Reset password fields
          this.currentPassword = '';
          this.newPassword = '';
          // Display success toastr notification
          this.toastr.success('Password changed successfully', 'Success');
        },
        error => {
          console.error('Failed to change password:', error);
          // Handle error and provide feedback to the user
          this.toastr.error('Failed to change password', 'Error');
        }
      );
    } else {
      console.warn('Please enter both current and new passwords.');
      // Display warning toastr notification
      this.toastr.warning('Please enter both current and new passwords', 'Warning');
    }
  }
  isPasswordValid(password: string): boolean {
    // Password must be at least 8 characters long with at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }
}