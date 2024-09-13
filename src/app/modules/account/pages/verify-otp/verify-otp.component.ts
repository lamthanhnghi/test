import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccountState, IForgotPasswordVerifyOtp, IVerifyOtp, IVerifyOtpState } from '@shared/models';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { RouteUtils } from '@shared/utils';
import { AuthService } from '@shared/services';
import { forgotPasswordVerifyOtp, selectVerifyOtpState, verifyOtp } from '@shared/stores';

export enum VerifyOtpPage {
  ForgotPassword = 'forgot-password',
  Signup = 'signup',
}

@Component({
  selector: 'mc-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VerifyOtpComponent implements OnInit, OnDestroy {
  readonly RouteUtils = RouteUtils;
  readonly verifyOtpPage = VerifyOtpPage;
  page: VerifyOtpPage = VerifyOtpPage.ForgotPassword;
  state!: IVerifyOtpState | null;
  isTimeout = true;
  form: FormGroup = new FormGroup({
    otp: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
  });
  resendSubject = new Subject<void>();

  destroySubject = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<IAccountState>,
    private authService: AuthService,
  ) {
    this.page = this.route.snapshot.data['page'];
  }

  ngOnInit(): void {
    this.store$
      .select(selectVerifyOtpState)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((verifyOtpState) => {
        if (!verifyOtpState) {
          console.log('Redirecting to sign up page...');
          this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login]).then();
          return;
        }
        this.state = verifyOtpState;
      });
  }

  ngOnDestroy() {
    this.resendSubject.complete();
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  verifyOtp(): void {
    if (this.page === VerifyOtpPage.ForgotPassword) {
      if (this.state) {
        const payload: IForgotPasswordVerifyOtp = {
          adminID: this.state.adminID!,
          uuid: this.state.uuid,
          otp: this.form.value.otp,
        };
        this.store$.dispatch(forgotPasswordVerifyOtp({ payload }));
      }
    } else if (this.page === VerifyOtpPage.Signup) {
      if (this.state) {
        const payload: IVerifyOtp = {
          sellerID: this.state.sellerID,
          uuid: this.state.uuid,
          otp: this.form.value.otp,
          // deviceToken: '',
          // deviceID: '',
          // type: 'DESKTOP',
        };
        this.store$.dispatch(verifyOtp({ payload }));
      }
    }
  }

  onResend(): void {
    // if (this.state) {
    //   if (this.state.phone) {
    //     // resend otp phone
    //     this.authService
    //       .resendOtpPhone({
    //         sellerID: this.state.sellerID,
    //         phone: this.state.phone,
    //       })
    //       .subscribe((response) => {
    //         this.state = {
    //           // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //           ...this.state!,
    //           sellerID: response.sellerID,
    //           uuid: response.uuid,
    //         };
    //         this.resendSubject.next();
    //       });
    //   } else {
    //     // resend otp email
    //     this.authService
    //       .resendOtpEmail({
    //         sellerID: this.state.sellerID,
    //       })
    //       .subscribe((response) => {
    //         this.state = {
    //           // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //           ...this.state!,
    //           sellerID: response.sellerID,
    //           uuid: response.uuid,
    //         };
    //         this.resendSubject.next();
    //       });
    //   }
    // }
  }
}
