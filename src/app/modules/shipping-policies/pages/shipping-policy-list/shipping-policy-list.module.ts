import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingPolicyListComponent } from './shipping-policy-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: '',
    component: ShippingPolicyListComponent,
  },
];

@NgModule({
  declarations: [ShippingPolicyListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, ItemListMasterLayoutModule],
})
export class ShippingPolicyListModule {}
