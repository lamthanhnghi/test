import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { countriesFeature } from './countries.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CountriesEffects } from './countries.effects';

@NgModule({
  imports: [StoreModule.forFeature(countriesFeature), EffectsModule.forFeature([CountriesEffects])],
  exports: [],
  declarations: [],
  providers: [],
})
export class CountriesStoreModule {}
