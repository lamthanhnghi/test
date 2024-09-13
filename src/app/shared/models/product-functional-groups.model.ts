import { Media } from '@shared/requesting-profile.model';
import { eContentStatuses } from '@shared/enums';

/**
 * Interface for the 'ProductFunctionalGroups' data
 */
export interface IProductGroup {
  productGroupID: string;
  productGroupName: string;
  localizedProductGroupID: string;
  locGroupName: string;
  locDescription?: string;
  locNotes?: string;
  orderNo?: number
}

export interface IProductGroupItem {
  productGroupID?: string;
  productGroupName?: string;
  productGroupShortName?: string;
  productGroupDescription?: string;
  notes?: string;
  createdDate?: string;
  updatedDate?: string;
  contentStatus?: eContentStatuses;
  image?: Media;
  orderNo?: number
}

export interface IProductGroupPayload {
  languageCode: string;
  groupName: string;
  groupShortName: string;
  description: string;
  notes: string;
  mediaID: string;
}

export enum eProductGroupFormKeys {
  MediaID = 'mediaID',
  GroupName = 'productGroupName',
  GroupShortName = 'productGroupShortName',
  Description = 'description',
  ContentStatus = 'contentStatus',
  OrderNo = 'orderNo'
}
