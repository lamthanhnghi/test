import { NgModule } from '@angular/core';
import { UploadDocumentComponent } from './upload-document.component';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { AccountMasterLayoutModule } from '@modules/account/components';
import { SharedModule } from '@shared/shared.module';

register();

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UploadDocumentComponent,
      },
    ]),
    AccountMasterLayoutModule,
  ],
  declarations: [UploadDocumentComponent],
  exports: [UploadDocumentComponent],
})
export class UploadDocumentModule {}
