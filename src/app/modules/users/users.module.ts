import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { RouteUtils } from '@shared/utils';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailInfoComponent } from '@modules/users/user-detail-info/user-detail-info.component';
import { UserDetailControlPanelComponent } from '@modules/users/user-detail-control-panel/user-detail-control-panel.component';
import { userDetailResolver } from '@modules/users/resolvers/user-detail.resolver';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: UserListComponent,
  },
  {
    path: RouteUtils.UsersPage.Detail,
    // canActivate: [AuthGuard],
    component: UserDetailComponent,

    children: [
      {
        path: RouteUtils.UsersPage.DetailInfo,
        component: UserDetailInfoComponent,
        resolve: {
          dataResolved: userDetailResolver,
        },
      },
      {
        path: RouteUtils.UsersPage.DetailControlPanel,
        component: UserDetailControlPanelComponent,
        resolve: {
          dataResolved: userDetailResolver,
        },
        runGuardsAndResolvers: 'always' // Force resolver reload
      },
    ],
  },
];

@NgModule({
  declarations: [UserListComponent, UserDetailComponent, UserDetailInfoComponent, UserDetailControlPanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    ItemListMasterLayoutModule,
  ],
})
export class UsersModule {}
