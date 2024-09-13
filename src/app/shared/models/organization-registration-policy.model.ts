import { eContentStatuses } from '@shared/enums';

export interface IOrganizationRegistrationPolicyItem {
  organizationRegistrationPolicyID?: string;
  title?: string;
  content?: string;
  description: string;
  applyDate?: string;
  version?: string;
  contentStatus?: eContentStatuses;
  updatedDate?: string;
  haveStatusDate?: string;
}

export enum eOrganizationRegistrationPolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Notes = 'description',
  ApplyDate = 'applyDate',
  Version = 'version',
  ContentStatus = 'contentStatus',
}

export interface IOrganizationRegistrationPolicyPayload {
  organizationRegistrationPolicyID?: string; // required when update
  title: string;
  content: string;
  description: string;
  applyDate: string;
  version: string;
}
