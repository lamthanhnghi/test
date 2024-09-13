import { IPagination } from '@shared/pagination.model';
import { eContentStatuses } from '@shared/enums';

export interface ISellerRequestingProfile {
  sellerProfileID: string;
  sellerID: string;
  businessCode: string;
  businessName: string;
  contactFullName: string;
  approvalDate: string;
  contentStatus: eContentStatuses;
  address: Address[];
  sellerAvatar: Avatar;
}

export interface IApprovalItemCountingData {
  countPending: number;
  countReview: number;
  countReject: number;
  countApproval: number;
}

export interface ISellerRequestingProfileDetail {
  sellerProfileID: string;
  sellerID: string;
  businessCode: string;
  businessName: string;
  phoneID: any;
  emailID: any;
  cityID: string;
  districtID: string;
  address: string;
  website: string;
  duns: string;
  postalCode: string;
  contactFullName: string;
  slogan: any;
  contactEmail: string;
  contactPhone: string;
  contactUrl: any;
  aboutInfo: any;
  businessType: any;
  contentStatus: eContentStatuses;
  coverID: any;
  avatarID: any;
  createdDate: string;
  updatedDate: any;
  deletedAt: any;
  addresses: Address[];
  emails: Email[];
  phones: Phone[];
  urls: Url[];
  avatar: Avatar;
  cover: Cover;
  businessMedia: Media[];
  certificatesMedia: Media[];
  statusData: Status;
}

export interface Status {
  statusDate: string;
  statusHanderID: string;
  statusHanderName: string;
  statusReason: string;
}

export interface Url {
  urlID: string;
  urlString: string;
  isDefault: number;
}

export interface Email {
  emailID: string;
  emailAddress: string;
  emailLabel: string;
  isDefault: number;
  isVerify: number;
}

export interface Address {
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
}

export interface Phone {
  phoneID: string;
  phoneNo: string;
  extendNumber: any;
  phoneLabel: string;
  phoneArea: any;
  countryArea: any;
  isDefault: number;
  isVerify: number;
}

export interface Avatar {
  avatarID: string;
  avatarLink: string;
}

export interface Media {
  linkString: string;
  mediaID: string;
  mediaFileType?: 'pdf' | 'image';
}

export interface Cover {
  coverID: string;
  coverLink: string;
}

export interface IGetSellerRequestingProfileListPayload extends IPagination {
  contentStatus: eContentStatuses;
  productCategoryID?: string;
  productGroupID?: string;
}

export interface ISetSellerRequestingProfileStatus {
  sellerProfileID: string;
  contentStatus?: eContentStatuses;
  reason?: string;
  sellerID?: string;
}

export interface IGetSellerRequestingProfileDetailPayload {
  sellerProfileID: string;
}

export interface IFeedbackPayload {
  isOk: boolean;
  message: string;
}
