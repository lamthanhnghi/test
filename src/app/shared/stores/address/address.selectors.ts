import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ADDRESS_FEATURE_KEY,
  cityAdapter,
  CityEntity,
  districtAdapter,
  DistrictEntity,
  IAddressState,
} from './address.reducer';

// Lookup the 'Address' feature state managed by NgRx
export const selectAddressState = createFeatureSelector<IAddressState>(ADDRESS_FEATURE_KEY);

export const selectCitiesState = createSelector(selectAddressState, (state: IAddressState) => state.cities);

export const selectDistrictsState = createSelector(selectAddressState, (state: IAddressState) => state.districts);

const citySelectAll = cityAdapter.getSelectors().selectAll;

const citySelectEntities = cityAdapter.getSelectors().selectEntities;

const districtSelectAll = districtAdapter.getSelectors().selectAll;

const districtSelectEntities = districtAdapter.getSelectors().selectEntities;

export const selectCloseModal = createSelector(selectAddressState, (state: IAddressState) => state.closeModal);

export const selectCityIsLoading = createSelector(selectCitiesState, (state: CityEntity) => state.isLoading);

export const selectCityError = createSelector(selectCitiesState, (state: CityEntity) => state.error);

export const selectAllCities = createSelector(selectCitiesState, (state: CityEntity) => citySelectAll(state));

export const selectCityEntities = createSelector(selectCitiesState, (state: CityEntity) => citySelectEntities(state));

export const selectSelectedCityId = createSelector(selectCitiesState, (state: CityEntity) => state.selectedCityId);

export const selectDistrictIsLoading = createSelector(selectDistrictsState, (state: DistrictEntity) => state.isLoading);

export const selectDistrictError = createSelector(selectDistrictsState, (state: DistrictEntity) => state.error);

export const selectAllDistricts = createSelector(selectDistrictsState, (state: DistrictEntity) =>
  districtSelectAll(state),
);

export const selectSelectedAddress = createSelector(
  selectAddressState,
  (state: IAddressState) => state.selectedAddress,
);

export const selectDistrictEntities = createSelector(selectDistrictsState, (state: DistrictEntity) =>
  districtSelectEntities(state),
);
