import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPhoneModal } from '@shared/models';
import { eDefaultStatus } from '@shared/enums';
import { PHONE_LABELS_OPTIONS } from '@shared/constants';
import { CommonHelpers, FormValidators } from '@shared/utils';
import { IPhonePayload } from '@shared/contact.model';

@Component({
  selector: 'app-phone-modal',
  templateUrl: './phone-modal.component.html',
  styleUrls: ['./phone-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PhoneModalComponent implements OnDestroy {
  okEvent$ = new Subject<IPhonePayload>();
  readonly eDefaultStatus = eDefaultStatus;
  readonly phoneLabelsOptions = PHONE_LABELS_OPTIONS;
  readonly formKeys = {
    phone: 'phone',
    phoneLabel: 'phoneLabel',
    isDefault: 'isDefault',
  };
  form: FormGroup = new FormGroup({
    [this.formKeys.phone]: new FormControl(undefined, [
      Validators.required,
      FormValidators.MustBePhone('phonePattern'),
    ]),
    [this.formKeys.phoneLabel]: new FormControl(undefined, [Validators.required]),
    [this.formKeys.isDefault]: new FormControl(false),
  });

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IPhoneModal,
  ) {
    if (data.data) {
      this.form.patchValue({
        [this.formKeys.phone]: data.data.phoneNo,
        [this.formKeys.phoneLabel]: data.data.phoneLabel,
      });
      // check if email is default === 1
      this.form.get(this.formKeys.isDefault)?.setValue(data.data.isDefault === eDefaultStatus.Default);
      // disable email address field
      // this.form.get(this.formKeys.phone)?.disable();
    }
  }

  submit() {
    if (this.form.invalid) {
      // form is invalid, do nothing
      return;
    }
    const data = {
      ...this.form.getRawValue(),
      isDefault: CommonHelpers.boolToNumber(this.form.value[this.formKeys.isDefault]), // convert true/false to 1/0
    };
    if (this.data.closeOnSubmit) {
      this.okEvent$.next(data);
      this.modalRef.close();
    } else {
      this.okEvent$.next(data);
    }
  }

  ngOnDestroy() {
    this.okEvent$.complete();
  }
}
