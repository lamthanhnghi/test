import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';
import { agreementListGuard } from '@modules/agreements/guards/agreement.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/agreement-list/agreement-list.module').then((m) => m.AgreementListModule),
    canActivate: [agreementListGuard],
  },
  {
    path: RouteUtils.AgreementPage.Create,
    loadChildren: () => import('./pages/agreement-detail/agreement-detail.module').then((m) => m.AgreementDetailModule),
  },
  {
    path: RouteUtils.AgreementPage.Detail,
    loadChildren: () => import('./pages/agreement-detail/agreement-detail.module').then((m) => m.AgreementDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AgreementsModule {}
