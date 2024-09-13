import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackedUnitListComponent } from './packed-unit-list.component';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: '',
    component: PackedUnitListComponent,
  },
];

@NgModule({
  declarations: [PackedUnitListComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemListMasterLayoutModule],
})
export class PackedUnitListModule {}
