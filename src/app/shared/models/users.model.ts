import { IPagination } from '@shared/pagination.model';
import { eRoles, eAccountStatus } from '@shared/enums';
import { IAddress, IEmail, IPhone } from '@shared/profile.models';

export interface IGetUserListPayload extends IPagination {
  accountStatus?: eAccountStatus;
}

export interface ISetPasswordPayload {
  adminID: string;
  uuid: string;
  password: string;
}

export interface IUserCountingData {
  countAll: number;
  countBlock: number;
  countActive: number;
}

export interface IUser {
  adminID: string;
  adminCode: string;
  adminFullName: string;
  accountStatus: eAccountStatus;
  adminRole: eRoles;
  cover?: { coverID: string; coverLink: string };
  avatar?: { avatarID: string; avatarLink: string };
  createdDate: Date;
  emails: IEmail[];
  addresses: IAddress[];
  phones: IPhone[];
}

export interface IVerifyTokenEmailPayload {
  adminID: string;
}

export interface IVerifyTokenEmailResponse {
  adminID: string;
  adminLoginID: string;
  uuid: string;
}

export interface IAddUserModalSubmitPayload {
  isOk: boolean;
  name: string;
  code: string;
  loginID: string;
  role: eRoles;
}

export interface IAddPackingUnitModalSubmitPayload {
  isOk: boolean;
  name: string;
}

export interface IEditUserModalSubmitPayload {
  isOk: boolean;
  name: string;
  userID: string;
  loginID: string;
  password: string;
}

export interface IAddUserPayload {
  adminFullName: string;
  adminCode: string;
  adminLogin: string;
  adminRole: eRoles;
}

export interface IUpdateAdminStatusPayload {
  adminID: string;
  accountStatus: eAccountStatus;
}

export interface IUpdateUserPayload {
  adminID: string;
  adminFullName?: string;
  adminCode?: string;
  password?: string;
  role?: eRoles;
}

export interface ISeller {
  businessCode?: string;
  businessName?: string;
  sellerID?: string;
}
