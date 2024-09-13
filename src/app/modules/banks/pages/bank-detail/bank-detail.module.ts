import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankDetailComponent } from './bank-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { bankDetailResolver } from '@modules/banks/resolvers/bank-detail.resolver';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { UploadProgressModule } from '@shared/stores';

const routes: Routes = [
  {
    path: '',
    component: BankDetailComponent,
    resolve: {
      dataResolved: bankDetailResolver,
    },
  },
];

@NgModule({
  declarations: [BankDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    UploadProgressModule,
    SharedModule,
  ],
})
export class BankDetailModule {}
