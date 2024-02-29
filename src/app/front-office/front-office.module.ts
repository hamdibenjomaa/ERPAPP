import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarFrontComponent } from './components/navbar-front/navbar-front.component';
import { FooterFrontComponent } from './components/footer-front/footer-front.component';


@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    HomeComponent,
    NavbarFrontComponent,
    FooterFrontComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule
  ]
})
export class FrontOfficeModule { }
