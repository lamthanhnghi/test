export interface IDistrict {
  districtID: string;
  name: string;
  cityID: string;
  updatedDate: string;
}

export interface ICreateDistrictPayload {
  name: string;
  cityID: string;
}

export interface IUpdateDistrictPayload extends Omit<ICreateDistrictPayload, 'cityID'> {
  districtID: string;
}

export interface ICity {
  cityID: string;
  code: string;
  name: string;
  countryID: string;
  updatedDate: string;
}

export interface ICreateCityPayload {
  code: string;
  name: string;
  countryID: string;
}

export interface IUpdateCityPayload extends ICreateCityPayload {
  cityID: string;
}

export interface IWard {
  wardID?: string;
  name?: string;
  updatedDate?: string;
}
