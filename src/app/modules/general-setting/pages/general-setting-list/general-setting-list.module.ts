import { NgModule } from '@angular/core';
import { GeneralSettingListComponent } from './general-setting-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: '',
    component: GeneralSettingListComponent,
  },
];

@NgModule({
  declarations: [GeneralSettingListComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemListMasterLayoutModule],
})
export class GeneralSettingListModule {}
