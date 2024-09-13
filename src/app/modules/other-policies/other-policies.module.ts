import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@modules/other-policies/pages/other-policy-list/other-policy-list.module').then(
        (m) => m.OtherPolicyListModule,
      ),
  },
  {
    path: RouteUtils.OtherPoliciesPage.Create,
    loadChildren: () =>
      import('@modules/other-policies/pages/other-policy-detail/other-policy-detail.module').then(
        (m) => m.OtherPolicyDetailModule,
      ),
  },
  {
    path: RouteUtils.OtherPoliciesPage.Detail,
    loadChildren: () =>
      import('@modules/other-policies/pages/other-policy-detail/other-policy-detail.module').then(
        (m) => m.OtherPolicyDetailModule,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class OtherPoliciesModule {}
