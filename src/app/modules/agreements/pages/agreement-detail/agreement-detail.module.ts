import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { agreementDetailResolver } from '@modules/agreements/resolvers/agreement-detail.resolver';
import { AgreementDetailComponent } from '@modules/agreements/pages/agreement-detail/agreement-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AgreementDetailComponent,
    resolve: { dataResolved: agreementDetailResolver },
  },
];

@NgModule({
  declarations: [AgreementDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemDetailMasterLayoutModule],
})
export class AgreementDetailModule {}
