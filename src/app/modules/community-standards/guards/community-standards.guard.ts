import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { COMMUNITY_STANDARDS_MENU_ITEMS } from '@shared/constants';
import { eContentStatuses } from '@shared/enums';

export const communityStandardsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const statuses =
    COMMUNITY_STANDARDS_MENU_ITEMS?.[0]?.children
      ?.map((item) => item['queryParams']?.status?.toString())
      ?.filter(
        (st) =>
          !state.url?.startsWith('/approval') ||
          (st !== eContentStatuses.All.toString() && st !== eContentStatuses.New.toString()),
      ) || [];
  const status = route.queryParamMap.get('status');
  if (!statuses.includes(status)) {
    // navigate to default status
    router
      .navigate([state.url?.substring(0, Math.max(state.url?.indexOf('?'), 0) || state.url.length)], {
        queryParams: {
          status: state.url?.startsWith('/approval') ? eContentStatuses.AdminPending : eContentStatuses.All,
        },
      })
      .then();
    return false;
  }
  return true;
};
