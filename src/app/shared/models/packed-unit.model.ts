export interface IPackedUnit {
  attributeID?: string;
  localizedAttributeID?: string;
  attributeName?: string;
  attributeDescription?: string;
  createdDate?: string;
  updatedDate?: string;
  isShowList?: 0 | 1;
  countAttributeValue?: number;
}

export interface IPackedUnitPayload {
  attributeID?: string; // required when update
  name: string;
  isShowList?: 0 | 1;
}

export interface IPackedUnitValue {
  attributeValueID?: string;
  localizedAttributeValueID?: string;
  locAttributeValueName?: string;
  locAttributeValueDescription?: string;
  createdDate?: string;
  updatedDate?: string;
  countAttributeValue?: number;
}

export interface IPackedUnitValuePayload {
  name: string;
  attributeID?: string; // required when add
  attributeValueID?: string; // required when update
}
