import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotfoundComponent} from "./shared/shared-components/notfound/notfound.component";

const routes: Routes = [
  { path: '', loadChildren:()=>import('./front-office/front-office.module').then(x => x.FrontOfficeModule) },
  { path: 'Admin', loadChildren:()=>import('./admin/admin.module').then(x => x.AdminModule) },
  { path: 'AdminCompany', loadChildren:()=>import('./admincompany/admincompany.module').then(x => x.AdmincompanyModule) },
  { path: 'Sales', loadChildren:()=>import('./sales/sales.module').then(x => x.SalesModule) },
  { path: 'Stock', loadChildren:()=>import('./stock/stock.module').then(x => x.StockModule) },
  { path: 'Audit', loadChildren:()=>import('./audit/audit.module').then(x => x.AuditModule) },

  {path: '**', component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
