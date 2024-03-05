import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, useAnimation, style, animate } from '@angular/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
  
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: UserService, private toastr: ToastrService) {}

  forgotPassword(): void {
    this.authService.forgotPassword(this.email)
      .subscribe(
        () => {
          // Display success notification
          this.toastr.success('Password reset email sent successfully.', 'Success');
        },
        error => {
          console.error('Forgot password error:', error);
          // Display error message to the user
          this.toastr.error('Failed to send password reset email.', 'Error');
        }
      );
  }
}