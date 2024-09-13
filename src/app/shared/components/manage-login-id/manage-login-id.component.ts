import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { IUpdateSellerLoginIDModal, IUpdateSellerLoginIDPayload } from '@shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { FormValidators } from '@shared/utils';

@Component({
  selector: 'app-manage-login-id',
  templateUrl: './manage-login-id.component.html',
  styleUrls: ['./manage-login-id.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ManageLoginIdComponent implements OnDestroy {
  okEvent$ = new Subject<IUpdateSellerLoginIDPayload>();
  readonly manageLoginIdKeys = {
    sellerLoginID: 'sellerLoginID',
    newLoginId: 'newLoginId',
  };
  form: FormGroup = new FormGroup({
    [this.manageLoginIdKeys.sellerLoginID]: new FormControl({ value: undefined, disabled: true }, []),
    [this.manageLoginIdKeys.newLoginId]: new FormControl(undefined, [
      Validators.required,
      FormValidators.MustBeEmailOrPhoneNumber('emailOrPhonePattern'),
    ]),
  });
  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IUpdateSellerLoginIDModal,
  ) {
    console.log('-> data', data);
    if (data.data) {
      this.form.patchValue(data.data);
    }
  }

  submit() {
    if (this.form.invalid) {
      // form is invalid, do nothing
      return;
    }
    const data = {
      ...this.form.getRawValue(),
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
