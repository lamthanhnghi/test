import { eContentStatuses } from '@shared/enums';

export interface IAgreementItem {
  agreementID?: string;
  agreementName?: string;
  agreementContent?: string;
  agreementNotes?: string;
  agreementType?: number;
  version?: string;
  isDefault?: number;
  agreementStatus?: number;
  agreementCreatedDate?: null;
  agreementApprovedDate?: null;
  agreementRejectedDate?: null;
  agreementPendingDate?: null;
  agreementArchivedDate?: null;
  contentStatus?: eContentStatuses;
  applyDate?: string;
}

export interface IAgreementPayload {
  agreementID?: string;
  agreementName: string;
  agreementContent: string;
  agreementType?: number; // required when create
  agreementVersion: string;
  agreementNotes: string;
  applyDate: string;
}

export enum eAgreementFormKeys {
  AgreementName = 'agreementName',
  AgreementContent = 'agreementContent',
  AgreementType = 'agreementType',
  AgreementVersion = 'agreementVersion',
  AgreementNotes = 'agreementNotes',
  AgreementAppliedDate = 'applyDate',
  AgreementStatus = 'agreementStatus',
}
