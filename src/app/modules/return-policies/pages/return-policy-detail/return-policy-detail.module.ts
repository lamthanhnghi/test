import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnPolicyDetailComponent } from './return-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { ReturnPolicyDetailResolver } from '@modules/return-policies/resolvers/return-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: ReturnPolicyDetailComponent,
    resolve: {
      dataResolved: ReturnPolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [ReturnPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class ReturnPolicyDetailModule {}
