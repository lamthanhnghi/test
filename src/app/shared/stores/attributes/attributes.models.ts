import { eContentStatuses } from '@shared/enums';
import { IProductCategory } from '@shared/models';

/**
 * Interface for the 'Attributes' data
 */
export interface AttributesEntity {
  attributeID: string;
  localizedAttributeID: string;
  locAttributeName: string;
  locAttributeDescription: string;
  values: IAttributeValue[];
}

export interface IAttributeValue {
  attributeValueID: string;
  localizedAttributeValueID: string;
  locAttributeValueName: string;
  locAttributeValueDescription: string;
}

export interface IAttribute {
  attributeID?: string;
  localizedAttributeID?: string;
  attributeName?: string;
  attributeDescription?: string;
  createdDate?: string;
  updatedDate?: string;
  isShowList?: 0 | 1;
  countAttributeValue?: number;
  contentStatus?: eContentStatuses,
  categories?: IProductCategory[]
}

export enum eAttributeFormKeys {
  Name = "name",
  Categories = "productCategoryIDs",

}

export interface IAttributePayload {
  "name": "test 2",
  "productCategoryIDs" : string[]
}

export interface IAttrValue {
  attributeValueID: string;
  localizedAttributeValueID: string;
  locAttributeValueName: string;
  locAttributeValueDescription: string;
}
