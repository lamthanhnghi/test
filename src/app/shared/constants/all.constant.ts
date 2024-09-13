import { IEnumOption } from '@shared/models';
import { eAddressLabels, eEmailLabels, ePhoneLabels } from '@shared/enums';

export const FALLBACK_IMAGE = '';

export const HEADER_MESSAGE_KEY = {
  TITLE: 'title-msg',
  MESSAGE: 'message-msg',
  ACTION: 'action-msg',
  OBJECT: 'object-msg',
  EXCEPT_ALERT: 'except-alert',
  EXCEPT_ERROR_CODES: 'except-error-codes',
  EXCEPT_LOADING: 'except-loading',
  CHECK_AGREEMENT_AND_INFO: 'check-agreement-and-info',
};

export const EXCEPT_ERROR_CODES = 'except-error-codes';

export const ADDRESS_LABELS_OPTIONS: IEnumOption[] = [
  { label: 'enums.address_labels.home', value: eAddressLabels.Home },
  { label: 'enums.address_labels.head_office', value: eAddressLabels.HeadOffice },
  { label: 'enums.address_labels.representative_office', value: eAddressLabels.RepresentativeOffice },
  { label: 'enums.address_labels.work', value: eAddressLabels.Work },
  { label: 'enums.address_labels.other', value: eAddressLabels.Other },
];

export const EMAIL_LABELS_OPTIONS: IEnumOption[] = [
  { label: 'enums.email_labels.private', value: eEmailLabels.Private },
  { label: 'enums.email_labels.work', value: eEmailLabels.Work },
  { label: 'enums.email_labels.other', value: eEmailLabels.Other },
];

export const PHONE_LABELS_OPTIONS: IEnumOption[] = [
  { label: 'enums.phone_labels.home', value: ePhoneLabels.Home },
  { label: 'enums.phone_labels.work', value: ePhoneLabels.Work },
  { label: 'enums.phone_labels.mobile', value: ePhoneLabels.Mobile },
  { label: 'enums.phone_labels.other', value: ePhoneLabels.Other },
];

export const ADDRESS_LENGTH = 320;

export const PROFILE_COVER_SIZE = { maxWidth: 1920, maxHeight: 1080, quality: 90 };

export const STORAGE_KEYS = {
  VIEW_MODE: 'view-mode',
};

export const ACCEPTED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

export const DATE_FORMAT = 'dd/MM/YYYY';
export const DATE_TIME_FORMAT = 'dd/MM/YYYY - HH:mm';

export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';
export const DEFAULT_DROPDOWN_LIMIT = 20;
