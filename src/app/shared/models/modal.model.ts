import { IAddress, IContactInfoPayload, IEmail, IPhone, IUrl } from './profile.models';
import { eConfirmModalTypes } from '@shared/enums';
import { ICity, IDistrict } from '@shared/area-tree.model';
import { IUser } from '@shared/users.model';

export interface IMcModal {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export interface IConfirmModal {
  title?: string;
  type?: eConfirmModalTypes;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  hideConfirm?: boolean;
  closeOnSubmit?: boolean;
}

export interface ITextFeedbackModal {
  title: string;
  message: string;
  textBtnOk: string;
  textBtnCancel: string;
  inputPlaceholder: string;
  closeOnSubmit?: boolean;
  isDangerAction: boolean;
}

export interface IAddUserModal extends IMcModal {
  closeOnSubmit?: boolean;
  data?: IUser;
  isMyProfile?: boolean;
}

export interface IPasswordModal extends IMcModal {
  closeOnSubmit?: boolean;
}

export interface IPasswordModalSubmitPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  isOk?: boolean;
}

export interface IAddPackedUnitModal extends IMcModal {
  closeOnSubmit?: boolean;
  isPackUnit: boolean;
  editData: any;
}

export interface IAddCityModal extends IMcModal {
  closeOnSubmit?: boolean;
  data: ICity;
}

export interface IAddDistrictModal extends IMcModal {
  closeOnSubmit?: boolean;
  data: IDistrict;
  label: string;
}

export interface IAddPackingUnitModal extends IMcModal {
  closeOnSubmit?: boolean;
}

export interface IEditUserModal extends IMcModal {
  closeOnSubmit?: boolean;
  data?: IUser;
}

export interface IAddressModal extends IMcModal {
  closeOnSubmit?: boolean;
  data?: IAddress;
}

export interface IEmailModal extends IMcModal {
  closeOnSubmit?: boolean;
  data?: IEmail;
}

export interface IPhoneModal extends IMcModal {
  closeOnSubmit?: boolean;
  data?: IPhone;
}

export interface IOtpModal extends IMcModal {
  objectValue?: string;
  uuid?: string;
  objectId?: string;
}

export interface IOtpModalValue {
  objectValue?: string;
  otp?: string;
  uuid?: string;
  objectId?: string;
}

export interface IUrlModal extends IMcModal {
  closeOnSubmit?: boolean;
  data?: IUrl;
}

export interface IContactInfoModal extends IMcModal {
  closeOnSubmit?: boolean;
  data?: IContactInfoPayload;
}

export interface IUpdateSellerLoginIDModal extends IMcModal {
  closeOnSubmit?: boolean;
  data?: { sellerLoginID: string };
}
