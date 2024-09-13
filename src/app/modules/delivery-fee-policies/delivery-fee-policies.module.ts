import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/delivery-fee-policy-list/delivery-fee-policy-list.module').then(
        (m) => m.DeliveryFeePolicyListModule,
      ),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Create,
    loadChildren: () =>
      import('./pages/delivery-fee-policy-detail/delivery-fee-policy-detail.module').then(
        (m) => m.DeliveryFeePolicyDetailModule,
      ),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Detail,
    loadChildren: () =>
      import('./pages/delivery-fee-policy-detail/delivery-fee-policy-detail.module').then(
        (m) => m.DeliveryFeePolicyDetailModule,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [],
})
export class DeliveryFeePoliciesModule {}
