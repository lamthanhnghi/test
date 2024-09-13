import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/packed-unit-list/packed-unit-list.module').then((m) => m.PackedUnitListModule),
  },
  {
    path: RouteUtils.PackedUnitsPage.Detail,
    loadChildren: () =>
      import('./pages/packed-unit-detail/packed-unit-detail.module').then((m) => m.PackedUnitDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class PackedUnitsModule {}
