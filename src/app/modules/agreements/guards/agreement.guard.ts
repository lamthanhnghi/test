import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RouteUtils } from '@shared/utils';
import { GENERAL_SETTING_MENU_ITEMS } from '@shared/constants';
import { eContentStatuses } from '@shared/enums';

export const agreementListGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const statuses =
    GENERAL_SETTING_MENU_ITEMS?.[0]?.children?.map((item) => item['queryParams']?.status?.toString()) || [];
  const status = route.queryParamMap.get('status');
  if (!statuses.includes(status)) {
    // navigate to default status
    router
      .navigate(['/', RouteUtils.AgreementPage.Base], { queryParams: { status: eContentStatuses.AdminApproved } })
      .then();
    return false;
  }
  return true;
};
