import { IPagination } from '@shared/pagination.model';
import { eContentStatuses } from '@shared/enums';

export interface IBank {
  bankID: string;
  logo: string;
  name: string;
  shortName: string;
  code: string;
  updateDate: string;
  contentStatus: eContentStatuses;
}

export enum eBankFormKeys {
  Icon = 'mediaIDForLogo',
  Name = 'name',
  ShortName = 'shortName',
  Code = 'code',
  ContentStatus = 'contentStatus',
}

export interface IGetBankListPayload extends IPagination {}

export interface IGetBankDetailPayload {
  bankID: string;
}

export interface ICreateBankPayload {
  mediaIDForLogo: string;
  name: string;
  shortName: string;
  code: string;
}

export interface IUpdateBankPayload extends ICreateBankPayload {
  bankID: string;
}

export interface IDeleteBankPayload {
  bankID: string;
}
