import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY } from './auth.reducer';
import { IAuthState } from '@shared/auth.models';

export const authFeature = createFeatureSelector<IAuthState>(AUTH_FEATURE_KEY);

export const isAuthenticated = createSelector(authFeature, (state) => state.isAuthenticated);

export const isAuthLoaded = createSelector(authFeature, (state) => state.isAuthLoaded);
export const selectAuthUpdateInfoStep = createSelector(authFeature, (state) => state.authUpdateInfoStep);

export const selectToken = createSelector(authFeature, (state) => state.token);

export const selectAuth = createSelector(authFeature, (state) => state.auth);

export const selectShowModalVerifyAgreementAndUpdateDocument = createSelector(
  authFeature,
  (state) => state.showModalVerifyAgreementAndUpdateDocument,
);

export const selectUser = createSelector(authFeature, (state) => state.user);

export const selectUserRole = createSelector(authFeature, (state) => state.user?.adminRole);

export const selectBusinessType = createSelector(authFeature, (state) => state.user?.businessType);
