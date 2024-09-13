import { Pipe, PipeTransform } from '@angular/core';
import { CommonHelpers } from '@shared/utils';

@Pipe({
  name: 'mcFileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(size: any): any {
    if (CommonHelpers.isNullOrUndefined(size)) {
      return '';
    } else {
      return CommonHelpers.humanFileSize(size);
    }
  }
}
