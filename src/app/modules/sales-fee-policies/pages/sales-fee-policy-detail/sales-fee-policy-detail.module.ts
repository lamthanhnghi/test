import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesFeePolicyDetailComponent } from './sales-fee-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { salesFeePolicyDetailResolver } from '@modules/sales-fee-policies/resolvers/sales-fee-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: SalesFeePolicyDetailComponent,
    resolve: {
      dataResolved: salesFeePolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [SalesFeePolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class SalesFeePolicyDetailModule {}
