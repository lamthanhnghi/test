import { NgModule } from '@angular/core';
import { UpdateInfoIndividualComponent } from './update-info-individual.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [UpdateInfoIndividualComponent],
  exports: [UpdateInfoIndividualComponent],
})
export class UpdateInfoIndividualModule {}
