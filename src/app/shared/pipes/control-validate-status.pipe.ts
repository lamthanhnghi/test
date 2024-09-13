import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'ctrlValidateStatus',
  pure: false,
})
export class ControlValidateStatusPipe implements PipeTransform {
  transform(abstractControl: AbstractControl): any {
    if (!abstractControl) {
      return '';
    }
    return abstractControl?.touched && abstractControl.dirty ? abstractControl : 'success';
  }
}
