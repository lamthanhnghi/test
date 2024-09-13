import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { OrganizationRegistrationPolicyDetailComponent } from '@modules/organization-registration-policies/pages/organization-registration-policy-detail/organization-registration-policy-detail.component';
import { OrganizationRegistrationPolicyDetailResolver } from '@modules/organization-registration-policies/resolvers/organization-registration-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: OrganizationRegistrationPolicyDetailComponent,
    resolve: {
      dataResolved: OrganizationRegistrationPolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [OrganizationRegistrationPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class OrganizationRegistrationPolicyDetailModule {}
