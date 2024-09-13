import {
  eContentStatuses,
  eAccountStatus,
  ePackedUnitType,
  eReportType,
  eReportUserType,
  eReportContentStatus
} from '@shared/enums';
import { ISeller } from '@shared/users.model';

export interface IEnumOption {
  label: string;
  value: any;
}

export interface ApiResponse<T> {
  result: T;
  message: string;
  statusCode: number;
}

export interface IFilterBase {
  pageIndex: number;
  pageSize: number;
  total: number;
  contentStatus?: eContentStatuses;
  accountStatus?: eAccountStatus;
  packedUnitType?: ePackedUnitType;
  dateRange?: Date[]
  search?: string;
  sortField?: string | undefined;
  sortOrder?: string | undefined;
  orderBy?: string | undefined;
  filter?: { key: string; value: string[] }[];
}

export interface ISellerApprovalInfo {
  seller?: ISeller;
  submittedDate?: string;
}

export interface IApprovalStatusBase {
  contentStatus: eContentStatuses;
  status?: IReasonStatus;
  submittedDate?: string;
  updatedDate?: string
}

export interface IReasonStatus {
  handlerID: string;
  objectID: string;
  reason: string;
  statusDate: string;
  statusID: string;
}
