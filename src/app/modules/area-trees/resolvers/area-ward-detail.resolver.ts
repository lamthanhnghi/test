import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { RouteUtils } from '@shared/utils';
import { map } from 'rxjs';
import { AreaTreeService } from '@shared/area-trees.service';

export const areaWardDetailResolver: ResolveFn<any> = (route) => {
  const router = inject(Router);
  const apiService = inject(AreaTreeService);
  const notificationService = inject(NzNotificationService);
  const translateService = inject(TranslateService);
  const store$ = inject(Store);
  console.log(route.params);
  const id = route.paramMap.get(RouteUtils.AreaTreePage.DistrictId.replace(':', ''));
  store$.dispatch(startLoading());
  if (!id) {
    router.navigate(['/', RouteUtils.AreaTreePage.Base]).then();
    return undefined;
  }

  return apiService.getDistrictDetail(id).pipe(
    map((res) => {
      store$.dispatch(stopLoading());
      if (!res.result?.data) {
        notificationService.warning(
          translateService.instant('msg.notification'),
          translateService.instant('msg.data_not_found'),
        );
        router.navigate(['/', RouteUtils.AreaTreePage.Base]).then();
        return undefined;
      }
      return res.result?.data;
    }),
  );
};
