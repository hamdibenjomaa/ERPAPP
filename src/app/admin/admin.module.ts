import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {SharedModule} from "../shared/shared.module";
import { HelloComponent } from './components/hello/hello.component';
import { UsersComponent } from './components/users/users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './components/profile/profile.component';


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
        ReactiveFormsModule
    ]
})
export class AdminModule { }
