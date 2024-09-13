import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CountriesActions } from '@shared/stores';
import { ICountry } from '@shared/models';

export const countriesFeatureKey = 'countries';

export interface CountriesState extends EntityState<ICountry> {
  // additional entities state properties
}

export const countriesAdapter: EntityAdapter<ICountry> = createEntityAdapter<ICountry>({
  selectId: (country: ICountry) => country.countryID,
});

const initialState: CountriesState = countriesAdapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(CountriesActions.loadCountriesSuccess, (state, { countries }) => countriesAdapter.setAll(countries, state)),
);

export const countriesFeature = createFeature({
  name: countriesFeatureKey,
  reducer,
});
