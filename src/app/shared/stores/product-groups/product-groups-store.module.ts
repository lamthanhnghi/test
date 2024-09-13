import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PRODUCT_GROUPS_FEATURE_KEY, ProductGroupsEffects, productGroupsReducer } from '.';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreModule.forFeature(PRODUCT_GROUPS_FEATURE_KEY, productGroupsReducer),
    EffectsModule.forFeature(ProductGroupsEffects),
  ],
  exports: [],
  declarations: [],
  providers: [ProductGroupsEffects],
})
export class ProductGroupsStoreModule {}
