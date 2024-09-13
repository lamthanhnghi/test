import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated, isAuthLoaded, selectUserRole } from '@shared/auth';
import { filter, map, withLatestFrom } from 'rxjs';

export const RolesGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const roles = route.data.roles ?? ([] as string[]);
  const store$ = inject(Store);
  const router = inject(Router);
  return store$.select(isAuthenticated).pipe(
    withLatestFrom(store$.select(isAuthLoaded).pipe(filter((isLoaded) => isLoaded))),
    withLatestFrom(store$.select(selectUserRole)),
    map(([[isAuthenticated], role]) => {
      if (isAuthenticated && roles.includes(role)) {
        return true;
      } else {
        router.navigate(['/', '**'], { replaceUrl: true }).then();
        return false;
      }
    }),
  );
};
