import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule

  ]
})
export class SalesModule { }
