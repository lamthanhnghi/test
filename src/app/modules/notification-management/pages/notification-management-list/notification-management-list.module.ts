import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationManagementListComponent } from '@modules/notification-management/pages/notification-management-list/notification-management-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationManagementListComponent,
  },
];

@NgModule({
  declarations: [NotificationManagementListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, ItemListMasterLayoutModule],
})
export class NotificationManagementListModule {}
