import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmincompanyRoutingModule } from './admincompany-routing.module';
import { CompanyUserComponent } from './components/company-user/company-user.component';


@NgModule({
  declarations: [
    CompanyUserComponent
  ],
  imports: [
    CommonModule,
    AdmincompanyRoutingModule
  ]
})
export class AdmincompanyModule { }
