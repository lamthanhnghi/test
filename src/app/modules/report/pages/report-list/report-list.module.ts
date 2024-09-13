import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportListComponent } from './report-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { RouteUtils } from '@shared/utils';

const routes: Routes = [
  {
    path: RouteUtils.ReportsPage.RatingReport,
    component: ReportListComponent,
  },
  {
    path: RouteUtils.ReportsPage.SellerReport,
    component: ReportListComponent,
  },
  {
    path: RouteUtils.ReportsPage.MessageReport,
    component: ReportListComponent,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: RouteUtils.ReportsPage.RatingReport,
  },
];

@NgModule({
  declarations: [
    ReportListComponent
  ],
  imports: [
    CommonModule, SharedModule, ItemListMasterLayoutModule, RouterModule.forChild(routes)
  ]
})
export class ReportListModule { }
