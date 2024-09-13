import { IPagination } from '@shared/pagination.model';
import { Media } from '@shared/requesting-profile.model';
import { eContentStatuses } from '@shared/enums';

export interface IProductGroup {
  productGroupID: string;
  groupName: string;
  groupShortName: string;
  description: string;
  notes: string;
  createdDate: string;
  updatedDate: string;
  image: Media;
  contentStatus: eContentStatuses;
}

export enum eProductGroupFormKeys {
  Icon = 'mediaId',
  Name = 'groupName',
  ShortName = 'groupShortName',
  Description = 'description',
  ContentStatus = 'contentStatus',
}

export interface IGetProductGroupListPayload extends IPagination {}

export interface IGetProductGroupDetailPayload {
  productGroupID: string;
}

export interface ICreateProductGroupPayload {
  languageCode: string;
  categoryName: string;
  categoryShortName: string;
  description: string;
  notes: string;
  mediaID: string;
}

export interface IUpdateProductGroupPayload extends ICreateProductGroupPayload {
  productGroupID: string;
}

export interface IDeleteProductGroupPayload {
  productCategoryID: string;
}
