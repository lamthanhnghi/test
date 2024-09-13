import { IPagination } from '@shared/pagination.model';
import { eContentStatuses } from '@shared/enums';

export interface IPrivacyPolicy {
  privacyPolicyID: string;
  title: string;
  content: string;
  notes: string;
  version: string;
  contentStatus: eContentStatuses;
  updatedDate: string;
  haveStatusDate: string;
}

export enum ePrivacyPolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Notes = 'notes',
  Version = 'version',
  DateApply = 'applyDate',
  ContentStatus = 'contentStatus',
}

export interface IGetPrivacyPolicyListPayload extends IPagination {}

export interface IGetPrivacyPolicyDetailPayload {
  privacyPolicyID: string;
}

export interface ICreatePrivacyPolicyPayload {
  title: string;
  content: string;
  notes: string;
  version: string;
}

export interface IUpdatePrivacyPolicyPayload extends ICreatePrivacyPolicyPayload {
  privacyPolicyID: string;
}

export interface IDeletePrivacyPolicyPayload {
  privacyPolicyID: string;
}
