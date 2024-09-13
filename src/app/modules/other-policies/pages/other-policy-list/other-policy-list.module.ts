import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherPolicyListComponent } from '@modules/other-policies/pages/other-policy-list/other-policy-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: '',
    component: OtherPolicyListComponent,
  },
];

@NgModule({
  declarations: [OtherPolicyListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, ItemListMasterLayoutModule],
})
export class OtherPolicyListModule {}
