import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListModule } from '@modules/groups/pages/group-list/group-list.module';
import { GroupDetailModule } from './pages/group-detail/group-detail.module';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from '@modules/groups/pages/group-list/group-list.component';
import { RouteUtils } from '@shared/utils';
import { GroupDetailComponent } from './pages/group-detail/group-detail.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: GroupListComponent,
  },
  {
    path: RouteUtils.GroupsPage.Detail,
    // canActivate: [AuthGuard],
    component: GroupDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), GroupListModule, GroupDetailModule],
})
export class GroupsModule {}
