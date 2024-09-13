import { IMedia } from '@shared/media.model';

export interface INotification {
  notificationID?: string;
  contentStatus?: number;
  applyForSeller?: boolean;
  applyForUser?: boolean;
  isSendSMS?: boolean;
  isSendEmail?: boolean;
  isSendPushNotification?: boolean;
  sendDate?: Date;
  title?: string;
  content?: string;
  medias?: IMedia[];
}

export interface INotificationPayload {
  notificationID?: string;
  languageCode?: string;
  title?: string;
  content?: string;
  applyForSeller?: boolean;
  applyForUser?: boolean;
  isSendSMS?: boolean;
  isSendEmail?: boolean;
  isSendPushNotification?: boolean;
  sendDate?: string;
  mediaIDs?: string[];
}

export enum eNotificationFormKeys {
  Title = 'title',
  Content = 'content',
  ApplyForSeller = 'applyForSeller',
  ApplyForUser = 'applyForUser',
  IsSendSMS = 'isSendSMS',
  IsSendEmail = 'isSendEmail',
  IsSendPushNotification = 'isSendPushNotification',
  SendDate = 'sendDate',
  MediaIDs = 'mediaIDs',
  ContentStatus = 'contentStatus',
}
