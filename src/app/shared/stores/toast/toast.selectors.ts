import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TOAST_FEATURE_KEY } from '@shared/stores';
import { IToastState } from '@shared/models';

export const toastFeature = createFeatureSelector<IToastState>(TOAST_FEATURE_KEY);

export const selectToast = createSelector(toastFeature, (state) => state);
