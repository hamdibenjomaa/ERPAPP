import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../shared/shared-components/dashboard/dashboard.component";
import { ProfileComponent } from '../admin/components/profile/profile.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: '',      component: DashboardComponent,
  canActivate: [AuthGuardService],
    children: [      
      { path: 'profile', component: ProfileComponent }


    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }
