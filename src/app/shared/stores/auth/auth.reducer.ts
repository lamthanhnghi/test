import * as AuthActions from './auth.actions';
import { IAuthState } from '@shared/auth.models';
import { Action, createReducer, on } from '@ngrx/store';

export const AUTH_FEATURE_KEY = 'auth';

export const initialState: IAuthState = {
  isAuthenticated: false,
  isAuthLoaded: false,
  showModalVerifyAgreementAndUpdateDocument: false,
  authUpdateInfoStep: 1,
  token: '',
  auth: undefined,
  user: undefined,
  error: undefined,
};

const reducer = createReducer(
  initialState,
  // on(AuthActions.signInSuccess, (state) => ({ ...state, isAuthenticated: true })),
  on(AuthActions.authSuccess, (state) => ({ ...state, isAuthenticated: true })),
  on(AuthActions.authUpdateInfoStep, (state, { step }) => ({ ...state, authUpdateInfoStep: step })),
  on(AuthActions.authLoaded, (state) => ({ ...state, isAuthLoaded: true })),
  on(AuthActions.showModalVerifyAgreementAndUpdateDocument, (state) => ({
    ...state,
    showModalVerifyAgreementAndUpdateDocument: true,
  })),
  on(AuthActions.setToken, (state, { token }) => ({ ...state, token })),
  on(AuthActions.setUser, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    isAuthLoaded: false,
    token: '',
    user: undefined,
  })),
);

export function authReducer(state: IAuthState | undefined, action: Action) {
  return reducer(state, action);
}
