import { ILoginResponse, IProfile } from '.';
import { eRoles } from '@shared/enums';

export interface AuthEntity {
  id: string | number; // Primary ID
  name: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  showModalVerifyAgreementAndUpdateDocument: boolean;
  authUpdateInfoStep: number;
  token: string;
  auth?: ILoginResponse;
  user?: IProfile;
  error: any;
}

export interface IVerifyActiveEmailToken {
  adminID: string;
  adminLoginID: string;
  uuid: string;
}

export interface ICreateActiveEmailPasswordPayload {
  adminID: string;
  password: string;
  uuid: string;
}

export interface IDecodedToken {
  sellerID: string;
  sellerLogin: string;
  accountType: number;
  token: string;
  role: eRoles;
  iat?: number;
  exp?: number;
}
