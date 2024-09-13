import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { RouteUtils } from '@shared/utils';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/category-list/category-list.module').then((m) => m.CategoryListModule),
  },
  {
    path: RouteUtils.CategoriesPage.Create,
    loadChildren: () => import('./pages/category-detail/category-detail.module').then((m) => m.CategoryDetailModule),
  },
  {
    path: RouteUtils.CategoriesPage.Detail,
    loadChildren: () => import('./pages/category-detail/category-detail.module').then((m) => m.CategoryDetailModule),
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class CategoriesModule {}
