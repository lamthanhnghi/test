import { NgModule } from '@angular/core';
import { AreaTreeDetailComponent } from './area-tree-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { areaTreeDetailResolver } from '@modules/area-trees/resolvers/area-tree-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: AreaTreeDetailComponent,
    resolve: { dataResolved: areaTreeDetailResolver },
  },
];

@NgModule({
  declarations: [AreaTreeDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule],
})
export class AreaTreeDetailModule {}
