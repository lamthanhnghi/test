import {
  eFeedbackFilterType,
  eFeedbackTopic,
  eReportUserType
} from '@shared/enums';
import { IMedia } from '@shared/media.model';

export interface IFeedbackData {
  feedbackID: string
  topic: eFeedbackTopic
  topicDescription: string
  createdDate: string
  updatedDate: string
  adminReply: any
  adminReplyDate: string
  isUseful: boolean
  contentStatus: eFeedbackFilterType
  reviewDate: string
  handledDate: string
  handlerID: string
  creator: ICreator
  medias: IMedia[]
}

export interface IFeedbackInfo {
  avatar: string,
  name: string,
  feedbackDate: string,
  fromUserType: eReportUserType,
  content: string
  isUseful: boolean
  adminReply?: string
  adminReplyDate?: string
  medias?: IMedia[]
}

export interface ICreator {
  creatorID: string
  creatorType: eReportUserType
  creatorName: string
  creatorAvatar: string
}


export interface IGetFeedbackPayload {
  offset: number,
  limit: number,
  sortBy?: string,
  toDate?: string,
  fromDate?: string,
  search?: string,
  filter?: eFeedbackFilterType
  topic?: eFeedbackTopic
  fromUserType?: eReportUserType
}


export interface IFeedbackCountingData {
  status: eFeedbackFilterType
  count: number
}
