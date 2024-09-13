import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IAddUserModal } from '@shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { eRoles } from '@shared/enums';
import { IAddUserModalSubmitPayload } from '@shared/users.model';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss',
})
export class AddUserModalComponent implements OnDestroy {
  okEvent$ = new Subject<IAddUserModalSubmitPayload>();
  readonly formKeys = {
    name: 'name',
    code: 'code',
    loginID: 'loginID',
    role: 'role',
  };
  roleOptions: { value: eRoles; label: string }[] = [];
  form: FormGroup = new FormGroup({
    [this.formKeys.name]: new FormControl('', {
      validators: [Validators.required],
    }),
    [this.formKeys.code]: new FormControl('', {
      validators: [Validators.required],
    }),
    [this.formKeys.loginID]: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    [this.formKeys.role]: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  config: IAddUserModal;

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IAddUserModal,
  ) {
    this.config = data;
    if (this.config.isMyProfile) {
      this.form.removeControl(this.formKeys.role);
      this.form.removeControl(this.formKeys.loginID);
    }
    this.roleOptions = [
      { label: 'Super Admin', value: eRoles.SuperAdmin },
      { label: 'Operation Admin', value: eRoles.OperationAdmin },
      { label: 'Data Admin', value: eRoles.DataAdmin },
      { label: 'Accountant Admin', value: eRoles.AccountantAdmin },
      { label: 'Customer service Admin', value: eRoles.CustomerServiceAdmin },
      { label: 'Shipping Admin', value: eRoles.ShippingAdmin },
    ];
    if (this.config.data) {
      this.form.patchValue({
        name: this.config.data.adminFullName,
        code: this.config.data.adminCode,
        loginID: this.config.data.adminCode,
        role: this.config.data.adminRole,
      });
    }
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
