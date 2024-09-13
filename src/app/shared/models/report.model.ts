import {
  eContentStatuses,
  eRatingReportType,
  eReportAction,
  eReportContentStatus, eReportType,
  eReportUserType
} from '@shared/enums';
import { IMedia } from '@shared/media.model';
import { Message } from 'postcss';

export interface IReportData {
  reportedMessageID: string
  reportedSellerID: string
  reportedID: string
  groupMessageID: string
  reportedDate: string
  reporterID: string
  reportedObjectType: eRatingReportType
  reportedObjectID: string
  reporterType: eReportUserType
  contentStatus: eReportContentStatus
  createdDate: string
  updatedDate: string
  handledDate: any
  handleAction: eReportAction,
  handleNote: string
  handlerID: any
  reasonOption: number
  reasonDescription: any
  reporterInfos: ReporterInfos
  sellerInfos: SellerInfos
  messages: IMessageInfo
  memberInfos: MemberInfo[]
}

export interface IReportCountingData {
  status: eReportContentStatus
  count: number
}

export interface IMessageInfo {
  data: IMessageData[]
  total: number
  isBlocked: boolean
  isBlockedByUser: boolean
  isBlockedBySeller: any
}

export interface IMessageData {
  messageID: string
  title: any
  content: string
  memberID: string
  memberType: number
  groupMessageID: string
  contentStatus: eContentStatuses
  createdDate: string
  hasRead: number
  objectData?: ObjectData
}

export interface IReportInfo {
  avatar: string,
  name: string,
  reportDate: string,
  reportUserType: eReportUserType,
  reportType: eReportType
  reasonOption: number,
  note?: string
}

export interface ObjectData {
  productID: string
  productName: string
  productShortDescription: string
  medias: IMedia[]
  price: number
  orderID: any
  orderStatus: any
  countItem: number
}

export interface MemberInfo {
  memberID: string
  memberType: number
  memberAvatar: string
  memberName: string
}


export interface SellerInfos {
  sellerID: string
  sellerProfileID: string
  businessName: string
  avatarID: string
  coverID: string
  avatarLink: string
  coverLink: string
  averageRating: number
}

export interface ReporterInfos {
  reporterID: string
  reporterType: eReportUserType
  reporterAvatar: string
  reporterFullName: string

}

export interface IGetReportPayload {
  offset: number,
  limit: number,
  contentStatus?:eReportContentStatus
  reporterType?: eReportUserType,
  toDate?: string,
  fromDate?: string,
  search?: string,
  reasonOption?: string
}
