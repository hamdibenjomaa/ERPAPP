import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarFrontComponent } from './components/navbar-front/navbar-front.component';
import { FooterFrontComponent } from './components/footer-front/footer-front.component';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './components/forget-password/forget-password.component';
import { ToastrModule } from 'ngx-toastr';
=======
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 9802b1ba3fc1f21eea1f47fea931fe2a533517ac


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarFrontComponent,
    FooterFrontComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
<<<<<<< HEAD
    FormsModule,
    ToastrModule.forRoot() // Add ToastrModule.forRoot() here
  ],
    
  
=======
    
  ]
>>>>>>> 9802b1ba3fc1f21eea1f47fea931fe2a533517ac
})
export class FrontOfficeModule { }
