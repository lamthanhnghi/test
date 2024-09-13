import { eAccountPage, eBusinessTypes } from '@shared/enums';
import { IAgreement, ISignUpResponse, IVerifyOtpState } from '@shared/seller.model';

/**
 * Interface for the 'Account' data
 */
export interface IAccountState {
  page: eAccountPage;
  phone: string;
  email: string;
  verified: boolean;
  countryCode: string;
  signUpResponse?: ISignUpResponse;
  verifyOtpState?: IVerifyOtpState;
  data?: any;
  sellerLogin?: string;
  businessType?: eBusinessTypes;
  agreement?: IAgreement;
}
