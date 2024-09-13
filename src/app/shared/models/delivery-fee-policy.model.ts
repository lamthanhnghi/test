export interface IDeliveryFeePolicyItem {
  deliveryPricePolicyID: string;
  title?: string;
  content?: string;
  version?: string;
  isDefault?: number;
  maxLength?: number;
  maxWidth?: number;
  maxHeight?: number;
  maxWeight?: number;
  expressPercent?: number;
  fastPercent?: number;
  savingPercent?: number;
  expressMinPrice?: number;
  fastMinPrice?: number;
  savingMinPrice?: number;
  additionalSizeFee?: number;
  additionalWeightFee?: number;
  contentStatus?: number;
  updatedDate?: string;
  haveStatusDate?: string;
}

export interface IDeliveryFeePolicyPayload {
  deliveryPricePolicyID: string;
  title?: string;
  content?: string;
  version?: string;
  isDefault?: number;
  maxLength?: number;
  maxWidth?: number;
  maxHeight?: number;
  maxWeight?: number;
  expressPercent?: number;
  fastPercent?: number;
  savingPercent?: number;
  expressMinPrice?: number;
  fastMinPrice?: number;
  savingMinPrice?: number;
  additionalSizeFee?: number;
  additionalWeightFee?: number;
  contentStatus?: number;
  updatedDate?: string;
  haveStatusDate?: string;
}

export enum eDeliveryFeePolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Version = 'version',
  IsDefault = 'isDefault',
  MaxLength = 'maxLength',
  MaxWidth = 'maxWidth',
  MaxHeight = 'maxHeight',
  MaxWeight = 'maxWeight',
  ExpressPercent = 'expressPercent',
  FastPercent = 'fastPercent',
  SavingPercent = 'savingPercent',
  ExpressMinPrice = 'expressMinPrice',
  FastMinPrice = 'fastMinPrice',
  SavingMinPrice = 'savingMinPrice',
  AdditionalSizeFee = 'additionalSizeFee',
  AdditionalWeightFee = 'additionalWeightFee',
  ApplyDate = 'applyDate',
  ContentStatus = 'contentStatus',
  UpdatedDate = 'updatedDate',
  HaveStatusDate = 'haveStatusDate',
}
