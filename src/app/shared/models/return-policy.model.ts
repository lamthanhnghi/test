import { eContentStatuses } from '@shared/enums';

export interface IReturnPolicyItem {
  returnPolicyID?: string;
  title?: string;
  content?: string;
  notes: string;
  applyDate?: string;
  version?: string;
  contentStatus?: eContentStatuses;
  updatedDate?: string;
  haveStatusDate?: string;
}

export enum eReturnPolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Notes = 'notes',
  ApplyDate = 'applyDate',
  Version = 'version',
  ContentStatus = 'contentStatus',
}

export interface IReturnPolicyPayload {
  returnPolicyID?: string; // required when update
  title: string;
  content: string;
  notes: string;
  applyDate: string;
  version: string;
}
