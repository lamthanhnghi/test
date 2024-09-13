import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProductGroupListComponent } from './product-group-list.component';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: '',
    component: ProductGroupListComponent,
  },
];

@NgModule({
  imports: [ItemListMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [ProductGroupListComponent],
})
export class ProductGroupListModule {}
