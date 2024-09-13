import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEmailModal from './email-modal.reducer';
import { EmailModalEffects } from '@shared/email/email-modal.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromEmailModal.EMAIL_MODAL_FEATURE_KEY, fromEmailModal.emailModalReducer),
    EffectsModule.forFeature([EmailModalEffects]),
  ],
})
export class DataAccessModule {}
