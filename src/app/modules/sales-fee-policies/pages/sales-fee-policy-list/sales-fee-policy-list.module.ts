import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesFeePolicyListComponent } from './sales-fee-policy-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SalesFeePolicyListComponent,
  },
];

@NgModule({
  declarations: [SalesFeePolicyListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, ItemListMasterLayoutModule],
})
export class SalesFeePolicyListModule {}
