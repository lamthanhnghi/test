import { eContentStatuses } from '@shared/enums';

export interface IShippingPolicyItem {
  deliveryPolicyID?: string;
  title?: string;
  content?: string;
  notes: string;
  applyDate?: string;
  version?: string;
  contentStatus?: eContentStatuses;
  updatedDate?: string;
  haveStatusDate?: string;
}

export enum eShippingPolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Notes = 'notes',
  ApplyDate = 'applyDate',
  Version = 'version',
  ContentStatus = 'contentStatus',
}

export interface IShippingPolicyPayload {
  deliveryPolicyID?: string; // required when update
  title: string;
  content: string;
  notes: string;
  applyDate: string;
  version: string;
}
