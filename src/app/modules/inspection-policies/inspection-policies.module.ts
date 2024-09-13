import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@modules/inspection-policies/pages/inspection-policy-list/inspection-policy-list.module').then(
        (m) => m.InspectionPolicyListModule,
      ),
  },
  {
    path: RouteUtils.InspectionPoliciesPage.Create,
    loadChildren: () =>
      import('@modules/inspection-policies/pages/inspection-policy-detail/inspection-policy-detail.module').then(
        (m) => m.InspectionPolicyDetailModule,
      ),
  },
  {
    path: RouteUtils.InspectionPoliciesPage.Detail,
    loadChildren: () =>
      import('@modules/inspection-policies/pages/inspection-policy-detail/inspection-policy-detail.module').then(
        (m) => m.InspectionPolicyDetailModule,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class InspectionPoliciesModule {}
