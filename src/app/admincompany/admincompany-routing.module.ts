import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { DashboardComponent } from '../shared/shared-components/dashboard/dashboard.component';
import { CompanyUserComponent } from './components/company-user/company-user.component';
import { ProfileComponent } from '../admin/components/profile/profile.component';

const routes: Routes = [
  { 
    path: '',      
    component: DashboardComponent,
    canActivate: [AuthGuardService], // Apply AuthGuard to this route
    children: [
      { path: 'Users', component: CompanyUserComponent },
      { path: 'profile', component: ProfileComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmincompanyRoutingModule { }
