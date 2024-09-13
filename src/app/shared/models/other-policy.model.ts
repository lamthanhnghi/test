import { eContentStatuses } from '@shared/enums';

export interface IOtherPolicyItem {
  otherPolicyID?: string;
  title?: string;
  content?: string;
  notes: string;
  applyDate?: string;
  version?: string;
  contentStatus?: eContentStatuses;
  updatedDate?: string;
  haveStatusDate?: string;
}

export enum eOtherPolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Notes = 'notes',
  ApplyDate = 'applyDate',
  Version = 'version',
  ContentStatus = 'contentStatus',
}

export interface IOtherPolicyPayload {
  otherPolicyID?: string; // required when update
  title: string;
  content: string;
  notes: string;
  applyDate: string;
  version: string;
}
