import { eContentStatuses } from '@shared/enums';

export interface IInspectionPolicyItem {
  checkGoodsPolicyID?: string;
  title?: string;
  content?: string;
  notes: string;
  applyDate?: string;
  version?: string;
  contentStatus?: eContentStatuses;
  updatedDate?: string;
  haveStatusDate?: string;
}

export enum eInspectionPolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Notes = 'notes',
  ApplyDate = 'applyDate',
  Version = 'version',
  ContentStatus = 'contentStatus',
}

export interface IInspectionPolicyPayload {
  checkGoodsPolicyID?: string; // required when update
  title: string;
  content: string;
  notes: string;
  applyDate: string;
  version: string;
}
