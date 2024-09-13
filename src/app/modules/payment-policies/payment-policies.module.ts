import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@modules/payment-policies/pages/payment-policy-list/payment-policy-list.module').then(
        (m) => m.PaymentPolicyListModule,
      ),
  },
  {
    path: RouteUtils.PaymentPoliciesPage.Create,
    loadChildren: () =>
      import('@modules/payment-policies/pages/payment-policy-detail/payment-policy-detail.module').then(
        (m) => m.PaymentPolicyDetailModule,
      ),
  },
  {
    path: RouteUtils.PaymentPoliciesPage.Detail,
    loadChildren: () =>
      import('@modules/payment-policies/pages/payment-policy-detail/payment-policy-detail.module').then(
        (m) => m.PaymentPolicyDetailModule,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PaymentPoliciesModule {}
