import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "../shared/shared-components/dashboard/dashboard.component";
import { HelloComponent } from "./components/hello/hello.component";
import { UsersComponent } from "./components/users/users.component";
import { AdduserComponent } from "./components/adduser/adduser.component";
import { UpdateuserComponent } from "./components/updateuser/updateuser.component";
import { AuthGuardService } from '../services/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { 
    path: '',      
    component: DashboardComponent,
    canActivate: [AuthGuardService], // Apply AuthGuard to this route
    children: [
      { path: 'hello', component: HelloComponent },
      { path: 'Users', component: UsersComponent },
      { path: 'AddUser', component: AdduserComponent },
      { path: 'UpdateUser', component: UpdateuserComponent },
      { path: 'profile', component: ProfileComponent }

    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
