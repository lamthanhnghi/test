import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopReportInfoComponent } from '@modules/report/components/shop-report-info/shop-report-info.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ShopReportInfoComponent
  ],
  exports: [
    ShopReportInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShopReportInfoModule { }
