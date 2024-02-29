import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HelloComponent} from "./components/hello/hello.component";
import {DashboardComponent} from "../shared/shared-components/dashboard/dashboard.component";
import {UsersComponent} from "./components/users/users.component";
import {AdduserComponent} from "./components/adduser/adduser.component";
import {UpdateuserComponent} from "./components/updateuser/updateuser.component";

const routes: Routes = [
  { path: '',      component: DashboardComponent,
    children: [
      {path:'hello' , component:HelloComponent},
      {path:'Users' , component:UsersComponent},
      {path:'AddUser' , component:AdduserComponent},
      {path:'UpdateUser' , component:UpdateuserComponent},
    ] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
