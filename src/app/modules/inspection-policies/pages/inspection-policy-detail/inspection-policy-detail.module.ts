import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionPolicyDetailComponent } from './inspection-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { InspectionPolicyDetailResolver } from '@modules/inspection-policies/resolvers/inspection-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: InspectionPolicyDetailComponent,
    resolve: {
      dataResolved: InspectionPolicyDetailResolver,
    },
  },
];

@NgModule({
  declarations: [InspectionPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule, SharedModule],
})
export class InspectionPolicyDetailModule {}
