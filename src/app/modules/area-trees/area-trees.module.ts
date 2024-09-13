import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/area-tree-list/area-tree-list.module').then((m) => m.AreaTreeListModule),
  },
  {
    path: RouteUtils.AreaTreePage.CityId,
    loadChildren: () => import('./pages/area-tree-detail/area-tree-detail.module').then((m) => m.AreaTreeDetailModule),
  },
  {
    path: `${RouteUtils.AreaTreePage.CityId}/${RouteUtils.AreaTreePage.DistrictId}`,
    loadChildren: () => import('./pages/area-ward-detail/area-ward-detail.module').then((m) => m.AreaWardDetailModule),
  },
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AreaTreesModule {}
