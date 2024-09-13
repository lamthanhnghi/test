import { IKeyword, IProductSKU } from '@shared/product.model';
import { IProductCategory } from '@shared/product-categories.model';
import { IProductGroup } from '@shared/product-functional-groups.model';
import { eContentStatuses } from '@shared/enums';
import { IMedia } from '@shared/media.model';
import { IProgramStatus } from '@shared/program.model';

export interface ISellerRequestingProduct {
  productAvatars?: IProductAvatar[];
  productDescription?: string;
  productID?: string;
  productName?: string;
  productPublishName?: string;
  productShortDescription?: string;
  productVersionContentStatus?: number;
  productVersionID?: string;
  updatedDate?: Date;
  hasReviewRequest?: boolean;
  seller?: ISeller;
}

export interface IProductAvatar {
  description?: string;
  linkString?: string;
  mediaID?: string;
  mediaType: number;
  objectRefID?: string;
  objectRefType?: number;
  title?: string;
}

export interface IGetSellerRequestingProductDetailPayload {
  productID: string;
  productVersionID: string;
}

export interface IProductDetail {
  brandName?: string;
  locShortDescription?: string;
  localizedProductVersionID?: string;
  producerName?: string;
  keyWords?: IKeyword[];
  productAvatars?: IMedia[];
  productCategory?: IProductCategory;
  productContentStatus?: number;
  productDescription?: string;
  productGroupID?: string;
  productID: string;
  productMadeIn?: string;
  productName?: string;
  productNotes?: string;
  productGroup?: IProductGroup;
  productSKUs?: IProductSKU[];
  productSlogan?: string;
  productType?: number;
  productVersionContentStatus?: number;
  productVersionID: string;
  sellerID?: string;
  slug?: string;
  status: IProgramStatus[];
  seller?: ISeller;
}

export interface ISeller {
  businessCode?: string;
  businessName?: string;
  sellerID?: string;
  contactFullName?: string;
  linkString?: string;
  userType?: number;
}

export interface IApprovalItem {
  status: number;
  count: number;
}

export interface IRequestingProductStatus {
  productVersionContentStatus?: eContentStatuses;
  reason?: string;
  productVersionID: string;
  productID: string;
}

export interface ISetRequestProductStatusPayload {
  productID: string;
  productVersionID: string;
  reason?: string;
}
