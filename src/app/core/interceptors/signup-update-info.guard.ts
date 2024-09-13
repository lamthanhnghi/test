import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommonHelpers } from '@shared/utils';

export const signupUpdateInfoGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const userLogin = route.queryParamMap.get('userLogin') || '';
  if (!userLogin) {
    router.navigate(['account/login']).then();
    return false;
  }
  if (!['email', 'phone'].includes(CommonHelpers.getUserLoginTypes(userLogin))) {
    router.navigate(['account/login']).then();
    return false;
  }
  return true;
};
