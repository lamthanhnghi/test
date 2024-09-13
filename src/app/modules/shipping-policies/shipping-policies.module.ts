import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@modules/shipping-policies/pages/shipping-policy-list/shipping-policy-list.module').then(
        (m) => m.ShippingPolicyListModule,
      ),
  },
  {
    path: RouteUtils.ShippingPoliciesPage.Create,
    loadChildren: () =>
      import('@modules/shipping-policies/pages/shipping-policy-detail/shipping-policy-detail.module').then(
        (m) => m.ShippingPolicyDetailModule,
      ),
  },
  {
    path: RouteUtils.ShippingPoliciesPage.Detail,
    loadChildren: () =>
      import('@modules/shipping-policies/pages/shipping-policy-detail/shipping-policy-detail.module').then(
        (m) => m.ShippingPolicyDetailModule,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ShippingPoliciesModule {}
