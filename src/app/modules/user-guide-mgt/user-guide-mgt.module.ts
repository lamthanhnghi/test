import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { RouteUtils } from '@shared/utils';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/user-guide-mgt-list/user-guide-mgt-list.module').then(
        (m) => m.UserGuideMgtListModule,
      ),
  },
  {
    path: RouteUtils.CategoriesPage.Create,
    loadChildren: () =>
      import('@modules/user-guide-mgt/pages/user-guide-mgt-detail/user-guide-mgt-detail.module').then(
        (m) => m.UserGuideMgtDetailModule,
      ),
    data: {},
  },
  {
    path: RouteUtils.CategoriesPage.Detail,
    loadChildren: () =>
      import('@modules/user-guide-mgt/pages/user-guide-mgt-detail/user-guide-mgt-detail.module').then(
        (m) => m.UserGuideMgtDetailModule,
      ),
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class UserGuideMgtModule {}
