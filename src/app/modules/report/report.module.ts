import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/report/pages/report-list/report-list.module').then((m) => m.ReportListModule),
  },
  {
    path: RouteUtils.ReportsPage.SellerReport,
    loadChildren: () => import('@modules/report/pages/seller-report-detail/seller-report-detail.module').then((m) => m.SellerReportDetailModule),
  },
  {
    path: RouteUtils.ReportsPage.RatingReport,
    loadChildren: () => import('@modules/report/pages/rating-report-detail/rating-report-detail.module').then((m) => m.RatingReportDetailModule),
  },
  {
    path: RouteUtils.ReportsPage.MessageReport,
    loadChildren: () => import('@modules/report/pages/message-report-detail/message-report-detail.module').then((m) => m.MessageReportDetailModule),
  }
  // {
  //   path: RouteUtils.ProductReports.Detail,
  //   loadChildren: () => import('@modules/report/pages/report-detail/report-detail.module').then((m) => m.ReportDetailModule),
  // },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportModule { }
