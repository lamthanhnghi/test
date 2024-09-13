import { eContentStatuses } from '@shared/enums';

export interface IPaymentPolicyItem {
  paymentPolicyID?: string;
  title?: string;
  content?: string;
  notes: string;
  applyDate?: string;
  version?: string;
  contentStatus?: eContentStatuses;
  updatedDate?: string;
  haveStatusDate?: string;
}

export enum ePaymentPolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Notes = 'notes',
  ApplyDate = 'applyDate',
  Version = 'version',
  ContentStatus = 'contentStatus',
}

export interface IPaymentPolicyPayload {
  paymentPolicyID?: string; // required when update
  title: string;
  content: string;
  notes: string;
  applyDate: string;
  version: string;
}
