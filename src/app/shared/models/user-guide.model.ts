import { IPagination } from '@shared/pagination.model';
import { eContentStatuses, eUserTypes } from '@shared/enums';

export interface IUserGuide {
  userGuideID: string;
  title: string;
  content: string;
  notes: string;
  version: string;
  contentStatus: eContentStatuses;
  updatedDate: string;
  haveStatusDate: string;
  userGuideType?: eUserTypes;
}

export enum eUserGuideFormKeys {
  Title = 'title',
  Content = 'content',
  Notes = 'notes',
  Version = 'version',
  ContentStatus = 'contentStatus',
  UserGuideType = 'userGuideType',
}

export interface IGetUserGuideListPayload extends IPagination {
  userGuideType?: eUserTypes;
}

export interface IGetUserGuideDetailPayload {
  userGuideID: string;
}

export interface ICreateUserGuidePayload {
  title: string;
  content: string;
  notes: string;
  version: string;
}

export interface IUpdateUserGuidePayload extends ICreateUserGuidePayload {
  userGuideID: string;
}

export interface IDeleteUserGuidePayload {
  userGuideID: string;
}
