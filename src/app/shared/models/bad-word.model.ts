import { IApprovalStatusBase } from '@shared/common.model';

export interface IBadWord extends IApprovalStatusBase{
  badWordID?: string;
  word?: string;
  updatedDate?: string;
}

export enum eBadWordFormKeys {
  word = 'word',
  contentStatus = 'contentStatus',
}
