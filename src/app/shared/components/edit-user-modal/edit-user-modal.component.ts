import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IEditUserModal, ITextFeedbackModal } from '@shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { IEditUserModalSubmitPayload } from '@shared/users.model';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss',
})
export class EditUserModalComponent implements OnDestroy {
  okEvent$ = new Subject<IEditUserModalSubmitPayload>();
  readonly formKeys = {
    name: 'name',
    userID: 'userID',
    loginID: 'loginID',
    password: 'password',
  };
  form: FormGroup = new FormGroup({
    [this.formKeys.name]: new FormControl('', {
      validators: [Validators.required],
    }),
    [this.formKeys.userID]: new FormControl('', {
      validators: [Validators.required],
    }),
    [this.formKeys.loginID]: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    [this.formKeys.password]: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  config: IEditUserModal;

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: ITextFeedbackModal,
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
