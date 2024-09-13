import { createAction, props } from '@ngrx/store';
import {
  IGetDistrictsByCityIdPayload,
  IPagination,
  ISelectedAddress,
} from '@shared/models';

export const closeAddressModal = createAction('[Address/Store] Hide Address Modal');

export const loadCities = createAction('[Address/API] Load Cities', props<{ payload?: IPagination }>());

export const loadCitiesSuccess = createAction('[Location/Effect] Load Cities Success', props<{ data: any }>());

export const loadCitiesFailure = createAction('[Address/API] Load Cities Failure', props<{ error: any }>());

export const loadDistricts = createAction(
  '[Address/API] Load Districts',
  props<{ payload: IGetDistrictsByCityIdPayload }>(),
);

export const loadDistrictsSuccess = createAction('[Location/Effect] Load Districts Success', props<{ data: any }>());

export const loadDistrictsFailure = createAction('[Address/API] Load Districts Failure', props<{ error: any }>());

export const submitAddress = createAction('[Address/Store] Submit Address', props<{ data: ISelectedAddress }>());

export const clearAllAddress = createAction('[Address/Store] Clear All Address');
