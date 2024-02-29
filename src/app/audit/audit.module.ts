import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AuditRoutingModule,
    SharedModule

  ]
})
export class AuditModule { }
