import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/debt-policy-list/debt-policy-list.module').then((m) => m.DebtPolicyListModule),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Create,
    loadChildren: () =>
      import('./pages/debt-policy-detail/debt-policy-detail.module').then((m) => m.DebtPolicyDetailModule),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Detail,
    loadChildren: () =>
      import('./pages/debt-policy-detail/debt-policy-detail.module').then((m) => m.DebtPolicyDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [],
})
export class DebtPoliciesModule {}
