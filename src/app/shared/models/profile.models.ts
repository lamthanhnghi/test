import {
  eAccountStatus,
  eAddressLabels,
  eBusinessTypes,
  eContentStatuses,
  eDefaultStatus,
  ePhoneLabels,
  eRoles,
} from '@shared/enums';
import { McUploadFile } from './mc-upload-file.model';
import { IMedia } from './media.model';
import { Avatar, Cover } from '@shared/requesting-profile.model';

/**
 * Interface for the 'Profile' data
 */
export interface IProfile {
  sellerID: string;
  sellerLoginID: string;
  businessID: string;
  businessName: string;
  contactFullName: string;
  slogan: string;
  gender: string;
  pID: string;
  createdDate: string;
  accountType: number;
  accountStatus: eAccountStatus;
  businessType: eBusinessTypes;
  userType: number;
  contactEmail: string;
  contactPhone: string;
  contactUrl: string;
  addresses: IAddress[];
  emails: IEmail[];
  phones: IPhone[];
  urls: IUrl[];
  adminID: string;
  adminCode: string;
  adminFullName: string;
  adminRole: eRoles;
  adminAvatar: Avatar;
  adminCover: Cover;
}
export interface IUpdateCoverResponse {
  status?: number;
  message?: string;
  sellerCover?: string;
  sellerID?: string;
}

export interface IUpdateAvatarResponse {
  status?: number;
  message?: string;
  sellerAvatar?: string;
  sellerID?: string;
}

export interface IUploadProfileDocument {
  businessMediaIDS: string[];
  certificatesMediaIDS: string[];
}

export interface IAddress {
  addressID: string;
  districtID: string;
  cityID: string;
  addressLabel: string;
  sellerID: string;
  addressString: string;
  postalCode: string;
  isDefault: number;
  cityName: string;
  districtName: string;
  latitude: string;
  longitude: string;
  addressUrl: string;
}

export interface IUpdateProfilePayload {
  adminFullName?: string;
  adminCode?: string;
  passwordOld?: string;
  passwordNew?: string;
}

export interface IAddAddressPayload {
  cityID: string;
  districtID: string;
  addressLabel: eAddressLabels;
  addressString: string;
  latitude?: string;
  longitude?: string;
  postalCode?: string;
  isDefault: number;
}

export interface IUpdateAddressPayload {
  addressID: string;
  cityID: string;
  districtID: string;
  addressLabel: eAddressLabels;
  addressString: string;
  latitude?: string;
  longitude?: string;
  postalCode?: string;
  isDefault: number;
}

export interface IDeleteAddressPayload {
  addressID: string;
}

// Email
export interface IAddEmailPayload {
  emailAddress: string;
  emailLabel: number;
  isDefault: number;
}

export interface IAddEmailResponse {
  result: IAddEmailResult;
}

export interface IAddEmailResult {
  sellerID?: string;
  uuid?: string;
  emailID?: string;
  emailAddress?: string;
  today?: string;
  expired?: string;
}

export interface IVerifyEmailPayload {
  emailID: string;
  uuid: string;
  otp: string;
}

export interface IUpdateEmailPayload extends IAddEmailPayload {
  emailID: string;
}

export interface IResendOtpEmailPayload {
  emailID: string;
}

export interface IDeleteEmailPayload {
  emailID: string;
}

export interface IEmail {
  emailID: string;
  emailAddress: string;
  emailLabel: number;
  isDefault: eDefaultStatus;
}

// Phone

export interface IAddPhonePayload {
  phoneNo: string;
  phoneLabel: ePhoneLabels;
  isDefault: number;
}

export interface IAddPhoneResponse {
  result: IAddPhoneResult;
}

export interface IAddPhoneResult {
  sellerID?: string;
  uuid?: string;
  phoneID?: string;
  phone?: string;
  today?: string;
  expired?: string;
}

export interface IUpdatePhonePayload extends IAddPhonePayload {
  phoneID: string;
}

export interface IVerifyPhonePayload {
  phoneID: string;
  uuid: string;
  otp: string;
}

export interface IPhone {
  phoneID: string;
  phoneNo: string;
  extendNumber: string;
  phoneLabel: number;
  phoneArea: string;
  countryArea: string;
  isDefault: number;
  isVerify: number;
}

export interface IResendOtpPhonePayload {
  phoneID: string;
}

export interface IDeletePhonePayload {
  phoneID: string;
}

// Url

export interface IAddUrlPayload {
  urlString: string;
  isDefault: number;
}

export interface IUpdateUrlPayload extends IAddUrlPayload {
  urlID: string;
}

export interface IDeleteUrlPayload {
  urlID: string;
}

export interface IUrl {
  urlID: string;
  urlString: string;
  isDefault: eDefaultStatus;
}

export interface IContactInfoPayload {
  contactFullName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactUrl?: string;
}

export interface IUpdateSellerLoginIDPayload {
  newLoginID: string;
}

export interface IUpdateSellerLoginIDResponse {
  result: IUpdateSellerLoginIDResult;
}

export interface IUpdateSellerLoginIDResult {
  sellerID?: string;
  uuid?: string;
  today?: string;
  expired?: string;
}

export interface IGetProfileDocumentParams {
  contentStatus: eContentStatuses;
}

export interface IProfileDocument {
  mediaHistoryID: string;
  fileFront: IMedia;
  fileBack: IMedia;
  fileOther: IMedia[];
  fileLicense: IMedia[];
  reason?: string;
}

export interface IProfileDocumentData {
  mediaHistoryID?: string;
  pidFront: McUploadFile[];
  pidBack: McUploadFile[];
  businessLicenses: McUploadFile[];
  otherFiles: McUploadFile[];
}

export interface IChangeContentStatusPayload {
  mediaHistoryID: string;
  contentStatus: number;
  reason?: string;
}

export interface IProfileDocumentResult {
  mediaHistoryID: string;
}

export interface IDeleteDocumentPayload {
  mediaHistoryID: string;
}

export interface ICountDocument {
  totalNew: number;
  totalPending: number;
  totalReviewing: number;
  totalRejected: number;
  totalApproval: number;
  totalArchived: number;
}
