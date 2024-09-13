import { NgModule } from '@angular/core';
import { UpdateInformationGeneralComponent } from './update-information-general.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [UpdateInformationGeneralComponent],
  exports: [UpdateInformationGeneralComponent],
})
export class UpdateInformationGeneralModule {}
