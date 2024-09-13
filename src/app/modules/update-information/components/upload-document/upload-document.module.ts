import { NgModule } from '@angular/core';
import { UploadDocumentComponent } from './upload-document.component';
import { register } from 'swiper/element/bundle';
import { AccountMasterLayoutModule } from '@modules/account/components';
import { SharedModule } from '@shared/shared.module';
import { UploadProgressModule } from '@shared/stores';

register();

@NgModule({
  imports: [SharedModule, AccountMasterLayoutModule, UploadProgressModule],
  declarations: [UploadDocumentComponent],
  exports: [UploadDocumentComponent],
})
export class UploadDocumentModule {}
