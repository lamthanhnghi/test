import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { RouteUtils } from '@shared/utils';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/product-group-list/product-group-list.module').then((m) => m.ProductGroupListModule),
  },
  {
    path: RouteUtils.CategoriesPage.Create,
    loadChildren: () =>
      import('./pages/product-group-detail/product-group-detail.module').then((m) => m.ProductGroupDetailModule),
    data: {},
  },
  {
    path: RouteUtils.CategoriesPage.Detail,
    loadChildren: () =>
      import('./pages/product-group-detail/product-group-detail.module').then((m) => m.ProductGroupDetailModule),
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class ProductGroupsModule {}
