import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { RouteUtils } from '@shared/utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { BadWordsService } from '@shared/bad-words.service';

export const communityStandardsDetailResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const apiService = inject(BadWordsService);
  const notificationService = inject(NzNotificationService);
  const translateService = inject(TranslateService);
  const store$ = inject(Store);
  const id = route.paramMap.get('id');
  store$.dispatch(startLoading());
  if (!id) {
    return apiService.checkDraftExist().pipe(
      tap((res) => {
        if (res.result?.data?.badWordID) {
          router
            .navigate(['/', RouteUtils.GeneralSettingPage.Base, res.result?.data?.badWordID], {
              state: { isEdit: true },
            })
            .then();
        }
        store$.dispatch(stopLoading());
      }),
    );
  }
  return apiService.getDetail(id).pipe(
    map((res) => {
      if (!res.result?.data) {
        notificationService.warning(
          translateService.instant('msg.notification'),
          translateService.instant('msg.data_not_found'),
        );
        router.navigate(['/', RouteUtils.GeneralSettingPage.Base]).then();
        return undefined;
      }
      store$.dispatch(stopLoading());
      console.log('resolve data', res.result?.data);
      return res.result?.data;
    }),
  );
};
