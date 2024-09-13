import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyDetailComponent } from './privacy-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { privacyPolicyDetailResolver } from '@modules/privacy-policies/resolvers/privacy-policy-detail.resolver';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyDetailComponent,
    resolve: {
      dataResolved: privacyPolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [PrivacyPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class PrivacyPolicyDetailModule {}
