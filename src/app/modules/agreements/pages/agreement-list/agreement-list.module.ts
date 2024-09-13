import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgreementListComponent } from './agreement-list.component';
import { SharedModule } from '@shared/shared.module';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SelectAgreementTypeModalComponent } from '@modules/agreements/components/select-agreement-type-modal/select-agreement-type-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AgreementListComponent,
  },
];

@NgModule({
  declarations: [AgreementListComponent, SelectAgreementTypeModalComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemListMasterLayoutModule],
})
export class AgreementListModule {}
