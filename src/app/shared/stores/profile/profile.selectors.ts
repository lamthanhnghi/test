import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROFILE_FEATURE_KEY, ProfileState } from './profile.reducer';

// Lookup the 'Profile' feature state managed by NgRx
export const selectProfileState = createFeatureSelector<ProfileState>(PROFILE_FEATURE_KEY);
export const selectProfileLoaded = createSelector(selectProfileState, (state: ProfileState) => state.loaded);
export const selectProfile = createSelector(selectProfileState, (state: ProfileState) => state.data);

export const selectProfileDocuments = createSelector(selectProfileState, (state: ProfileState) => state.documents);

export const selectFirstDocument = createSelector(selectProfileState, (state: ProfileState) => state.documents?.[0]);

export const selectCountDocuments = createSelector(selectProfileState, (state: ProfileState) => state.count);
