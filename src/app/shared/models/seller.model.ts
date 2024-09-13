import { FormControl } from '@angular/forms';
import { eBusinessTypes, ePidTypes } from '@shared/enums';

export interface ILoginRequest {
  adminLogin: string;
  password: string;
  deviceToken: string;
  deviceID: string;
  type: string;
}

export interface ILoginResponse {
  message: string;
  result: { token: string; adminID: string; adminLogin: string; accountType: number };
  statusCode: number;
}

export interface ISignUp {
  sellerLogin: string;
}

export interface ISignUpEmail {
  sellerLogin: string;
}

export interface ISignUpResponse {
  sellerID: string;
  uuid: string;
  sellerLogin: string;
  today: string;
  expired: string;
}

export interface IVerifyOtp {
  adminID?: string;
  sellerID?: string;
  uuid: string;
  otp: string;
}

export interface IVerifyOtpState {
  adminID?: string;
  sellerID?: string;
  uuid: string;
  phone: string;
  countryCode: string;
}

export interface IVerifyOtpResponse {
  sellerID: string;
  sellerLogin: string;
  uuid: string;
}

export interface IResendOtp {
  sellerID: string;
  phone: string;
}

export interface IResendOtpEmail {
  sellerID: string;
  email: string;
}

export interface IForgotPasswordSendOtp {
  adminLogin: string;
}

export interface IForgotPasswordResendOtpEmail {
  adminLogin: string;
}

export interface IResendOtpResponse {
  message: string;
  result: { adminID: string; uuid: string; adminLogin: string; otp: string; today: string; expired: string };
  statusCode: number;
}

export interface IForgotPasswordVerifyOtp {
  adminID: string;
  uuid: string;
  otp: string;
}

export interface IForgotPasswordVerifyOtpResponse {
  message: string;
  result: { adminID: string; uuid: string; adminLogin: string; otp: string; today: string; expired: string };
  statusCode: number;
}

export interface IForgotPasswordCreatePasswordResponse {
  adminID: string;
  adminLogin: string;
}

export interface IForgotPasswordCreatePassword {
  adminID: string;
  uuid: string;
  password: string;
}

export interface IFormUpdateInfoIndividual {
  contactFullName: FormControl<string>;
  pIDType: FormControl<ePidTypes | ''>;
  pID: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  address: FormControl<string>;
  website: FormControl<string | ''>;
  postalCode: FormControl<string>;
}

export interface IUpdateInfoPersonalAccount {
  contactFullName: string;
  pIDType: ePidTypes | '';
  pID: string;
  email: string;
  phone: string;
  address: string;
  website: string | '';
  postalCode: string;
}

export interface IUpdateInfoPersonalResponse {
  contactFullName: string;
  pIDType: ePidTypes | '';
  pID: string;
  email: string;
  phone: string;
  address: string;
  website: string | '';
  postalCode: string;
}

export interface IFormUpdateInfoBusiness {
  businessID: FormControl<string>;
  businessName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  address: FormControl<string>;
  website: FormControl<string | ''>;
  postalCode: FormControl<string>;
  contactFullName: FormControl<string>;
  contactEmail: FormControl<string>;
  contactPhone: FormControl<string>;
  contactUrl: FormControl<string>;
}

export interface IUpdateInfo {
  businessCode: string;
  businessName: string;
  email: string;
  phone: string;
  cityID: string;
  districtID: string;
  address: string;
  website: string;
  duns: string;
  postalCode: string;
  contactFullName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface IUpdateInfoCompanyResponse {
  contactFullName: string;
  pIDType: ePidTypes | '';
  pID: string;
  email: string;
  phone: string;
  address: string;
  website: string | '';
  postalCode: string;
}

export interface IAgreement {
  agreementID: string;
  title: string;
  content: string;
  notes: string;
  version: string;
}

export interface IAddAgreementPayload {
  agreementID: string;
}

export interface ICheckSellerLogin {
  sellerLogin: string;
}

export interface ICreatePassword {
  adminID?: string;
  sellerID?: string;
  uuid: string;
  password: string;
  type: string;
}

export interface ICreatePasswordResponse {
  accountType: eBusinessTypes;
  adminID: string;
  adminLogin: string;
  token: string;
}
