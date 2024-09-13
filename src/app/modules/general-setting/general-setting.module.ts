import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { RouteUtils } from '@shared/utils';
import { generalSettingListGuard } from '@modules/general-setting/guards/general-setting.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/general-setting-list/general-setting-list.module').then((m) => m.GeneralSettingListModule),
    canActivate: [generalSettingListGuard],
  },
  {
    path: `${RouteUtils.GeneralSettingPage.Create}`,
    loadChildren: () =>
      import('./pages/general-setting-detail/general-setting-detail.module').then((m) => m.GeneralSettingDetailModule),
  },
  {
    path: `${RouteUtils.GeneralSettingPage.Detail}`,
    loadChildren: () =>
      import('./pages/general-setting-detail/general-setting-detail.module').then((m) => m.GeneralSettingDetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class GeneralSettingModule {}
