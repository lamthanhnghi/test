import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GroupListComponent } from './group-list.component';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
];

@NgModule({
  imports: [CommonModule, ItemListMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [GroupListComponent],
  exports: [GroupListComponent],
})
export class GroupListModule {}
