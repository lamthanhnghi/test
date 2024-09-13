import { Component } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { IConfirmModal, ILoadingState } from '@shared/models';
import { AuthService } from '@shared/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidators, RouteUtils } from '@shared/utils';
import { showToast, startLoading, stopLoading } from '@shared/stores';
import { eConfirmModalTypes, eToastStatus } from '@shared/enums';
import { ConfirmModalComponent } from '@shared/components';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrl: './active.component.scss',
})
export class ActiveComponent {
  readonly RouteUtils = RouteUtils;
  formPassword: UntypedFormGroup;
  isSubmit = false;
  passwordVisible = false;
  passwordConfirmVisible = false;
  destroy$: Subject<void> = new Subject<void>();
  screen: 'input-user-login' | 'input-otp' | 'input-password' = 'input-user-login';
  isTimeout = false;
  resendSubject = new Subject<void>();
  countdownFrom = 30;
  userID = '';
  uuid = '';
  userLogin = '';
  otp = '';
  activeToken: string | null = '';

  constructor(
    private store$: Store<ILoadingState>,
    private authService: AuthService,
    private modal: NzModalService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params.has('token')) {
        this.activeToken = params.get('token');
      }
      this.verifyToken();
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

  verifyToken() {
    console.log(this.activeToken);
    if (!this.activeToken) {
      this.store$.dispatch(
        showToast({
          status: eToastStatus.Error,
          title: 'msg.error',
          message: 'error_code.ER0000',
        }),
      );
      this.router.navigate(['/']);
      return;
    }

    this.store$.dispatch(startLoading());
    this.authService
      .verifyActiveEmailToken(this.activeToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.store$.dispatch(stopLoading());
          this.uuid = res.result.uuid;
          this.userID = res.result.adminID;
          this.userLogin = res.result.adminLoginID;
        },
        error: () => {
          this.store$.dispatch(stopLoading());
          this.router.navigate(['/']);
        },
      });
  }

  createPassword(): void {
    if (this.formPassword.invalid) {
      return;
    }
    const payload = {
      adminID: this.userID,
      uuid: this.uuid,
      password: this.formPassword.value.password,
    };
    this.store$.dispatch(startLoading());
    this.authService
      .createActiveEmailPassword(payload)
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
              message: this.translate.instant('msg.active_change_password_success'),
            } as IConfirmModal,
          });
          console.log(this.userLogin);
          modalRef.afterClose.subscribe(() => {
            this.router
              .navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login], {
                relativeTo: this.route,
                state: { adminLogin: this.userLogin },
              })
              .then();
          });
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
  }
}
