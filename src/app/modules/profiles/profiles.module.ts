import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: ProfileListComponent,
  },
  {
    path: RouteUtils.ProfilesPage.Detail,
    // canActivate: [AuthGuard],
    component: ProfileDetailComponent,
  },
];

@NgModule({
  declarations: [ProfileListComponent, ProfileDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    ItemListMasterLayoutModule,
  ],
})
export class ProfilesModule {}
