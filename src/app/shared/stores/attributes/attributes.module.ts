import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ATTRIBUTES_FEATURE_KEY, AttributesEffects, attributesReducer } from '.';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreModule.forFeature(ATTRIBUTES_FEATURE_KEY, attributesReducer),
    EffectsModule.forFeature(AttributesEffects),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AttributesModule {}
