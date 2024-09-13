import { Pipe, PipeTransform } from '@angular/core';
import { CommonHelpers } from '@shared/utils';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchKeys: string[], searchValue: string): any[] {
    if (!items || !searchKeys || !searchValue) {
      return items;
    }

    const searchValueWithoutDiacritics = CommonHelpers.toNonAccentVietnamese(searchValue.toLowerCase());

    return items.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        const valueWithoutDiacritics = CommonHelpers.toNonAccentVietnamese(value.toString().toLowerCase());
        return value && valueWithoutDiacritics.includes(searchValueWithoutDiacritics);
      });
    });
  }
}
