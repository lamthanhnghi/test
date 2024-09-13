import { NgModule } from '@angular/core';
import { AreaWardDetailComponent } from '@modules/area-trees/pages/area-ward-detail/area-ward-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { areaWardDetailResolver } from '@modules/area-trees/resolvers/area-ward-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: AreaWardDetailComponent,
    resolve: { dataResolved: areaWardDetailResolver },
  },
];

@NgModule({
  declarations: [AreaWardDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule],
})
export class AreaWardDetailModule {}
