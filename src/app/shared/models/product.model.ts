import {
  eContentStatuses,
  eProductEventStatuses,
  eProductTypes,
  eSizeUnits,
  eVolumeUnits,
  eWeightUnits,
} from '@shared/enums';
import { IMedia } from './media.model';
import { IPagination } from './pagination.model';
import { IProductCategory } from './product-categories.model';
import { IProductGroup } from './product-functional-groups.model';
import { IBrand } from '@shared/brand.model';
import { ISaleUnit } from '@shared/sale-unit.model';
import { ISeller } from '@shared/users.model';

export interface IProductEvent {
  id?: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: eProductEventStatuses;
  image?: string;
}

export interface IProductCreatePayload {
  languageID: number;
  name: string;
  slogan: string;
  shortDescription: string;
  description: string;
  notes: string;
  keyWords: IKeyword[];
  productCategoryID: string;
  productGroupID: string;
  vat: number;
  madeInCountryID: string;
  productType: eProductTypes;
  producerName: string;
  slug: string;
  isShow: 0 | 1;
  productID: string;
  avatarMediaIDS: string[];
  productSKUs: string[];
}

export interface IProductUpdatePayload {
  languageID: number;
  name: string;
  slogan: string;
  shortDescription: string;
  description: string;
  notes: string;
  keyWords: IKeyword[];
  productCategoryID: string;
  productGroupID: string;
  vat: number;
  madeInCountryID: string;
  productType: eProductTypes;
  producerName: string;
  slug: string;
  isShow: 0 | 1;
  productID: string;
  avatarMediaIDS: string[];
  productSKUs: string[];
}

export interface IKeyword {
  keyWordID?: string;
  keyWordName?: string;
}

export interface IProductCreateResponse {
  productID: string;
  productVersionID: string;
}

export interface IProduct {
  productVersionID: string;
  productID: string;
  sellerID?: string;
  localizedProductVersionID?: string;
  productName?: string;
  productPublishName?: string;
  productSlogan?: string;
  locShortDescription?: null;
  productDescription?: string;
  productNotes?: string;
  productGroupID?: null;
  productMadeIn?: string;
  productMadeInName?: string;
  productType?: null;
  producerName?: string;
  brandName?: IBrand;
  brandNameID?: string;
  registerNo?: string;
  slug?: null;
  productVersionContentStatus?: number;
  productContentStatus?: number;
  productAvatars?: IMedia[];
  productGenuineDocuments?: IMedia[];
  productCategory?: IProductCategory;
  productGroup?: IProductGroup;
  productSKUs?: IProductSKU[];
  keyWords?: any[];
  seller?: ISeller;
  submittedDate?: string;
  deliveryMethods?: string; // ex: 10,20,30
  isVerify?: boolean;
}

export interface IProductSKU {
  productSKUID: string;
  productID: string;
  productVersionID?: string;
  productSKUName?: string;
  productSKUCode?: string;
  productRegisteredNo?: string;
  attributes?: IProductAttribute[];
  skuMedias?: IMedia[];
  skuCertificates?: IMedia[];
  weight?: number;
  weightUnit?: eWeightUnits;
  volume?: number;
  volumeUnit?: eVolumeUnits;
  sizeWidth?: number;
  sizeHeight?: number;
  sizeLength?: number;
  sizeUnit?: eSizeUnits;
  saleUnit?: ISaleUnit;
}

export interface IProductAttribute {
  attributeID: string;
  attributeValueID?: string;
  attributeName?: string;
  attributeValueName?: string;
  locAttributeName?: string;
  locAttributeDescription?: string;
  locAttributeValueName?: string;
  locAttributeValueDescription?: string;
}

export interface IProductListItem {
  productID: string;
  localizedProductVersionID?: string;
  productName?: string;
  productDescription?: string;
  productShortDescription?: string;
  productVersionID?: string;
  productAvatars?: IMedia[];
}

export interface IProductPagination extends IPagination {
  contentStatus: eContentStatuses;
  languageCode: string;
  productCategoryID?: string;
  productGroupID?: string;
}

export interface IProductCheckUpdatePayload {
  productID: string;
  productVersionID: string;
  confirmPending: string;
}
