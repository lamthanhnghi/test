import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/program-policy-list/program-policy-list.module').then((m) => m.ProgramPolicyListModule),
  },
  {
    path: RouteUtils.ProgramPoliciesPage.Detail,
    loadChildren: () =>
      import('./pages/program-policy-detail/program-policy-detail.module').then((m) => m.ProgramPolicyDetailModule),
  },
  {
    path: RouteUtils.ProgramPoliciesPage.Create,
    loadChildren: () =>
      import('./pages/program-policy-detail/program-policy-detail.module').then((m) => m.ProgramPolicyDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ProgramPoliciesModule {}
