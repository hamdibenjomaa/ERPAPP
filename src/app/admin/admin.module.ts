import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {SharedModule} from "../shared/shared.module";
import { HelloComponent } from './components/hello/hello.component';
import { UsersComponent } from './components/users/users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './components/profile/profile.component';
import { ConfirmationModalComponent } from '../shared/shared-components/confirmation-modal/confirmation-modal.component';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    HelloComponent,
    UsersComponent,
    AdduserComponent,
    UpdateuserComponent,
    ProfileComponent,


  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        MatSortModule,
        
    ]
})
export class AdminModule { }
