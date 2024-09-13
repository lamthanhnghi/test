import { createFeatureSelector, createSelector } from '@ngrx/store';
import { countriesAdapter, countriesFeatureKey, CountriesState } from './countries.reducer';

const { selectAll } = countriesAdapter.getSelectors();
export const selectCountriesState = createFeatureSelector<CountriesState>(countriesFeatureKey);

export const selectAllCountries = createSelector(selectCountriesState, (state) => selectAll(state));
