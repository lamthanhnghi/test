import { IPagination } from './pagination.model';
import { eAddressLabels } from '@shared/enums';

export interface ICity {
  cityID: string;
  name: string;
}

export interface IDistrict {
  districtID: string;
  name: string;
  cityID: string;
}

export interface IGetDistrictsByCityIdPayload extends IPagination {
  cityID: string;
}

export interface ISelectedAddress {
  addressID?: string; // for update
  cityID: string;
  districtID: string;
  addressString: string;
  addressLabel: eAddressLabels;
  isDefault: number;
  longitude?: string;
  latitude?: string;
  addressUrl?: string;
}
