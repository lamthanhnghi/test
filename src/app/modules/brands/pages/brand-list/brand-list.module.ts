import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandListComponent } from './brand-list.component';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: BrandListComponent
  }
]

@NgModule({
  declarations: [
    BrandListComponent
  ],
  imports: [
    CommonModule,
    ItemListMasterLayoutModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BrandListModule { }
