import { createAction, props } from '@ngrx/store';
import { eLoadingKey } from '@shared/enums';

export const startLoading = createAction('[Loading] Start Loading');
export const stopLoading = createAction('[Loading] Stop Loading');

export const startLoadingCount = createAction('[Loading] Start Loading Count');
export const stopLoadingCount = createAction('[Loading] Stop Loading Count');
export const startLoadingFrom = createAction('[Loading] Start Loading From', props<{ key: eLoadingKey }>());
export const stopLoadingFrom = createAction('[Loading] Start Loading From', props<{ key: eLoadingKey }>());
