import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramPolicyListComponent } from './program-policy-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProgramPolicyListComponent,
  },
];

@NgModule({
  declarations: [ProgramPolicyListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ItemListMasterLayoutModule, SharedModule],
})
export class ProgramPolicyListModule {}
