import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { RouteUtils } from '@shared/utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { PackedUnitService } from '@shared/services';

export const packedUnitDetailResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const apiService = inject(PackedUnitService);
  const notificationService = inject(NzNotificationService);
  const translateService = inject(TranslateService);
  const store$ = inject(Store);
  const id = route.paramMap.get('id');
  store$.dispatch(startLoading());
  if (!id) {
    router.navigate(['/', RouteUtils.PackedUnitsPage.Base]).then();
    return undefined;
  }
  return apiService.getDetail(id).pipe(
    map((res) => {
      store$.dispatch(stopLoading());
      if (!res.result?.data) {
        notificationService.warning(
          translateService.instant('msg.notification'),
          translateService.instant('msg.data_not_found'),
        );
        router.navigate(['/', RouteUtils.PackedUnitsPage.Base]).then();
        return undefined;
      }
      return res.result?.data;
    }),
  );
};
