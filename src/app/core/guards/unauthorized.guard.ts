import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { isAuthenticated } from '@shared/auth';

export const UnauthorizedGuard: CanActivateFn = () => {
  const store$ = inject(Store);
  const router = inject(Router);
  return store$.select(isAuthenticated).pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigateByUrl('/').then();
        return false;
      } else {
        return true;
      }
    }),
  );
};
