import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleUnitListComponent } from './sale-unit-list.component';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: SaleUnitListComponent
  }
]

@NgModule({
  declarations: [
    SaleUnitListComponent
  ],
  imports: [
    CommonModule,
    ItemListMasterLayoutModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class SaleUnitListModule { }
