import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/sales-fee-policy-list/sales-fee-policy-list.module').then((m) => m.SalesFeePolicyListModule),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Create,
    loadChildren: () =>
      import('./pages/sales-fee-policy-detail/sales-fee-policy-detail.module').then(
        (m) => m.SalesFeePolicyDetailModule,
      ),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Detail,
    loadChildren: () =>
      import('./pages/sales-fee-policy-detail/sales-fee-policy-detail.module').then(
        (m) => m.SalesFeePolicyDetailModule,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class SalesFeePoliciesModule {}
