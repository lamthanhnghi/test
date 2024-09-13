import { Action, createReducer, on } from '@ngrx/store';

import * as AccountActions from './account.actions';
import { IAccountState } from '@shared/models';
import { eAccountPage } from '@shared/enums';

export const ACCOUNT_FEATURE_KEY = 'account';

export const initialAccountState: IAccountState = {
  page: eAccountPage.Login,
  phone: '',
  email: '',
  verified: false,
  countryCode: '',
  signUpResponse: undefined,
  verifyOtpState: undefined,
  data: undefined,
  sellerLogin: undefined,
  businessType: undefined,
};

const reducer = createReducer(
  initialAccountState,
  on(AccountActions.setInitialState, (state, { phone, countryCode, email }) => ({
    ...state,
    phone: phone, // when signup, payload.sellerLogin is phone number
    countryCode: countryCode,
    email: email,
  })),
  on(AccountActions.signUpSuccess, (state, { response }) => ({
    ...state,
    page: eAccountPage.SignupVerifyOtp,
    signUpResponse: response,
    verifyOtpState: {
      sellerID: response.sellerID,
      uuid: response.uuid,
      phone: state.phone,
      countryCode: state.countryCode,
    },
  })),
  on(AccountActions.signUpFailureSellerExisted, (state, { sellerLogin }) => ({
    ...state,
    page: eAccountPage.Login,
    sellerLogin: sellerLogin,
  })),
  on(AccountActions.verifyOtpSuccess, (state, { response }) => ({
    ...state,
    page: eAccountPage.SignupUpdateInfo,
    verifyOtpResponse: response,
    verified: true,
  })),
  on(AccountActions.forgotPasswordResendOtpSuccess, (state, { response }) => ({
    ...state,
    page: eAccountPage.ForgotVerifyOtp,
    forgotPasswordResendOtpResponse: response,
    verifyOtpState: {
      adminID: response.result.adminID,
      uuid: response.result.uuid,
      phone: state.phone,
      countryCode: state.countryCode,
    },
  })),
  on(AccountActions.forgotPasswordVerifyOtpSuccess, (state, { response }) => ({
    ...state,
    page: eAccountPage.ForgotVerifyOtp,
    forgotPasswordResendOtpResponse: response,
    verifyOtpState: {
      adminID: response.result.adminID,
      uuid: response.result.uuid,
      phone: state.phone,
      verified: true,
      countryCode: state.countryCode,
    },
  })),
  on(AccountActions.forgotPasswordCreatePasswordSuccess, (state, { response }) => ({
    ...state,
    page: eAccountPage.Login,
    sellerLogin: state.phone || state.email,
  })),
  on(AccountActions.updateInfoSuccess, (state, { businessType }) => ({
    ...state,
    businessType,
  })),
  on(AccountActions.loadAgreementSuccess, (state, { response }) => ({ ...state, agreement: response })),
  on(AccountActions.clearState, () => initialAccountState),
);

export function accountReducer(state: IAccountState | undefined, action: Action) {
  return reducer(state, action);
}
