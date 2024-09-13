import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/notification-management-list/notification-management-list.module').then(
        (m) => m.NotificationManagementListModule,
      ),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Create,
    loadChildren: () =>
      import('./pages/notification-management-detail/notification-management-detail.module').then(
        (m) => m.NotificationManagementDetailModule,
      ),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Detail,
    loadChildren: () =>
      import('./pages/notification-management-detail/notification-management-detail.module').then(
        (m) => m.NotificationManagementDetailModule,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [],
})
export class NotificationManagementModule {}
