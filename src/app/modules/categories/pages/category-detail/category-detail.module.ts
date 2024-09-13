import { NgModule } from '@angular/core';
import { CategoryDetailComponent } from './category-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { categoryDetailResolver } from '@modules/categories/resolvers/category-detail.resolver';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { UploadProgressModule } from '@shared/stores';

const routes: Routes = [
  {
    path: '',
    component: CategoryDetailComponent,
    resolve: {
      dataResolved: categoryDetailResolver,
    },
  },
];

@NgModule({
  declarations: [CategoryDetailComponent],
  exports: [CategoryDetailComponent, UploadProgressModule],
  imports: [ItemDetailMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
})
export class CategoryDetailModule {}
