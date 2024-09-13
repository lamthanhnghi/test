import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouteUtils } from '@shared/utils';
import { IOtpModal, IOtpModalValue } from '@shared/models';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class OtpModalComponent implements OnDestroy {
  protected readonly RouteUtils = RouteUtils;
  okEvent$ = new Subject<IOtpModalValue>();
  resendEvent$ = new Subject<void>();
  resendSubject: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    otp: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
  });
  isTimeout = true;
  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IOtpModal,
  ) {}

  submit() {
    this.okEvent$.next({
      otp: this.form.value.otp,
      objectValue: this.data.objectValue,
      uuid: this.data.uuid,
      objectId: this.data.objectId,
    });
  }

  onResend() {
    this.resendEvent$.next();
  }

  verifyOtp() {}

  ngOnDestroy() {
    this.okEvent$.complete();
    this.resendEvent$.complete();
    this.resendSubject.complete();
  }
}
