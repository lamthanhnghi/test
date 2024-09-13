import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from '@shared/stores';
import { PROFILE_FEATURE_KEY, profileReducer } from '@shared/stores';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(PROFILE_FEATURE_KEY, profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class ProfileStoreModule {}
