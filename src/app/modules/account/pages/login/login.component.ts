import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonHelpers, FormValidators, RouteUtils } from '@shared/utils';
import { IAccountState, IAuthState, ILoginRequest, ILoginResponse } from '@shared/models';
import { clearState, startLoading, stopLoading } from '@shared/stores';
import { eDeviceTypes } from '@shared/enums';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services';

enum LoginFormKeys {
  UserLogin = 'adminLogin',
  Password = 'password',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginComponent implements OnDestroy {
  readonly LoginFormKeys = LoginFormKeys;
  readonly RouteUtils = RouteUtils;
  destroySubject$ = new Subject<void>();
  form: UntypedFormGroup = new UntypedFormGroup({
    [LoginFormKeys.UserLogin]: new FormControl<string | undefined>(undefined, [
      Validators.required,
      FormValidators.MustBeEmailOrPhoneNumber('phoneOrMailPattern'),
    ]),
    [LoginFormKeys.Password]: new FormControl<string>('', [
      Validators.required,
      FormValidators.MustBeValidPassword('passwordPattern'),
    ]),
  });
  passwordVisible = false;

  constructor(
    private store$: Store<IAuthState | IAccountState>,
    private router: Router,
    private authService: AuthService,
  ) {
    this.store$.dispatch(startLoading());
    this.router.events.pipe(takeUntil(this.destroySubject$), CommonHelpers.isNavigationEndObs).subscribe(() => {
      /** Get sellerLogin from state, this happens when register with existing sellerLogin */
      const userLogin = this.router.getCurrentNavigation()?.extras.state?.[LoginFormKeys.UserLogin] || '';
      console.log(userLogin);
      this.form.patchValue({ [LoginFormKeys.UserLogin]: userLogin });
      this.store$.dispatch(stopLoading());
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
    this.store$.dispatch(clearState());
  }

  login(): void {
    if (this.form.valid) {
      const payload: ILoginRequest = {
        ...this.form.value,
        deviceID: '',
        deviceToken: '', // firebase token
        type: eDeviceTypes.Webapp,
      };

      this.store$.dispatch(startLoading());
      const loginApi$: Observable<ILoginResponse> = this.authService.login(payload);
      loginApi$.subscribe({
        next: (data) => {
          this.authService.setToken(data.result.token);
          window.location.href = '/';

          /** stop loading is dispatch from below action */
          // this.store$.dispatch(stopLoading());
          // TODO: Khi đăng nhập lần đầu thành công sẽ có pop-up yêu cầu thay đổi password
          // const modalRef = this.modal.create({
          //     nzClassName: 'modal-confirm',
          //     nzContent: ConfirmModalComponent,
          //     nzData: {
          //       type: eConfirmModalTypes.Confirm,
          //       title: 'Lưu ý',
          //       message: "Vui lòng thay đổi mật khẩu trước khi tiếp tục sử dụng!",
          //       closeOnSubmit: true,
          //     } as IConfirmModal,
          //   });
          //
          // modalRef.afterClose.subscribe((isOk) => {
          //   if (isOk) {
          //     this.router
          //       .navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.SignupVerifyOtp], {
          //         relativeTo: this.route,
          //         state: { adminLogin, adminID},
          //       })
          //       .then();
          //   }
          // });
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
    } else {
      CommonHelpers.markFormDirty(this.form);
    }
  }
}
