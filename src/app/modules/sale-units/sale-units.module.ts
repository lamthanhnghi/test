import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { feedbackDetailResolver } from '@modules/feedback/resolvers/feedback-detail.resolver';
import { SharedModule } from '@shared/shared.module';
import { saleUnitDetailResolver } from '@modules/sale-units/resolvers/sale-unit-detail.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/sale-units/pages/sale-unit-list/sale-unit-list.module').then((m) => m.SaleUnitListModule),
  },
  {
    path: RouteUtils.SaleUnitsPage.Create,
    loadChildren: () =>
      import('@modules/sale-units/pages/sale-unit-detail/sale-unit-detail.module').then((m) => m.SaleUnitDetailModule),
    data: {},
  },
  {
    path: RouteUtils.SaleUnitsPage.Detail,
    loadChildren: () =>
      import('@modules/sale-units/pages/sale-unit-detail/sale-unit-detail.module').then((m) => m.SaleUnitDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SaleUnitsModule { }
