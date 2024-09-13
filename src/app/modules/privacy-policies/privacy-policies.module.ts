import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/privacy-policy-list/privacy-policy-list.module').then((m) => m.PrivacyPolicyListModule),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Detail,
    loadChildren: () =>
      import('./pages/privacy-policy-detail/privacy-policy-detail.module').then((m) => m.PrivacyPolicyDetailModule),
  },
  {
    path: RouteUtils.PrivacyPoliciesPage.Create,
    loadChildren: () =>
      import('./pages/privacy-policy-detail/privacy-policy-detail.module').then((m) => m.PrivacyPolicyDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PrivacyPoliciesModule {}
