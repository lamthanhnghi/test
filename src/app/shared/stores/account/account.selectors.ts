import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ACCOUNT_FEATURE_KEY } from '@shared/stores';
import { IAccountState } from '@shared/models';

export const selectAccountState = createFeatureSelector<IAccountState>(ACCOUNT_FEATURE_KEY);

export const selectAll = createSelector(selectAccountState, (state: IAccountState) => state);

export const selectPage = createSelector(selectAccountState, (state: IAccountState) => state.page);

export const selectSignUpResponse = createSelector(selectAccountState, (state: IAccountState) => state.signUpResponse);

export const selectSellerLogin = createSelector(selectAccountState, (state: IAccountState) => state.sellerLogin);

export const selectVerifyOtpState = createSelector(selectAccountState, (state: IAccountState) => state.verifyOtpState);

export const getAgreement = createSelector(selectAccountState, (state: IAccountState) => state.agreement);
