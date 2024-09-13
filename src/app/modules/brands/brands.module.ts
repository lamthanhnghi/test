import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/brands/pages/brand-list/brand-list.module').then((m) => m.BrandListModule),
  },
  {
    path: RouteUtils.BrandsPage.Create,
    loadChildren: () =>
      import('@modules/brands/pages/brand-detail/brand-detail.module').then((m) => m.BrandDetailModule),
    data: {},
  },
  {
    path: RouteUtils.BrandsPage.Detail,
    loadChildren: () =>
      import('@modules/brands/pages/brand-detail/brand-detail.module').then((m) => m.BrandDetailModule),
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
export class BrandsModule { }
