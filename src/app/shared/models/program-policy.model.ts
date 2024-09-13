import { IPagination } from '@shared/pagination.model';
import { eContentStatuses } from '@shared/enums';

export interface IProgramPolicy {
  programPolicyID: string;
  title: string;
  content: string;
  programApprovalThreshold: number;
  version: string;
  contentStatus: eContentStatuses;
  updatedDate: string;
  haveStatusDate: string;
}

export enum eProgramPolicyFormKeys {
  Title = 'title',
  Threshold = 'programApprovalThreshold',
  Notes = 'notes',
  Content = 'content',
  Version = 'version',
  DateApply = 'applyDate',
  ContentStatus = 'contentStatus',
}

export interface IGetProgramPolicyListPayload extends IPagination {}

export interface IGetProgramPolicyDetailPayload {
  programPolicyID: string;
}

export interface ICreateProgramPolicyPayload {
  title: string;
  content: string;
  programApprovalThreshold: number;
  version: string;
}

export interface IUpdateProgramPolicyPayload extends ICreateProgramPolicyPayload {
  programPolicyID: string;
}

export interface IDeleteProgramPolicyPayload {
  programPolicyID: string;
}
