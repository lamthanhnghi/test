import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { ProgramListComponent } from './program-list/program-list.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: ProgramListComponent,
  },
  {
    path: RouteUtils.ProgramsPage.Detail,
    // canActivate: [AuthGuard],
    loadChildren: () => import('./program-detail/program-detail.module').then((m) => m.ProgramDetailModule),
  },
];

@NgModule({
  declarations: [ProgramListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    ItemListMasterLayoutModule,
  ],
})
export class ProgramsModule {}
