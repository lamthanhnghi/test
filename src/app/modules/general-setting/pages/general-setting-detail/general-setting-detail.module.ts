import { NgModule } from '@angular/core';
import { GeneralSettingDetailComponent } from './general-setting-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { generalSettingDetailResolver } from '@modules/general-setting/resolvers/general-setting-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: GeneralSettingDetailComponent,
    resolve: {
      dataResolved: generalSettingDetailResolver,
    },
  },
];

@NgModule({
  declarations: [GeneralSettingDetailComponent],
  imports: [RouterModule.forChild(routes), SharedModule, ItemDetailMasterLayoutModule],
})
export class GeneralSettingDetailModule {}
