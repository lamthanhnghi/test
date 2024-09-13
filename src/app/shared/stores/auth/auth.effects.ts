import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { AuthService, ProfileService } from '@shared/services';
import { stopLoading } from '@shared/stores';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private store$: Store,
    private router: Router,
    private location: LocationStrategy,
    private profileService: ProfileService,
  ) {}

  // when app has started, get the user data
  // using the token from cookies / localStorage
  // and put into the store
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => {
        const token = this.authService.getToken();
        if (token) {
          return of(AuthActions.getTokenSuccessAndRetrieveUserProfile({ token }));
        } else {
          this.store$.dispatch(AuthActions.authLoaded());
          return of(AuthActions.loadAuthFailure({ error: 'No token found' }));
        }
      }),
      catchError((error) => {
        return of(AuthActions.loadAuthFailure({ error }));
      }),
    );
  });

  signInPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.authService.login(payload).pipe(
          tap((res) => {
            this.authService.setToken(res.result.token, true);
            console.log('login success');
          }),
          map(() => {
            return AuthActions.signInSuccess();
          }),
        );
      }),
    ),
  );

  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => {
          console.log('retrieve user from server');
          // this.store$.dispatch(AuthActions.authSuccess());
          // this.store$.dispatch(AuthActions.getUser());
          // this.store$.dispatch(AuthActions.authLoaded());
        }),
        catchError((error) => {
          console.error('Error', error);
          return of(AuthActions.loginError({ error }));
        }),
      ),
    { dispatch: false },
  );

  getTokenSuccessAndRetrieveUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getTokenSuccessAndRetrieveUserProfile),
      switchMap(({ token, isRedirectAfterLogin = false }) => {
        /** set token in session storage to temporary use for profile, agreement, update-info */
        this.authService.setToken(token, true);

        // this.store$.dispatch(AuthActions.authLoaded());
        // this.store$.dispatch(stopLoading());
        // return of(AuthActions.authSuccess({ redirect: isRedirectAfterLogin }));
        return this.profileService.getProfile().pipe(
          switchMap((rs) => {
            this.store$.dispatch(AuthActions.setUser({ user: rs.result.data }));
            /** clear token in session storage */
            this.authService.removeToken();
            /** set token in local storage */
            this.authService.setToken(token);
            this.store$.dispatch(AuthActions.authLoaded());
            this.store$.dispatch(stopLoading());
            return of(AuthActions.authSuccess({ redirect: isRedirectAfterLogin }));
          }),
          catchError((error) => {
            // const code = CommonHelpers.getErrorCode(error) as ERROR_CODES;
            // const excludeCodes = [
            //   ERROR_CODES.ERROR_CODE_SELLER_AGREEMENT_IS_NOT_UPDATED,
            //   ERROR_CODES.ERROR_CODE_SELLER_INFO_IS_NOT_UPDATED,
            //   ERROR_CODES.ERROR_CODE_SELLER_DOCUMENT_IS_NOT_UPDATED,
            // ];
            // if (excludeCodes.includes(code)) {
            //   this.store$.dispatch(authSuccess({ redirect: false }));
            //   if (code === ERROR_CODES.ERROR_CODE_SELLER_INFO_IS_NOT_UPDATED) {
            //     this.store$.dispatch(AuthActions.authUpdateInfoStep({ step: eUpdateInfoStep.Info }));
            //   } else if (code === ERROR_CODES.ERROR_CODE_SELLER_DOCUMENT_IS_NOT_UPDATED) {
            //     this.store$.dispatch(AuthActions.authUpdateInfoStep({ step: eUpdateInfoStep.Document }));
            //   }
            // }
            this.store$.dispatch(AuthActions.authLoaded());
            this.store$.dispatch(stopLoading());

            /** other errors */
            return throwError(() => error);
          }),
        );
      }),
    ),
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap(({ redirect }) => {
          console.log('auth success');
          redirect && this.router.navigate(['/']).then();
        }),
        catchError((error) => {
          console.error('Error', error);
          return of(AuthActions.loginError({ error }));
        }),
      ),
    { dispatch: false },
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() => {
        return this.profileService.getProfile().pipe(map((rs) => AuthActions.setUser({ user: rs.result.data })));
      }),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(({ isCallApi }) => (isCallApi ? this.authService.signout() : of(true))),
        tap(() => {
          this.authService.removeToken();
          window.location.href = '/';
          // this.router.navigate(['/account']).then();
        }),
      ),
    { dispatch: false },
  );
}
