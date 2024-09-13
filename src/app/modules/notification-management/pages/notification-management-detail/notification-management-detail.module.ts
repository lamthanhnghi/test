import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationManagementDetailComponent } from '@modules/notification-management/pages/notification-management-detail/notification-management-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { UploadProgressModule } from '@shared/stores';
import { notificationManagementResolver } from '@modules/notification-management/resolvers/notification-management.resolver';

const routes: Routes = [
  {
    path: '',
    component: NotificationManagementDetailComponent,
    resolve: {
      dataResolved: notificationManagementResolver,
    },
  },
];

@NgModule({
  declarations: [NotificationManagementDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    SharedModule,
    UploadProgressModule,
  ],
})
export class NotificationManagementDetailModule {}
