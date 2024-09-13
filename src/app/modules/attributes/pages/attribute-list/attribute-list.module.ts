import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeListComponent } from './attribute-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: "",
    component: AttributeListComponent
  }
]

@NgModule({
  declarations: [
    AttributeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ItemListMasterLayoutModule
  ]
})
export class AttributeListModule { }
