import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as AddressActions from './address.actions';
import { ICity, IDistrict, ISelectedAddress } from '@shared/models';

export const ADDRESS_FEATURE_KEY = 'address';

export interface IAddressState {
  closeModal: boolean;
  selectedAddress?: ISelectedAddress;
  cities: CityEntity;
  districts: DistrictEntity;
}

export interface CityEntity extends EntityState<ICity> {
  selectedCityId?: string | number; // which City record has been selected
  isLoading: boolean;
  error?: string | null; // last known error (if any)
}

export interface DistrictEntity extends EntityState<IDistrict> {
  selectedDistrictId?: string | number; // which District record has been selected
  isLoading: boolean;
  error?: string | null; // last known error (if any)
}

export const cityAdapter: EntityAdapter<ICity> = createEntityAdapter<ICity>({
  selectId: (city: ICity) => city.cityID,
});

export const districtAdapter: EntityAdapter<IDistrict> = createEntityAdapter<IDistrict>({
  selectId: (district: IDistrict) => district.districtID,
});

export const initialCitiesState: CityEntity = cityAdapter.getInitialState({
  // set initial required properties
  isLoading: false,
});

export const initialDistrictsState: DistrictEntity = districtAdapter.getInitialState({
  // set initial required properties
  isLoading: false,
});

const initialAddressState: IAddressState = {
  closeModal: false,
  selectedAddress: undefined,
  cities: initialCitiesState,
  districts: initialDistrictsState,
};

const reducer = createReducer(
  initialAddressState,
  on(AddressActions.closeAddressModal, (state) => ({
    ...state,
    closeModal: true,
    cities: cityAdapter.removeAll(state.cities),
    districts: districtAdapter.removeAll(state.districts),
  })),
  on(AddressActions.loadCities, (state) => ({
    ...state,
    cities: cityAdapter.setAll([], { ...state.cities, isLoading: true }),
  })),
  on(AddressActions.loadCitiesSuccess, (state, { data }) => ({
    ...state,
    cities: cityAdapter.setAll(data.results, { ...state.cities, isLoading: false }),
  })),
  on(AddressActions.loadCitiesFailure, (state, { error }) => ({
    ...state,
    cities: { ...state.cities, error, isLoading: false },
  })),
  on(AddressActions.loadDistricts, (state) => ({
    ...state,
    districts: districtAdapter.setAll([], { ...state.districts, isLoading: true }),
  })),
  on(AddressActions.loadDistrictsSuccess, (state, { data }) => ({
    ...state,
    districts: districtAdapter.setAll(data.results, { ...state.districts, isLoading: false }),
  })),
  on(AddressActions.loadDistrictsFailure, (state, { error }) => ({
    ...state,
    districts: { ...state.districts, error, isLoading: false },
  })),
  on(AddressActions.submitAddress, (state, { data }) => ({
    ...state,
    closeModal: false,
    selectedAddress: data,
  })),
  on(AddressActions.clearAllAddress, (state) => ({
    ...state,
    closeModal: false,
    selectedAddress: undefined,
    cities: cityAdapter.removeAll(state.cities),
    districts: districtAdapter.removeAll(state.districts),
  })),
);

export function addressReducer(state: IAddressState | undefined, action: Action) {
  return reducer(state, action);
}
