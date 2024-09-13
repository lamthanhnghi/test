import { eUserTypes } from '@shared/enums';

export interface IQnA {
  qnAID: string;
  question?: string;
  answer?: string;
  contentStatus?: number;
  updatedDate?: null;
  qnaType?: eUserTypes;
}

export interface IQnAPayload {
  qnAID?: string; // required for update
  question: string;
  answer: string;
}

export enum eQnAFormKeys {
  Question = 'question',
  Answer = 'answer',
  ContentStatus = 'contentStatus',
  QnaType = 'qnaType',
}
