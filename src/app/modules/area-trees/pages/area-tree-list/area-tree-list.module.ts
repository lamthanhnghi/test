import { NgModule } from '@angular/core';
import { AreaTreeListComponent } from './area-tree-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: '',
    component: AreaTreeListComponent,
  },
];

@NgModule({
  declarations: [AreaTreeListComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemListMasterLayoutModule],
})
export class AreaTreeListModule {}
