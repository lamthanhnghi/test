import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProduct.PRODUCT_FEATURE_KEY, fromProduct.productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
})
export class ProductStoreModule {}
