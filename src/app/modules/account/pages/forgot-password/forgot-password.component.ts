import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonHelpers, FormValidators, RouteUtils } from '@shared/utils';
import { IConfirmModal, IForgotPasswordVerifyOtp, ILoadingState, IResendOtpResponse } from '@shared/models';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '@shared/services';
import { startLoading, stopLoading } from '@shared/stores';
import { eConfirmModalTypes, eDeviceTypes, ERROR_CODES } from '@shared/enums';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmModalComponent } from '@shared/components';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import dayjs from 'dayjs';

enum ForgotPasswordFormKeys {
  UserLogin = 'userLogin',
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ForgotPasswordComponent {
  readonly RouteUtils = RouteUtils;
  form: UntypedFormGroup;
  formOtp: UntypedFormGroup;
  formPassword: UntypedFormGroup;
  isSubmit = false;
  passwordVisible = false;
  passwordConfirmVisible = false;
  destroy$: Subject<void> = new Subject<void>();
  // screen: 'input-user-login' | 'input-otp' | 'input-password' = 'input-user-login';
  screen: 'input-user-login' | 'input-otp' | 'input-password' = 'input-user-login';
  isTimeout = false;
  resendSubject = new Subject<void>();
  countdownFrom = 30;
  userID = '';
  uuid = '';
  userLogin = '';
  otp = '';

  constructor(
    private store$: Store<ILoadingState>,
    private authService: AuthService,
    private modal: NzModalService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = new UntypedFormGroup({
      [ForgotPasswordFormKeys.UserLogin]: new FormControl('', [
        Validators.required,
        FormValidators.MustBeEmail('phoneOrMailPattern'),
      ]),
    });
    this.formOtp = new UntypedFormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
    this.formPassword = new UntypedFormGroup(
      {
        password: new FormControl(undefined, [
          Validators.required,
          FormValidators.MustBeValidPassword('passwordPattern'),
        ]),
        passwordConfirm: new UntypedFormControl(undefined, [Validators.required]),
      },
      {
        validators: FormValidators.MustMatch('password', 'passwordConfirm', 'pwdNotMatch'),
      },
    );
  }

  submit() {
    this.isSubmit = true;
    if (this.form.valid) {
      const userLogin = this.form.get(ForgotPasswordFormKeys.UserLogin)?.value;
      const userLoginType = CommonHelpers.getUserLoginTypes(this.form.value.userLogin);
      let forgotPasswordApi$: Observable<any>;
      if (userLoginType === 'email') {
        forgotPasswordApi$ = this.authService.forgotPasswordSendOtpEmail({ adminLogin: userLogin });
        // } else if (userLoginType === 'phone') {
        //   forgotPasswordApi$ = this.authService.forgotPasswordSendOtpPhone({ adminLogin: userLogin });
      } else {
        return;
      }
      this.store$.dispatch(startLoading());
      forgotPasswordApi$.subscribe({
        next: (res: IResendOtpResponse) => {
          this.screen = 'input-otp';
          this.setStateData(res.result);
          this.userLogin = userLogin;
          this.store$.dispatch(stopLoading());
        },
        error: (error) => {
          const errorCode = CommonHelpers.getErrorCode(error);
          if (errorCode === ERROR_CODES.ERROR_CODE_SELLER_IS_NOT_EXISTING) {
            /** user not exist */
            this.modal.create({
              nzClassName: 'modal-confirm',
              nzContent: ConfirmModalComponent,
              nzData: {
                type: eConfirmModalTypes.Error,
                title: 'msg.confirm',
                closeOnSubmit: true,
                hideConfirm: true,
                cancelText: 'common.close',
                message: this.translate.instant('msg.seller_n_is_not_existing', {
                  value: userLogin,
                }),
              } as IConfirmModal,
            });
          }
          this.store$.dispatch(stopLoading());
        },
      });
    } else {
      CommonHelpers.markFormDirty(this.form);
      CommonHelpers.markFormTouched(this.form);
    }
  }

  verifyOtp(): void {
    const payload: IForgotPasswordVerifyOtp = {
      adminID: this.userID,
      uuid: this.uuid,
      otp: this.formOtp.value.otp,
    };
    this.store$.dispatch(startLoading());
    this.authService
      .forgotPasswordVerifyOtp(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.setStateData(res.result);
          this.store$.dispatch(stopLoading());
          this.screen = 'input-password';
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
  }

  onResend(): void {
    const userLoginType = CommonHelpers.getUserLoginTypes(this.userLogin);
    console.log(this.userLogin, userLoginType);
    let resendApi$: Observable<any>;
    if (userLoginType === 'email') {
      resendApi$ = this.authService.forgotPasswordSendOtpEmail({ adminLogin: this.userLogin });
    } else {
      return;
    }
    this.store$.dispatch(startLoading());
    resendApi$.subscribe({
      next: (resendResponse: IResendOtpResponse) => {
        this.screen = 'input-otp';
        this.setStateData(resendResponse.result);
        this.isTimeout = false;
        this.store$.dispatch(stopLoading());
      },
      error: () => {
        this.store$.dispatch(stopLoading());
      },
    });
  }

  createPassword(): void {
    if (this.formPassword.invalid) {
      CommonHelpers.markFormTouched(this.formPassword);
      CommonHelpers.markFormDirty(this.formPassword);
      return;
    }
    const payload = {
      adminID: this.userID,
      uuid: this.uuid,
      password: this.formPassword.value.password,
      type: eDeviceTypes.Webapp,
    };
    this.store$.dispatch(startLoading());
    this.authService
      .forgotCreatePassword(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.store$.dispatch(stopLoading());
          /** show modal success and redirect to login page */
          const modalRef = this.modal.create({
            nzClassName: 'modal-confirm',
            nzContent: ConfirmModalComponent,
            nzData: {
              type: eConfirmModalTypes.Success,
              title: 'msg.confirm',
              closeOnSubmit: true,
              hideConfirm: true,
              cancelText: 'common.close',
              message: this.translate.instant('msg.change_password_success'),
            } as IConfirmModal,
          });
          modalRef.afterClose.subscribe(() => {
            this.router
              .navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login], {
                relativeTo: this.route,
                state: { sellerLogin: res.adminLogin },
              })
              .then();
          });
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
  }

  setStateData(res: Partial<IResendOtpResponse['result']>) {
    this.userID = res.adminID || '';
    this.uuid = res.uuid || '';
    this.userLogin = res.adminLogin || '';
    this.countdownFrom = dayjs(res.expired).diff(dayjs(), 'second');
    this.resendSubject.next();
  }
}
