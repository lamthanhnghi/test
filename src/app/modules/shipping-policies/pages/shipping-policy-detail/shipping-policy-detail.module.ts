import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingPolicyDetailComponent } from './shipping-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { ShippingPolicyDetailResolver } from '@modules/shipping-policies/resolvers/shipping-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: ShippingPolicyDetailComponent,
    resolve: {
      dataResolved: ShippingPolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [ShippingPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class ShippingPolicyDetailModule {}
