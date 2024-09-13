import { IProductAttribute } from '@shared/product.model';
import { IMedia } from '@shared/media.model';
import { eReportAction, eReportContentStatus } from '@shared/enums';

export interface IProductRating {
  productSKUID: string
  productID: string
  productVersionID: string
  productName: string
  productPublishName: string
  productDescription: string
  price: number
  priceBefore: number
  medias: IMedia[]
  attributes: IProductAttribute[]
  dataRating: IDataRating
}

export interface IDataRating {
  ratingProductID: string
  productSKUID: string
  orderID: string
  userID: string
  sellerID: string
  rating: number
  comment: string
  sellerComment: string
  sellerCommentDate: string
  ratingDate: string
  createdDate: string
  updatedDate: string
  medias: IMedia[]
  userContactFullName: string
  userAvatar: string
  sellerAvatar: string
  businessName: string
  orderCode: string
  reportedRatingProduct?: IReportedRatingProduct
  reportedReplyOfRatingProduct?: IReportedReplyOfRatingProduct
}

export interface IReportedRatingProduct {
  reportedRatingProductID: string
  ratingProductID: string
  reportedDate: string
  contentStatus: eReportContentStatus
  createdDate: string
  updatedDate: string
  handledDate: any
  handlerID: any
  handleAction: eReportAction
  reasonOption: number
  reasonDescription: string
}

export interface IReportedReplyOfRatingProduct {
  reportedReplyOfRatingProductID: string
  ratingProductID: string
  reportedDate: string
  contentStatus: eReportContentStatus
  createdDate: string
  updatedDate: string
  handledDate: any
  handlerID: any
  handleAction: eReportAction
  reasonOption: number
  reasonDescription: string
}
