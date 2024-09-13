import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CategoryListComponent } from './category-list.component';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
];

@NgModule({
  imports: [ItemListMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [CategoryListComponent],
})
export class CategoryListModule {}
