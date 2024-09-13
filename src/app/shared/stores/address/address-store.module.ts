import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAddress from './address.reducer';
import { AddressEffects } from './address.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAddress.ADDRESS_FEATURE_KEY, fromAddress.addressReducer),
    EffectsModule.forFeature([AddressEffects]),
  ],
})
export class AddressModalDataAccessModule {}
