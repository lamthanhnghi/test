import { NgModule } from '@angular/core';
import { UserGuideMgtDetailComponent } from './user-guide-mgt-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { UploadProgressModule } from '@shared/stores';
import { userGuideMgtDetailResolver } from '@modules/user-guide-mgt/resolvers/user-guide-mgt-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserGuideMgtDetailComponent,
    resolve: {
      dataResolved: userGuideMgtDetailResolver,
    },
  },
];

@NgModule({
  declarations: [UserGuideMgtDetailComponent],
  exports: [UserGuideMgtDetailComponent, UploadProgressModule],
  imports: [ItemDetailMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
})
export class UserGuideMgtDetailModule {}
