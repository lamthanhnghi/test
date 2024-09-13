import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingReportDetailComponent } from './rating-report-detail.component';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { reportDetailResolver } from '@modules/report/resolvers/report-detail.resolver';
import { ProductReportInfoModule } from '@modules/report/components/product-report-info/product-report-info.module';
import { CommentBoxModule } from '@modules/report/pages/components/comment-box/comment-box.module';

const routes: Routes = [
  {
    path: RouteUtils.ReportsPage.Detail,
    resolve: {
      dataResolved: reportDetailResolver,
    },
    runGuardsAndResolvers: 'always',
    component: RatingReportDetailComponent,
  }
]

@NgModule({
  declarations: [
    RatingReportDetailComponent
  ],
  imports: [
    CommonModule,
    ItemDetailMasterLayoutModule,
    SharedModule,
    RouterModule.forChild(routes),
    ProductReportInfoModule,
    CommentBoxModule
  ]
})
export class RatingReportDetailModule { }
