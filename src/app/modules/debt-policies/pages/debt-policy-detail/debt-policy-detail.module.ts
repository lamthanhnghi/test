import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { DebtPolicyDetailComponent } from './debt-policy-detail.component';
import { debtPolicyDetailResolver } from '@modules/debt-policies/resolvers/debt-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: DebtPolicyDetailComponent,
    resolve: {
      dataResolved: debtPolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [DebtPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class DebtPolicyDetailModule {}
