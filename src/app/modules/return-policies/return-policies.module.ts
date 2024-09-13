import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@modules/return-policies/pages/return-policy-list/return-policy-list.module').then(
        (m) => m.ReturnPolicyListModule,
      ),
  },
  {
    path: RouteUtils.ReturnPoliciesPage.Create,
    loadChildren: () =>
      import('@modules/return-policies/pages/return-policy-detail/return-policy-detail.module').then(
        (m) => m.ReturnPolicyDetailModule,
      ),
  },
  {
    path: RouteUtils.ReturnPoliciesPage.Detail,
    loadChildren: () =>
      import('@modules/return-policies/pages/return-policy-detail/return-policy-detail.module').then(
        (m) => m.ReturnPolicyDetailModule,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ReturnPoliciesModule {}
