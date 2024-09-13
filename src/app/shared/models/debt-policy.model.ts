import { eDebtCyclePeriods } from '@shared/enums';

export interface IDebtPolicyItem {
  debtPolicyID?: string;
  title?: string;
  version?: string;
  content?: string;
  debtCycle?: number;
  debtCyclePeriod?: eDebtCyclePeriods;
  firstDayOfPeriod?: number;
  reconciliationTime?: number;
  paymentDueDate?: number;
  applyDate?: string;
  contentStatus?: number;
  updatedDate?: string;
  haveStatusDate?: string;
}

export interface IDebtPolicyPayload {
  debtPolicyID?: string; // required for update
  title?: string;
  version?: string;
  content?: string;
  debtCycle?: number;
  firstDayOfPeriod?: number;
  reconciliationTime?: number;
  paymentDueDate?: number;
  applyDate?: string;
}

export enum eDebtPolicyFormKeys {
  Title = 'title',
  Content = 'content',
  Version = 'version',
  IsDefault = 'isDefault',
  DebtCycle = 'debtCycle',
  DebtCyclePeriod = 'debtCyclePeriod',
  FirstDayOfPeriod = 'firstDayOfPeriod',
  ReconciliationTime = 'reconciliationTime',
  PaymentDueDate = 'paymentDueDate',
  ApplyDate = 'applyDate',
  ContentStatus = 'contentStatus',
}
