import { Pipe, PipeTransform } from '@angular/core';
import { CommonHelpers } from '@shared/utils';
@Pipe({
  name: 'mcCharCount',
})
export class CharCountPipe implements PipeTransform {
  transform(value: any): any {
    return CommonHelpers.isNullOrUndefined(value) ? 0 : this.getCharCount(value);
  }

  private getCharCount(value: string | number): number {
    return (value + '').length;
  }
}
