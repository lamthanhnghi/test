import { Pipe, PipeTransform } from '@angular/core';
import { IProductAttribute } from '@shared/models';

@Pipe({
  name: 'skuAttrPipe',
})
export class SkuAttrPipe implements PipeTransform {
  transform(value?: IProductAttribute[], showAttrName = false): any {
    if (!Array.isArray(value)) {
      return '';
    }

    if (showAttrName) {
      return value.map((attr) => `${attr.attributeName}: ${attr.attributeValueName}`).join(', ');
    }

    return value.map((attr) => `${attr.attributeValueName}`).join(', ');
  }
}
