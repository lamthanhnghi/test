import { IPagination } from '@shared/pagination.model';
import { eContentStatuses } from '@shared/enums';
import { IMedia } from '@shared/media.model';

export interface IBrand {
  brandID: string
  brandName: string
  brandDescription: string
  createdDate: string
  updatedDate: string
  contentStatus: eContentStatuses
  url: any
  email: any
  phone: any
  address: any
  cityID: string
  districtID: string
  dunsNumber: string
  logo?: IMedia
}

export interface IBrandManagePayload {
  brandName?: string;
  brandDescription?: string;
}

export interface IGetBrandListPayload extends IPagination {}

export enum eBrandFormKey {
  Logo = "logoMediaID",
  Name = "brandName",
  Description = "brandDescription",
  Url = "url",
  Email = "email",
  Phone = "phone",
  Address = "address",
  DunsNumber = "dunsNumber"

}

export interface IBrandPayload {
  brandName: string;
  brandDescription: string;
  logoMediaID?: string
  url?: string
  email?: string
  phone?: string
  address?: string
  dunsNumber?: string
}
