import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { eRoles } from '@shared/enums';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPasswordModal, IPasswordModalSubmitPayload } from '@shared/models';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrl: './password-modal.component.scss',
})
export class PasswordModalComponent {
  okEvent$ = new Subject<IPasswordModalSubmitPayload>();
  readonly formKeys = {
    oldPassword: 'oldPassword',
    newPassword: 'newPassword',
    confirmPassword: 'confirmPassword',
  };
  roleOptions: { value: eRoles; label: string }[] = [];
  form: FormGroup = new FormGroup({
    [this.formKeys.oldPassword]: new FormControl('', {
      validators: [Validators.required],
    }),
    [this.formKeys.newPassword]: new FormControl('', {
      validators: [Validators.required],
    }),
    [this.formKeys.confirmPassword]: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  config: IPasswordModal;

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IPasswordModal,
  ) {
    this.config = data;
  }

  submit() {
    if (this.form.invalid) {
      console.log('invalid form', this.form.value);
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      // form is invalid, do nothing
      return;
    }
    console.log('submitting', this.form.value);
    const data = {
      ...this.form.getRawValue(),
      isOk: true,
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
