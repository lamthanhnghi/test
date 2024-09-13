import { IAddress, IEmail, IPhone } from '@shared/profile.models';
import { eAddressLabels, eEmailLabels, ePhoneLabels } from '@shared/enums';

export enum eContactFormKeys {
  ContactName = 'contactName',
}

export interface IContact {
  contactID: string;
  contentStatus?: number;
  contactName?: string;
  createdDate?: string;
  updatedDate?: string;
  emails?: IEmail[];
  phones?: IPhone[];
  addresses?: IAddress[];
}

export interface IContactPayload {
  contactID?: string; // required for update
  contactName: string;
  // contactType: number;
}

export interface IPhonePayload {
  contactID?: string;
  phoneID?: string;
  phone?: string;
  phoneLabel?: ePhoneLabels;
  isDefault?: boolean;
}

export interface IEmailPayload {
  contactID?: string;
  emailID?: string;
  emailAddress?: string;
  emailLabel?: eEmailLabels;
  isDefault?: boolean;
}

export interface IAddressPayload {
  contactID?: string;
  addressID?: string;
  cityID?: string;
  districtID?: string;
  addressLabel?: eAddressLabels;
  addressString?: string;
  latitude?: string;
  longitude?: string;
  isDefault?: number;
}
