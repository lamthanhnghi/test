import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyListComponent } from './privacy-policy-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyListComponent,
  },
];

@NgModule({
  declarations: [PrivacyPolicyListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, ItemListMasterLayoutModule],
})
export class PrivacyPolicyListModule {}
