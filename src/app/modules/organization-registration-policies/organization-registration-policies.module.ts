import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        '@modules/organization-registration-policies/pages/organization-registration-policy-list/organization-registration-policy-list.module'
      ).then((m) => m.OrganizationRegistrationPolicyListModule),
  },
  {
    path: RouteUtils.OrganizationRegistrationPoliciesPage.Create,
    loadChildren: () =>
      import(
        '@modules/organization-registration-policies/pages/organization-registration-policy-detail/organization-registration-policy-detail.module'
      ).then((m) => m.OrganizationRegistrationPolicyDetailModule),
  },
  {
    path: RouteUtils.OrganizationRegistrationPoliciesPage.Detail,
    loadChildren: () =>
      import(
        '@modules/organization-registration-policies/pages/organization-registration-policy-detail/organization-registration-policy-detail.module'
      ).then((m) => m.OrganizationRegistrationPolicyDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class OrganizationRegistrationPoliciesModule {}
