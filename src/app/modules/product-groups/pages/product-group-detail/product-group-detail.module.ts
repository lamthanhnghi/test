import { NgModule } from '@angular/core';
import { ProductGroupDetailComponent } from './product-group-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { UploadProgressModule } from '@shared/stores';
import { productGroupDetailResolver } from '@modules/product-groups/resolvers/product-group-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductGroupDetailComponent,
    resolve: {
      dataResolved: productGroupDetailResolver,
    },
  },
];

@NgModule({
  declarations: [ProductGroupDetailComponent],
  exports: [ProductGroupDetailComponent, UploadProgressModule],
  imports: [ItemDetailMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
})
export class ProductGroupDetailModule {}
