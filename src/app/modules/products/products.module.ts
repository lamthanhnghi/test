import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';
import { ProductListComponent } from '@modules/products/pages/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {
  ProductManagementComponent
} from '@modules/products/components/product-management/product-management.component';
import { CommentSectionComponent } from '@shared/comment-section/comment-section.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { isShowMenu: true },
  },
  {
    path: RouteUtils.ProductsPage.ProductId,
    component: ProductDetailComponent,
  },
];

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    ItemListMasterLayoutModule,
    CommentSectionComponent,
  ],
})
export class ProductsModule {}
