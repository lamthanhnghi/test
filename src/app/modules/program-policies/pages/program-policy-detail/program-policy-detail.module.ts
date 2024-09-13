import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramPolicyDetailComponent } from './program-policy-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { programPolicyDetailResolver } from '@modules/program-policies/resolvers/program-policy-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProgramPolicyDetailComponent,
    resolve: { dataResolved: programPolicyDetailResolver },
  },
];

@NgModule({
  declarations: [ProgramPolicyDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, ItemDetailMasterLayoutModule],
})
export class ProgramPolicyDetailModule {}
