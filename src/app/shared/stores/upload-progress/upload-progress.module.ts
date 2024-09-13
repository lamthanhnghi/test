import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { UPLOAD_PROGRESS_FEATURE_KEY, uploadProgressReducer } from '.';
import { EffectsModule } from '@ngrx/effects';
import { UploadProgressEffects } from './upload-progress.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(UPLOAD_PROGRESS_FEATURE_KEY, uploadProgressReducer),
    EffectsModule.forFeature([UploadProgressEffects]),
  ],
  exports: [],
  providers: [],
})
export class UploadProgressModule {}
