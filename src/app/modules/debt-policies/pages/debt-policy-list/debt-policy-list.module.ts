import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { DebtPolicyListComponent } from './debt-policy-list.component';

const routes: Routes = [
  {
    path: '',
    component: DebtPolicyListComponent,
  },
];

@NgModule({
  declarations: [DebtPolicyListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, ItemListMasterLayoutModule],
})
export class DebtPolicyListModule {}
