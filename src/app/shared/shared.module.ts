import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotfoundComponent} from "./shared-components/notfound/notfound.component";
import {NavbarComponent} from "./shared-components/navbar/navbar.component";
import {FooterComponent} from "./shared-components/footer/footer.component";
import { DashboardComponent } from './shared-components/dashboard/dashboard.component';
import { SidebarComponent } from './shared-components/sidebar/sidebar.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { SidebarAdminComponent } from './shared-components/sidebar-admin/sidebar-admin.component';
import { SidebarSalesComponent } from './shared-components/sidebar-sales/sidebar-sales.component';
import { SidebarStockComponent } from './shared-components/sidebar-stock/sidebar-stock.component';
import { SidebarAuditComponent } from './shared-components/sidebar-audit/sidebar-audit.component';
import { SidebarSuperadminComponent } from './shared-components/sidebar-superadmin/sidebar-superadmin.component';
import { ConfirmationModalComponent } from './shared-components/confirmation-modal/confirmation-modal.component';



@NgModule({
  declarations: [
    NotfoundComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    SidebarComponent,
    SidebarAdminComponent,
    SidebarSalesComponent,
    SidebarStockComponent,
    SidebarAuditComponent,
    SidebarSuperadminComponent,
    ConfirmationModalComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ConfirmationModalComponent

    
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink
    ]
})
export class SharedModule { }
