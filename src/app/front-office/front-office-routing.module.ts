import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import { SignupComponent } from './components/signin/signin.component';
import {HomeComponent} from "./components/home/home.component";
import { ForgotPasswordComponent } from './components/forget-password/forget-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  {path: '',      component: HomeComponent},
  {path:'login' , component: LoginComponent},
  {path:'signin' , component: SignupComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: PasswordResetComponent } // Ensure component property is specified
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
