import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  resetToken: string | null = null; // Initialize resetToken property

  newPassword: string = '';
  confirmPassword: string = '';
  resetError: string = '';

  constructor(
    private route: ActivatedRoute,
    private passwordResetService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the reset token from the query parameters
    this.resetToken = this.route.snapshot.queryParamMap.get('token');
  }

  resetPassword(): void {
    if (!this.resetToken) {
      this.resetError = 'Reset token is missing';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.resetError = 'Passwords do not match';
      return;
    }

    this.passwordResetService.resetPassword(this.resetToken, this.newPassword)
      .subscribe(
        () => {
          // Password reset successful
          this.toastr.success('Password reset successful. Please login with your new password.', 'Success');
          this.router.navigate(['/login']); // Redirect to login page
        },
        error => {
          // Handle error
          this.resetError = error.message;
          this.toastr.error('Password reset failed. Please try again later.', 'Error');
        }
      );
  }
}