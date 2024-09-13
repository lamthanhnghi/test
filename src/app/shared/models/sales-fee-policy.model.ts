export interface ISalesFeePolicyItem {
  saleFeePolicyID?: string;
  title?: string;
  content?: string;
  productType?: number;
  saleFee?: number;
  applyDate?: string;
  version?: string;
  contentStatus?: number;
  updatedDate?: string;
  haveStatusDate?: string;
}

export enum eSalesFeePolicyFormKeys {
  Title = 'title',
  Content = 'content',
  ProductType = 'productType',
  SaleFee = 'saleFee',
  ApplyDate = 'applyDate',
  Version = 'version',
  ContentStatus = 'contentStatus',
}

export interface ISalesFeePolicyPayload {
  saleFeePolicyID?: string; // required when update
  title: string;
  content: string;
  productType: number;
  saleFee: number;
  applyDate: string;
  version: string;
}
