import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class StockModule { }
