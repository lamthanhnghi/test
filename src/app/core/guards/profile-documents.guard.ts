import { CanActivateFn, Router } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { inject } from '@angular/core';
import { ePageActions } from '@shared/enums';

export const profileDocumentsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const { contentStatus } = route.params;
  const { mode } = route.queryParams;
  const validContentStatuses = [
    RouteUtils.ProfilePage.New,
    RouteUtils.ProfilePage.Edit,
    RouteUtils.ProfilePage.Pending,
    RouteUtils.ProfilePage.Review,
    RouteUtils.ProfilePage.Rejected,
    RouteUtils.ProfilePage.Approved,
    RouteUtils.ProfilePage.Archived,
  ];
  if (!validContentStatuses.includes(contentStatus)) {
    router.navigate(['**']).then();
    return false;
  }
  if ([RouteUtils.ProfilePage.New].includes(contentStatus) && (!mode || mode !== ePageActions.Edit)) {
    // navigate to 404 page
    router.navigate(['**']).then();
    return false;
  }
  return true;
};
