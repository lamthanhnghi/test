import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutComponent } from './item-list-master-layout.component';
import { LayoutsModule } from '../../../layouts/layouts.module';

@NgModule({
  imports: [LayoutsModule, SharedModule],
  declarations: [ItemListMasterLayoutComponent],
  exports: [ItemListMasterLayoutComponent],
})
export class ItemListMasterLayoutModule {}
