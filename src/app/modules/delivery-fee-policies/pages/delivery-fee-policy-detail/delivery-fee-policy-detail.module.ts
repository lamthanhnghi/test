import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryFeePolicyDetailComponent } from './delivery-fee-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { deliveryFeePolicyDetailResolver } from '@modules/delivery-fee-policies/resolvers/delivery-fee-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: DeliveryFeePolicyDetailComponent,
    resolve: {
      dataResolved: deliveryFeePolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [DeliveryFeePolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class DeliveryFeePolicyDetailModule {}
