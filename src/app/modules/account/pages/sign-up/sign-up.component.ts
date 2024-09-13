import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonHelpers, FormValidators, RouteUtils } from '@shared/utils';
import { IAccountState, IResendOtpResponse, ISignUpResponse, IVerifyOtp } from '@shared/models';
import { getTokenSuccessAndRetrieveUserProfile, startLoading, stopLoading } from '@shared/stores';
import { AuthService } from '@shared/services';
import { Observable, Subject, takeUntil } from 'rxjs';
import dayjs from 'dayjs';
import { eDeviceTypes } from '@shared/enums';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';

enum SignUpFormKeys {
  sellerLogin = 'sellerLogin',
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SignUpComponent implements OnDestroy {
  readonly RouteUtils = RouteUtils;
  form: UntypedFormGroup;
  formOtp: UntypedFormGroup;
  formPassword: UntypedFormGroup;
  passwordVisible = false;
  passwordConfirmVisible = false;
  destroy$: Subject<void> = new Subject<void>();
  fakePhone = '09' + dayjs().format('YYMMDD');
  screen: 'input-seller-login' | 'input-otp' | 'input-password' = 'input-seller-login';
  isTimeout = true;
  resendSubject = new Subject<void>();
  sellerID = '';
  uuid = '';
  sellerLogin = '';
  otp = '';
  countdownFrom = 30;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<IAccountState>,
    private authService: AuthService,
    private modal: NzModalService,
    private translate: TranslateService,
  ) {
    this.form = new UntypedFormGroup({
      [SignUpFormKeys.sellerLogin]: new FormControl(this.fakePhone, [
        Validators.required,
        FormValidators.MustBeEmailOrPhoneNumber('phoneOrMailPattern'),
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
    this.store$.dispatch(startLoading());
    this.router.events.pipe(takeUntil(this.destroy$), CommonHelpers.isNavigationEndObs).subscribe(() => {
      /** Get { sellerLogin, sellerID, uuid } from state, this happens when register with existing sellerLogin */
      const { sellerLogin, sellerID } = this.router.getCurrentNavigation()?.extras.state || {
        sellerLogin: '',
        sellerID: '',
      };
      if (sellerLogin && sellerID) {
        this.sellerLogin = sellerLogin;
        this.sellerID = sellerID;
        this.screen = 'input-otp';
        this.onResend();
      }
      this.store$.dispatch(stopLoading());
    });
  }

  signup(): void {
    // if (this.form.valid) {
    //   this.store$.dispatch(startLoading());
    //   const sellerLogin = this.form.get(SignUpFormKeys.sellerLogin)?.value;
    //   const userLoginType = CommonHelpers.getUserLoginTypes(sellerLogin);
    //   let signUpApi$: Observable<ISignUpResponse>;
    //   if (userLoginType === 'email') {
    //     signUpApi$ = this.authService.signUpEmail({ sellerLogin });
    //   } else if (userLoginType === 'phone') {
    //     signUpApi$ = this.authService.signUpPhone({ sellerLogin });
    //   } else {
    //     this.store$.dispatch(stopLoading());
    //     return;
    //   }
    //   signUpApi$.pipe(takeUntil(this.destroy$)).subscribe({
    //     next: (res) => {
    //       this.screen = 'input-otp';
    //       this.setStateData(res);
    //       this.store$.dispatch(stopLoading());
    //     },
    //     error: (error) => {
    //       this.store$.dispatch(stopLoading());
    //       const code = CommonHelpers.getErrorCode(error);
    //       const { sellerLogin, sellerID } = error.error;
    //       this.sellerLogin = sellerLogin || this.form.get(SignUpFormKeys.sellerLogin)?.value;
    //       this.sellerID = sellerID;
    //       if (code === ERROR_CODES.ERROR_CODE_SELLER_IS_INACTIVE) {
    //         /**
    //          * user is inactive, show confirm modal
    //          * if user click ok, resend otp
    //          * if user click cancel, close modal
    //          * */
    //         const modalRef = this.modal.create({
    //           nzClassName: 'modal-confirm',
    //           nzContent: ConfirmModalComponent,
    //           nzData: {
    //             type: eConfirmModalTypes.Confirm,
    //             title: 'msg.confirm',
    //             closeOnSubmit: true,
    //             message: this.translate.instant('msg.account_is_inactive_do_you_want_resend_otp', {
    //               value: sellerLogin,
    //             }),
    //           } as IConfirmModal,
    //         });
    //
    //         modalRef.afterClose.subscribe((isOk) => {
    //           if (isOk) {
    //             this.onResend();
    //           }
    //         });
    //       } else if (code === ERROR_CODES.ERROR_CODE_SELLER_LOGIN_WAS_EXISTING) {
    //         /** acc existed, show confirm modal and redirect to login page */
    //         this.store$.dispatch(stopLoading());
    //         const modalRef = this.modal.create({
    //           nzClassName: 'modal-confirm',
    //           nzContent: ConfirmModalComponent,
    //           nzData: {
    //             type: eConfirmModalTypes.Confirm,
    //             title: 'msg.confirm',
    //             closeOnSubmit: true,
    //             message: this.translate.instant('msg.account_n_exited_do_you_want_login', {
    //               value: this.sellerLogin,
    //             }),
    //           } as IConfirmModal,
    //         });
    //         modalRef.afterClose.subscribe((isOk) => {
    //           if (isOk) {
    //             this.router
    //               .navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login], {
    //                 relativeTo: this.route,
    //                 state: {
    //                   sellerLogin: this.sellerLogin,
    //                 },
    //               })
    //               .then();
    //           }
    //         });
    //       }
    //     },
    //   });
    // } else {
    //   Object.values(this.form.controls).forEach((control) => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

  setStateData(res: Partial<ISignUpResponse>) {
    this.sellerID = res.sellerID || '';
    this.uuid = res.uuid || '';
    this.sellerLogin = res.sellerLogin || '';
    this.countdownFrom = dayjs(res.expired).diff(dayjs(), 'second');
    this.resendSubject.next();
  }

  protected readonly SignUpFormKeys = SignUpFormKeys;

  verifyOtp(): void {
    const payload: IVerifyOtp = {
      sellerID: this.sellerID,
      uuid: this.uuid,
      otp: this.formOtp.value.otp,
    };
    this.store$.dispatch(startLoading());
    this.authService
      .verifyOtp(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.setStateData(res);
          this.store$.dispatch(stopLoading());
          this.screen = 'input-password';
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
  }

  onResend(): void {
    const userLoginType = CommonHelpers.getUserLoginTypes(this.sellerLogin);
    let resendApi$: Observable<IResendOtpResponse>;
    if (userLoginType === 'email') {
      resendApi$ = this.authService.resendOtpEmail({ sellerID: this.sellerID, email: this.sellerLogin });
    } else if (userLoginType === 'phone') {
      resendApi$ = this.authService.resendOtpPhone({ sellerID: this.sellerID, phone: this.sellerLogin });
    } else {
      return;
    }
    this.store$.dispatch(startLoading());
    resendApi$.subscribe({
      next: (resendResponse) => {
        this.setStateData(resendResponse.result);
        this.screen = 'input-otp';
        this.isTimeout = false;
        this.resendSubject.next();
        this.store$.dispatch(stopLoading());
      },
      error: () => {
        this.store$.dispatch(stopLoading());
      },
    });
  }

  createPassword(): void {
    if (this.formPassword.invalid) {
      return;
    }
    const payload = {
      sellerID: this.sellerID,
      uuid: this.uuid,
      password: this.formPassword.value.password,
      type: eDeviceTypes.Webapp,
    };
    this.store$.dispatch(startLoading());
    this.authService
      .createPassword(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ token }) => {
          /** stop loading is dispatch from below action */
          this.store$.dispatch(getTokenSuccessAndRetrieveUserProfile({ token }));
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
