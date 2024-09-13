import { eContentStatuses } from '@shared/enums';

export interface ISaleUnit {
  saleUnitID?: string;
  saleUnitName?: string;
  saleUnitDescription?: string;
  createdDate?: string;
  updatedDate?: string;
  contentStatus: eContentStatuses
}

export enum eSaleUnitFormKey {
  Name= "saleUnitName",
}

export interface ISaleUnitPayload {
  'baseSaleUnitName': string,
  'baseDescription': string
}
