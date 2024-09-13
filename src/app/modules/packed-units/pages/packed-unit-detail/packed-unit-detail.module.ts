import { NgModule } from '@angular/core';
import { PackedUnitDetailComponent } from '@modules/packed-units/pages/packed-unit-detail/packed-unit-detail.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { packedUnitDetailResolver } from '@modules/packed-units/resolvers/packed-unit-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: PackedUnitDetailComponent,
    resolve: { dataResolved: packedUnitDetailResolver },
  },
];

@NgModule({
  declarations: [PackedUnitDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule],
})
export class PackedUnitDetailModule {}
