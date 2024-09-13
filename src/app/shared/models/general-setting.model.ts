import { eContentStatuses } from '@shared/enums';

export interface IGeneralSettingListItem {
  adSettingID?: string;
  version?: string;
  contentStatus?: eContentStatuses | any;
  isDefault?: number;
  createdDate?: string;
  updatedDate?: string;
  rejectedNotes?: string;
  approvedAdminID?: string;
  updatedDescription?: string;
}

export interface IGeneralSettingDetail extends IGeneralSettingListItem {
  approvedAdminID?: string;
  dateApply?: string;
  intervalToExpireOTP?: number;
  intervalToExpireToken?: number;
  intervalToCountFreOTP?: number;
  numberOTPToExceedLimitation?: number;
  intervalToUnlockOTPLimitation?: number;
  autoCancelOrderDuration?: number;
  intervalForCountingHotProducts?: number;
  maxHotProductsShowing?: number;
  maxProgramValueToReview?: number;
  datePending?: string;
  dateApproved?: string;
  dateRejected?: string;
  dateArchived?: string;
}

export enum eGeneralSettingAuthenticationFormKeys {
  version = 'version',
  updatedDescription = 'updatedDescription',
  intervalToExpireToken = 'intervalToExpireToken',
  intervalToExpireOTP = 'intervalToExpireOTP',
  numberOTPToExceedLimitation = 'numberOTPToExceedLimitation',
  intervalToCountFreOTP = 'intervalToCountFreOTP',
  intervalToUnlockOTPLimitation = 'intervalToUnlockOTPLimitation',
  applyDate = 'applyDate',
  autoCancelOrderDuration = 'autoCancelOrderDuration',
  intervalForCountingHotProducts = 'intervalForCountingHotProducts',
  maxHotProductsShowing = 'maxHotProductsShowing',
  autoCompleteOrder = 'autoCompleteOrder',
  rangeTimeForRatingProduct = 'rangeTimeForRatingProduct',
  maxProductHot = 'maxProductHot',
  maxProductBestSeller = 'maxProductBestSeller',
  maxNewProducts = 'maxNewProducts',
  maxProductGoodPriceToday = 'maxProductGoodPriceToday',
  maxFeaturedSeller = 'maxFeaturedSeller',
  maxProgramShowing = 'maxProgramShowing',
  contentStatus = 'contentStatus',
}

export interface IManageGeneralSetting {
  adSettingID?: string; // for update
  version: string;
  adminChangeDescription: string;
  adminSettingsIntervalToExpireToken: number;
  adminSettingsIntervalToExpireOTP: number;
  adminSettingsNumberOTPToExceedLimitation: number;
  adminSettingsIntervalToCountFreOTP: number;
  adminSettingsIntervalToUnlockOTPLimitation: number;
  adminSettingsDateApply: string;
  adminSettingsContentStatus: eContentStatuses;
}
