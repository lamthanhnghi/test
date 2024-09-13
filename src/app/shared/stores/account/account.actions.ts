import { createAction, props } from '@ngrx/store';
import {
  IAddAgreementPayload,
  IAgreement,
  IForgotPasswordCreatePassword,
  IForgotPasswordCreatePasswordResponse,
  IForgotPasswordSendOtp,
  IForgotPasswordResendOtpEmail,
  IForgotPasswordVerifyOtp,
  IForgotPasswordVerifyOtpResponse,
  IResendOtp,
  IResendOtpResponse,
  ISignUp,
  ISignUpEmail,
  ISignUpResponse,
  IUpdateInfo,
  IUpdateInfoPersonalAccount,
  IVerifyOtp,
  IVerifyOtpResponse,
} from '@shared/models';
import { eBusinessTypes } from '@shared/enums';

export const setInitialState = createAction(
  '[Auth/API] Set Initial State',
  props<{ phone: string; email: string; countryCode: string }>(),
);
export const handleError = createAction('[Auth/API] Handle Error', props<{ error: any }>());
export const signUpPhone = createAction('[Auth/API] SignUp Phone', props<{ payload: ISignUp }>());

export const signUpEmail = createAction('[Auth/API] SignUp Email', props<{ payload: ISignUpEmail }>());

export const signUpSuccess = createAction('[Auth/API] SignUp Success', props<{ response: ISignUpResponse }>());

export const signUpFailureSellerExisted = createAction(
  '[Auth/API] SignUp Failure User Existed',
  props<{ sellerLogin: string }>(),
);

export const verifyOtp = createAction('[Auth/API] Verify OTP', props<{ payload: IVerifyOtp }>());

export const verifyOtpSuccess = createAction(
  '[Auth/API] Verify OTP Success',
  props<{ response: IVerifyOtpResponse }>(),
);

export const resendOtp = createAction('[Auth/API] Resend OTP', props<{ payload: IResendOtp }>());

export const resendOtpSuccess = createAction('[Auth/API] Resend OTP Success');

export const forgotPasswordResendOtp = createAction(
  '[Auth/API] Forgot Password Resend OTP Phone',
  props<{ payload: IForgotPasswordSendOtp }>(),
);

export const forgotPasswordResendOtpEmail = createAction(
  '[Auth/API] Forgot Password Resend OTP Email',
  props<{ payload: IForgotPasswordResendOtpEmail }>(),
);

export const forgotPasswordResendOtpSuccess = createAction(
  '[Auth/API] Forgot Password Resend OTP Success',
  props<{ response: IResendOtpResponse }>(),
);

export const forgotPasswordVerifyOtp = createAction(
  '[Auth/API] Forgot Password Verify OTP',
  props<{ payload: IForgotPasswordVerifyOtp }>(),
);

export const forgotPasswordVerifyOtpSuccess = createAction(
  '[Auth/API] Forgot Password Verify OTP Success',
  props<{ response: IForgotPasswordVerifyOtpResponse }>(),
);

export const forgotPasswordCreatePassword = createAction(
  '[Auth/API] Forgot Password Create Password',
  props<{ payload: IForgotPasswordCreatePassword }>(),
);

export const forgotPasswordCreatePasswordSuccess = createAction(
  '[Auth/API] Forgot Password Create Password Success',
  props<{ response: IForgotPasswordCreatePasswordResponse }>(),
);

export const updateInfoPersonalAccount = createAction(
  '[Auth/API] Update Info Personal Account',
  props<{ payload: IUpdateInfoPersonalAccount }>(),
);

export const updateInfoSuccess = createAction(
  '[Auth/API] Update Info Success',
  props<{ businessType: eBusinessTypes }>(),
);

export const uploadDocumentPersonalAccount = createAction(
  '[Auth/API] Upload Document Personal Account',
  props<{ payload: FormData }>(),
);

export const updateInfoBusiness = createAction('[Auth/API] Update Info Business', props<{ payload: IUpdateInfo }>());

export const uploadDocumentBusiness = createAction(
  '[Auth/API] Upload Document Business',
  props<{ payload: FormData }>(),
);

export const loadAgreement = createAction('[Auth/API] Load Agreement');

export const loadAgreementSuccess = createAction(
  '[Auth/API] Load Agreement Success',
  props<{ response: IAgreement }>(),
);

export const addAgreement = createAction('[Auth/API] Add Agreement', props<{ payload: IAddAgreementPayload }>());

export const clearState = createAction('[Auth/API] Clear State');
