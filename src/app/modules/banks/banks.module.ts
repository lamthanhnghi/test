import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/bank-list/bank-list.module').then((m) => m.BankListModule),
  },
  {
    path: RouteUtils.BanksPage.Create,
    loadChildren: () => import('./pages/bank-detail/bank-detail.module').then((m) => m.BankDetailModule),
  },
  {
    path: RouteUtils.BanksPage.Detail,
    loadChildren: () => import('./pages/bank-detail/bank-detail.module').then((m) => m.BankDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class BanksModule {}
