import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProfileStoreModule } from '@shared/stores';
import { ProfileMasterLayoutComponent } from './components/profile-master-layout/profile-master-layout.component';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { RouteUtils } from '@shared/utils';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  {
    path: RouteUtils.ProfilePage.AccountInfo,
    loadChildren: () => import('./pages/profile-info/profile-info.module').then((m) => m.ProfileInfoModule),
  },
  {
    path: RouteUtils.ProfilePage.ControlPanel,
    loadChildren: () =>
      import('./pages/profile-control-panel/profile-control-panel.module').then((m) => m.ProfileControlPanelModule),
  },
  // {
  //   path: '',
  //   redirectTo: RouteUtils.ProfilePage.AccountInfo,
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ProfileStoreModule,
    ItemDetailMasterLayoutModule,
    ItemListMasterLayoutModule,
    StoreModule,
  ],
  declarations: [ProfileMasterLayoutComponent],
  exports: [ProfileMasterLayoutComponent],
})
export class ProfileModule {}
