import {
  eContentStatuses,
  eProgramGiftBase,
  eProgramGiftTypes,
  eProgramType,
  eProgramTypes,
  eTimeStatuses
} from '@shared/enums';
import { IPagination } from '@shared/pagination.model';
import { Media } from '@shared/requesting-profile.model';
import { IMedia } from '@shared/media.model';
import { IFilterBase, ISellerApprovalInfo } from '@shared/common.model';
import { IProductAttribute } from '@shared/product.model';
import { ISaleUnit } from '@shared/sale-unit.model';

export interface IRequestingProgram {
  programID: string;
  createdDate: string;
  hasReviewRequest?: boolean;
  contentStatus: eContentStatuses;
  startValidDate: string;
  endValidDate: string;
  publishedDate: string;
  programValue: number;
  title: string;
  description: string;
  shortDescription: any;
  notes: string;
  sellerID: string;
  linkString: string;
  mediaID: string;
  certificates: any[];
  seller: RequestingSeller;
  status: IProgramStatus;
}

export interface IRequestingProgramDetail {
  programID: string;
  createdDate: string;
  updatedDate: any;
  startValidDate: string;
  endValidDate: string;
  publishedDate: string;
  programValue: number;
  contentStatus: number;
  programMethod: any;
  programType: eProgramType;
  isPublished: number;
  title: string;
  description: string;
  shortDescription: any;
  notes: string;
  sellerID: string;
  linkString: string;
  mediaID: string;
  certificates: Media[];
  programGift: IProgramGift;
  productSKUs: ProductSku[];
  seller: RequestingSeller;
  status: IProgramStatus;
}

export interface IProgramGift {
  programID?: string;
  programGiftType?: number;
  programGiftValue?: number;
  programGiftBase?: number;
  programGiftMinPurchaseQuantity?: number;
  programGiftMinOrderPrice?: number;
  programGiftDescription?: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface ProductSku {
  SKUID: string;
  productName: string;
  linkString: string;
  productShortDescription: string;
  mediaID: string;
}

export interface RequestingSeller {
  sellerID: string;
  businessName: string;
  businessCode: string;
}

export interface IProgramStatus {
  handlerID: string;
  objectID: string;
  reason: string;
  statusDate: string;
  statusID: string;
}

export interface IGetRequestingProgramListPayload extends IPagination {
  contentStatus: eContentStatuses;
}

export interface IGetRequestingProgramDetailPayload {
  programID: string;
}

export interface ISetRequestingProgramStatusPayload {
  programID: string;
  reason?: string;
}

export interface IApprovingProgramCountingData {
  data: {
    status: eContentStatuses;
    count: number;
  }[];
}

export enum eProgramFormKeys {
  programID = 'programID',
  coverMediaID = 'coverMediaID',
  coverString = 'coverString',
  createdDate = 'createdDate',
  contentStatus = 'contentStatus',
  startValidDate = 'startValidDate',
  endValidDate = 'endValidDate',
  publishedDate = 'publishedDate',
  title = 'title',
  description = 'description',
  linkString = 'linkString',
  mediaID = 'mediaID',
  programType = 'programType',
  productSKUIDs = 'productSKUIDs',
  programGiftType = 'programGiftType',
  programGiftBase = 'programGiftBase',
  programGiftValue = 'programGiftValue',
  programGiftMinPurchaseQuantity = 'programGiftMinPurchaseQuantity',
  programGiftMinOrderPrice = 'programGiftMinOrderPrice',
  programGiftDescription = 'programGiftDescription',
  programValue = 'programValue',
}

export interface IProgram extends ISellerApprovalInfo {
  programID?: string;
  createdDate?: string;
  contentStatus?: eContentStatuses | any;
  startValidDate?: string;
  endValidDate?: string;
  publishedDate?: string;
  programType?: eProgramTypes;
  title?: string;
  description?: string;
  shortDescription?: null;
  linkString?: string;
  mediaID?: string;
  programGift?: IProgramGift;
  programValue?: number;
  certificates?: IMedia[];
  productSKUs?: IProgramProductSKU[];
  status?: IProgramStatus;
}

export interface IProgramGift {
  programID?: string;
  programGiftType?: number;
  programGiftValue?: number;
  programGiftBase?: number;
  programGiftMinPurchaseQuantity?: number;
  programGiftMinOrderPrice?: number;
  programGiftDescription?: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface IProgramCount {
  status: eContentStatuses;
  count: number;
}

export interface IProgramPagination extends IPagination {
  sortBy?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: eTimeStatuses;
  contentStatus?: eContentStatuses;
}

export interface IProgramFilter extends IFilterBase {
  sortBy?: string;
  effectStatus?: eTimeStatuses;
}

export interface IProgramManagePayload {
  languageCode?: string;
  coverMediaID?: string;
  certificateMediaID?: string;
  title?: string;
  description?: string;
  startValidDate?: string;
  endValidDate?: string;
  publishedDate?: string;
  programType?: eProgramTypes;
  amount?: number;
  productSKUIDs?: string[];
  programGiftType?: eProgramGiftTypes;
  programGiftBase?: eProgramGiftBase;
  programGiftValue?: number;
  programGiftMinPurchaseQuantity?: number;
  programGiftMinOrderPrice?: number;
  programGiftDescription?: string;
}

export interface IProgramProduct {
  productID: string;
  localizedProductVersionID?: string;
  productName?: string;
  productDescription?: string;
  productShortDescription?: string;
  productVersionID?: string;
  productVersionContentStatus?: eContentStatuses;
  createdDate?: string;
  updatedDate?: string;
  productAvatars?: IMedia[];
  productSKU: IProgramProductSKU;
}

export interface IProgramProductSKU {
  productName?: string;
  productPublishName?: string;
  productShortDescription?: string;
  productSKUID: string;
  productID: string;
  productVersionID?: string;
  productSKUCode?: string;
  productSKUName?: string;
  linkString?: string;
  mediaID?: string;
  price?: number;
  priceBefore?: number;
  attributes?: IProductAttribute[];
  saleUnit?: ISaleUnit;
}

export interface IProgramProductPagination extends IPagination {
  programID: string;
  excludeSKUIDs?: string[];
}
