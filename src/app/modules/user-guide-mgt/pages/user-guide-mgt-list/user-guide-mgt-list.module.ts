import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import {
  UserGuideMgtListComponent
} from '@modules/user-guide-mgt/pages/user-guide-mgt-list/user-guide-mgt-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserGuideMgtListComponent,
  },
];

@NgModule({
  imports: [ItemListMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [UserGuideMgtListComponent],
})
export class UserGuideMgtListModule {}
