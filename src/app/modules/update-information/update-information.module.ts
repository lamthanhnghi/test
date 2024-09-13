import { NgModule } from '@angular/core';
import { UpdateInformationComponent } from './update-information.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { leaveGuard } from '@core/guards';
import { UpdateInformationGeneralModule } from './components/update-information-general/update-information-general.module';
import { UploadDocumentModule } from './components/upload-document/upload-document.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UpdateInformationComponent,
        canDeactivate: [leaveGuard],
      },
    ]),
    UpdateInformationGeneralModule,
    UploadDocumentModule,
  ],
  declarations: [UpdateInformationComponent],
  exports: [UpdateInformationComponent],
})
export class UpdateInformationModule {}
