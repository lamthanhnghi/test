import { EntityState } from '@ngrx/entity';
import { IPagination } from '@shared/pagination.model';
import { Media } from '@shared/requesting-profile.model';
import { eContentStatuses } from '@shared/enums';
import { IAttribute } from '@shared/stores';

/**
 * Interface for the 'ProductCategories' data
 */
export interface IProductCategory {
  productCategoryID?: string;
  categoryName?: string;
  productCategoryName?: string;
  categoryShortName?: string;
  description?: string;
  notes?: string;
  createdDate?: string;
  updatedDate?: string;
  image?: Media; // not used
  productGroupName?: string;
  productGroupID?: string;
  contentStatus?: eContentStatuses;
  subCategories?: IProductCategory[];
  parentCategory?: IProductCategory; // client only
  attributes?: IAttribute[];
}

export enum eProductCategoryFormKeys {
  Icon = 'mediaID',
  Name = 'categoryName',
  ShortName = 'categoryShortName',
  SubCategories = 'subCategories',
  Description = 'description',
  ContentStatus = 'contentStatus',
  ProductGroup = 'productGroup',
  Attributes = 'attributes',
}

export interface ProductCategoriesState extends EntityState<IProductCategory> {
  selectedId?: string | number; // which ProductCategories record has been selected
  loaded: boolean; // has the ProductCategories list been loaded
  error?: string | null; // last known error (if any)
}

export interface IGetProductCategoryListPayload extends IPagination {}

export interface IGetProductCategoryDetailPayload {
  productCategoryID: string;
}

export interface IProductCategoryPayload {
  languageCode: string;
  categoryName: string;
  categoryShortName: string;
  description: string;
  productGroupID: string;
  subCategoryList?: { categoryName: string }[];
  attributeList: { attributeID: string }[];
}

export interface IDeleteProductCategoryPayload {
  productCategoryID: string;
}
