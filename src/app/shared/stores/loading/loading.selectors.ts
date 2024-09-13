import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOADING_FEATURE_KEY } from '@shared/stores';
import { ILoadingState } from '@shared/models';

export const getLoadingState = createFeatureSelector<ILoadingState>(LOADING_FEATURE_KEY);

export const getGlobalLoading = createSelector(getLoadingState, (state) => state.isLoading);

export const getLoadingCount = createSelector(getLoadingState, (state) => state.loadingCount > 0);

export const getLoading = createSelector(getLoadingState, (state) => state);
