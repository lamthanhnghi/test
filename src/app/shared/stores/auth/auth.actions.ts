import { createAction, props } from '@ngrx/store';
import { ILoginRequest, IProfile } from '@shared/models';
import { eUpdateInfoStep } from '@shared/enums';

export const loadAuthFailure = createAction('[Auth/API] Load Auth Failure', props<{ error: any }>());

// signin

export const signIn = createAction('[Auth/API] SignIn', props<{ payload: ILoginRequest }>());

export const signInSuccess = createAction('[Auth/API] Login Success');

export const authSuccess = createAction('[Auth/API] Auth Success', props<{ redirect: boolean }>());
export const authUpdateInfoStep = createAction('[Auth/API] Auth Success', props<{ step: eUpdateInfoStep }>());

export const getTokenSuccessAndRetrieveUserProfile = createAction(
  '[Auth/API] Get Token Success And Retrieve User Profile',
  props<{ token: string; isRedirectAfterLogin?: boolean }>(),
);

/** indicate that auth is fully loaded */
export const authLoaded = createAction('[Auth/API] Auth Loaded');

/** indicate that user has agreed term of use and updated info */
export const showModalVerifyAgreementAndUpdateDocument = createAction(
  '[Auth/API] Auth Show Modal Verify Agreement And Update Document',
);

export const loginError = createAction('[Auth/API] Login Failure', props<{ error: any }>());

export const setToken = createAction('[Auth/API] Set Token', props<{ token: string }>());

export const getUser = createAction('[Auth/API] Get User');

export const setUser = createAction('[Auth/API] Set User', props<{ user: IProfile }>());

export const logout = createAction('[Auth/API] Logout', props<{ isCallApi: boolean }>());
