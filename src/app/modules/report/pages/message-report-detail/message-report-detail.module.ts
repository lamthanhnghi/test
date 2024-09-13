import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageReportDetailComponent } from './message-report-detail.component';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzTransitionPatchDirective } from 'ng-zorro-antd/core/transition-patch/transition-patch.directive';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { SharedModule } from '@shared/shared.module';
import { ShopReportInfoModule } from '@modules/report/components/shop-report-info/shop-report-info.module';
import { TranslateModule } from '@ngx-translate/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { reportDetailResolver } from '@modules/report/resolvers/report-detail.resolver';
import { SellerReportDetailComponent } from '@modules/report/pages/seller-report-detail/seller-report-detail.component';
import { MessageReportInfoModule } from '@modules/report/components/message-report-info/message-report-info.module';
import { CommentBoxModule } from '@modules/report/pages/components/comment-box/comment-box.module';


const routes: Routes = [
  {
    path: RouteUtils.ReportsPage.Detail,
    resolve: {
      dataResolved: reportDetailResolver,
    },
    runGuardsAndResolvers: "always",
    component: MessageReportDetailComponent,
  }
]


@NgModule({
  declarations: [
    MessageReportDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MessageReportInfoModule, ItemDetailMasterLayoutModule,
    RouterModule.forChild(routes), CommentBoxModule
  ]
})
export class MessageReportDetailModule { }
