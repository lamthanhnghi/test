import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentPolicyDetailComponent } from './payment-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { PaymentPolicyDetailResolver } from '@modules/payment-policies/resolvers/payment-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: PaymentPolicyDetailComponent,
    resolve: {
      dataResolved: PaymentPolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [PaymentPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class PaymentPolicyDetailModule {}
