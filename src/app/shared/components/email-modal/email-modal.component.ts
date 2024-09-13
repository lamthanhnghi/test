import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmailModal } from '@shared/models';
import { eDefaultStatus } from '@shared/enums';
import { EMAIL_LABELS_OPTIONS } from '@shared/constants';
import { CommonHelpers } from '@shared/utils';
import { IEmailPayload } from '@shared/contact.model';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class EmailModalComponent implements OnDestroy {
  okEvent$ = new Subject<IEmailPayload>();
  readonly eDefaultStatus = eDefaultStatus;
  readonly emailLabelsOptions = EMAIL_LABELS_OPTIONS;
  readonly formKeys = {
    emailAddress: 'emailAddress',
    emailLabel: 'emailLabel',
    isDefault: 'isDefault',
  };
  form: FormGroup = new FormGroup({
    [this.formKeys.emailAddress]: new FormControl(undefined, [Validators.required, Validators.email]),
    [this.formKeys.emailLabel]: new FormControl(undefined, [Validators.required]),
    [this.formKeys.isDefault]: new FormControl(false),
  });

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IEmailModal,
  ) {
    if (data.data) {
      this.form.patchValue(data.data);
      // check if email is default === 1
      this.form.get(this.formKeys.isDefault)?.setValue(data.data.isDefault === eDefaultStatus.Default);
      // disable email address field
      // this.form.get(this.formKeys.emailAddress)?.disable();
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
