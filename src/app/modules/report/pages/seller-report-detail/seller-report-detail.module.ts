import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerReportDetailComponent } from './seller-report-detail.component';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { ShopReportInfoModule } from '@modules/report/components/shop-report-info/shop-report-info.module';
import { reportDetailResolver } from '@modules/report/resolvers/report-detail.resolver';


const routes: Routes = [
  {
    path: RouteUtils.ReportsPage.Detail,
    resolve: {
      dataResolved: reportDetailResolver,
    },
    runGuardsAndResolvers: "always",
    component: SellerReportDetailComponent,
  }
]

@NgModule({
  declarations: [
    SellerReportDetailComponent
  ],
  imports: [
    CommonModule,
    ItemDetailMasterLayoutModule,
    SharedModule,
    RouterModule.forChild(routes),
    ShopReportInfoModule
  ]
})
export class SellerReportDetailModule { }
