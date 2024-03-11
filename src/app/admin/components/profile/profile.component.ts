import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

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

  constructor(private userService: UserService) { }

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
}