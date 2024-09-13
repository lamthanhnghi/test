import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProductReportInfoComponent
} from '@modules/report/components/product-report-info/product-report-info.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ProductReportInfoComponent
  ],
  exports: [
    ProductReportInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProductReportInfoModule { }
