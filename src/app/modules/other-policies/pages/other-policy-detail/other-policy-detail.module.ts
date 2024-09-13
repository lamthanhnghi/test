import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherPolicyDetailComponent } from './other-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { otherPolicyDetailResolver } from '@modules/other-policies/resolvers/other-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: OtherPolicyDetailComponent,
    resolve: {
      dataResolved: otherPolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [OtherPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class OtherPolicyDetailModule {}
