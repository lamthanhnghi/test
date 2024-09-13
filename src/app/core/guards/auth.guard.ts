import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs';
import { inject } from '@angular/core';
import { isAuthenticated, isAuthLoaded } from '@shared/auth';
import { RouteUtils } from '@shared/utils';

export const AuthGuard: CanActivateFn = () => {
  const store$ = inject(Store);
  const router = inject(Router);
  return store$.select(isAuthenticated).pipe(
    withLatestFrom(store$.select(isAuthLoaded).pipe(filter((isLoaded) => isLoaded))),
    map(([isAuthenticated]) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login]).then();
        return false;
      }
    }),
  );
};

export const canActivateChild: CanActivateChildFn = () => {
  return true;
};
