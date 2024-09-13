import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { IAccountState, IAuthState } from '@shared/models';
import { Store } from '@ngrx/store';
import * as AccountActions from './account.actions';
import { Router } from '@angular/router';
import { ApiCodes, eBusinessTypes, eToastStatus } from '@shared/enums';
import { showToast, signInSuccess } from '@shared//stores';
import { AuthService } from '@shared/services';
import { RouteUtils } from '@shared/utils';

@Injectable()
export class AccountEffects {
  constructor(
    private store$: Store<IAccountState>,
    private authStore$: Store<IAuthState>,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  // signUpPhone$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AccountActions.signUpPhone),
  //     map((action) => action.payload),
  //     tap((payload) => {
  //       this.store$.dispatch(
  //         AccountActions.setInitialState({ phone: payload.sellerLogin, countryCode: payload.countryCode, email: '' }),
  //       );
  //     }),
  //     switchMap((payload) => {
  //       return this.authService.signUpPhone(payload).pipe(
  //         switchMap((response) => {
  //           return of(AccountActions.signUpSuccess({ response }));
  //         }),
  //         catchError((error) => {
  //           if (error.error.errorCode === API_ERROR_CODES.ERROR_CODE_SELLER_IS_INACTIVE) {
  //             this.store$.dispatch(
  //               showToast({
  //                 status: eToastStatus.Warning,
  //                 title: 'account_page.your_account_has_not_active_yet',
  //                 message: 'account_page.please_input_otp_to_active_account',
  //               }),
  //             );
  //             return this.authService
  //               .resendOtpPhone({
  //                 sellerID: error.error.sellerID,
  //                 phone: payload.sellerLogin,
  //                 countryCode: payload.countryCode,
  //               })
  //               .pipe(switchMap((response) => of(AccountActions.signUpSuccess({ response }))));
  //           }
  //           if (error.error.errorCode === API_ERROR_CODES.ERROR_CODE_SELLER_LOGIN_WAS_EXISTING) {
  //             this.store$.dispatch(
  //               showToast({
  //                 status: eToastStatus.Warning,
  //                 title: 'account_page.account_exited',
  //                 message: 'account_page.please_login',
  //               }),
  //             );
  //             this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login]).then();
  //             return of(
  //               AccountActions.signUpFailureSellerExisted({
  //                 sellerLogin: payload.sellerLogin,
  //               }),
  //             );
  //           }
  //           return of(AccountActions.handleError({ error }));
  //         }),
  //       );
  //     }),
  //     repeat(),
  //   ),
  // );

  // signUpEmail$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AccountActions.signUpEmail),
  //     map((action) => action.payload),
  //     tap((payload) => {
  //       this.store$.dispatch(
  //         AccountActions.setInitialState({ phone: '', countryCode: '', email: payload.sellerLogin }),
  //       );
  //     }),
  //     switchMap((payload) => {
  //       return this.authService.signUpEmail(payload).pipe(
  //         switchMap((response) => {
  //           return of(AccountActions.signUpSuccess({ response }));
  //         }),
  //         catchError((error) => {
  //           if (error.error.errorCode === API_ERROR_CODES.ERROR_CODE_SELLER_IS_INACTIVE) {
  //             this.store$.dispatch(
  //               showToast({
  //                 status: eToastStatus.Warning,
  //                 title: 'account_page.your_account_has_not_active_yet',
  //                 message: 'account_page.please_input_otp_to_active_account',
  //               }),
  //             );
  //             return this.authService
  //               .resendOtpEmail({
  //                 sellerID: error.error.sellerID,
  //               })
  //               .pipe(switchMap((response) => of(AccountActions.signUpSuccess({ response }))));
  //           }
  //           if (error.error.errorCode === API_ERROR_CODES.ERROR_CODE_SELLER_LOGIN_WAS_EXISTING) {
  //             this.store$.dispatch(
  //               showToast({
  //                 status: eToastStatus.Warning,
  //                 title: 'account_page.account_exited',
  //                 message: 'account_page.please_login',
  //               }),
  //             );
  //             this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login]).then();
  //             return of(
  //               AccountActions.signUpFailureSellerExisted({
  //                 sellerLogin: payload.sellerLogin,
  //               }),
  //             );
  //           }
  //           return of(AccountActions.handleError({ error }));
  //         }),
  //       );
  //     }),
  //     repeat(),
  //   ),
  // );

  resendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.resendOtp),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.resendOtpPhone(payload).pipe(map(() => AccountActions.resendOtpSuccess())),
      ),
    ),
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.signUpSuccess),
        tap(() => {
          this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.SignupVerifyOtp]).then();
        }),
        catchError((error) => {
          return of(AccountActions.handleError({ error }));
        }),
      ),
    { dispatch: false },
  );

  // verifyOtp$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AccountActions.verifyOtp),
  //     map((action) => action.payload),
  //     switchMap((payload) =>
  //       this.authService.verifyOtp(payload).pipe(
  //         tap((response) => {
  //           // this.store$.dispatch(
  //           //   showToast({
  //           //     status: eToastStatus.Success,
  //           //     title: 'account_page.verify_success',
  //           //     message: 'account_page.welcome_to_mulstore',
  //           //   })
  //           // );
  //           this.authService.setToken(response.token);
  //           // this.authStore$.dispatch(signInSuccess());
  //           this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.SignupUpdateInfo]).then();
  //         }),
  //         switchMap((response) => of(AccountActions.verifyOtpSuccess({ response }))),
  //       ),
  //     ),
  //   ),
  // );

  // forgotPasswordResendOtp$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AccountActions.forgotPasswordResendOtp),
  //     map((action) => action.payload),
  //     tap((payload) => {
  //       this.store$.dispatch(
  //         AccountActions.setInitialState({ phone: payload.sellerLogin, countryCode: payload.countryCode, email: '' }),
  //       );
  //     }),
  //     switchMap((payload) =>
  //       this.authService.forgotPasswordSendOtpPhone(payload).pipe(
  //         map((response) => {
  //           this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.ForgotVerifyOtp]).then();
  //           return AccountActions.forgotPasswordResendOtpSuccess({ response });
  //         }),
  //       ),
  //     ),
  //   ),
  // );

  forgotPasswordResendOtpEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.forgotPasswordResendOtpEmail),
      map((action) => action.payload),
      tap((payload) => {
        this.store$.dispatch(AccountActions.setInitialState({ phone: '', countryCode: '', email: payload.adminLogin }));
      }),
      switchMap((payload) =>
        this.authService.forgotPasswordSendOtpEmail(payload).pipe(
          map((response) => {
            this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.ForgotVerifyOtp]).then();
            return AccountActions.forgotPasswordResendOtpSuccess({ response });
          }),
        ),
      ),
    ),
  );

  forgotPasswordVerifyOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.forgotPasswordVerifyOtp),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.forgotPasswordVerifyOtp(payload).pipe(
          map((response) => {
            this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.ResetPassword]).then();
            return AccountActions.forgotPasswordVerifyOtpSuccess({ response });
          }),
        ),
      ),
    ),
  );

  forgotPasswordCreatePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.forgotPasswordCreatePassword),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.forgotPasswordCreatePassword(payload).pipe(
          tap(() => {
            this.router.navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login]).then();
          }),
          map((response) => AccountActions.forgotPasswordCreatePasswordSuccess({ response })),
        ),
      ),
    ),
  );

  updateInfoPersonalAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.updateInfoPersonalAccount),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.updateInfoPersonal(payload).pipe(
          tap(() => {
            this.authStore$.dispatch(signInSuccess());
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'account_page.update_info_success',
              }),
            );
            this.router
              .navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.UpdateInfo], {
                replaceUrl: true,
              })
              .then();
            // this.router.navigate(['/'], { replaceUrl: true }).then();
          }),
          map(() => AccountActions.updateInfoSuccess({ businessType: eBusinessTypes.Personal })),
        ),
      ),
    ),
  );

  uploadDocumentPersonalAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.uploadDocumentPersonalAccount),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.uploadDocumentPersonal(payload).pipe(
          tap(() => {
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'account_page.upload_success',
              }),
            );
            this.router.navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.SignupTermOfUse]).then();
          }),
          map(() => AccountActions.updateInfoSuccess({ businessType: eBusinessTypes.Personal })),
        ),
      ),
    ),
  );

  updateInfoBusiness$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.updateInfoBusiness),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.updateInfoBusiness(payload).pipe(
          tap(() => {
            this.authStore$.dispatch(signInSuccess());
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'account_page.update_info_success',
              }),
            );
            this.router
              .navigate([RouteUtils.AccountPage.Base, RouteUtils.AccountPage.UpdateInfo], {
                replaceUrl: true,
              })
              .then();
          }),
          map(() => AccountActions.updateInfoSuccess({ businessType: eBusinessTypes.Business })),
        ),
      ),
    ),
  );

  uploadDocumentBusiness$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.uploadDocumentBusiness),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.uploadDocumentBusiness(payload).pipe(
          tap(() => {
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'account_page.upload_success',
              }),
            );
            this.router.navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.SignupTermOfUse]).then();
          }),
          map(() => AccountActions.updateInfoSuccess({ businessType: eBusinessTypes.Business })),
        ),
      ),
    ),
  );

  getAgreement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loadAgreement),
      switchMap(() =>
        this.authService.getAgreement().pipe(
          map((response) => AccountActions.loadAgreementSuccess({ response })),
          catchError((error) => {
            return of(AccountActions.handleError({ error }));
          }),
        ),
      ),
    ),
  );

  addAgreement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.addAgreement),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.addAgreement(payload).pipe(
          tap(() => {
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'account_page.accept_agreement_success',
              }),
            );
            this.router.navigate(['/']).then();
          }),
          map(() => AccountActions.updateInfoSuccess({ businessType: eBusinessTypes.Business })),
          catchError((error) => {
            if (error.error.errorCode === ApiCodes.ERROR_CODE_AGREEMENT_WAS_ADDED) {
              this.router.navigate(['/']).then();
            }
            return of(AccountActions.handleError({ error }));
          }),
        ),
      ),
    ),
  );
}
