import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, of } from 'rxjs';
import { RouteUtils } from '@shared/utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { AgreementsService } from '@shared/agreements.service';

export const agreementDetailResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const apiService = inject(AgreementsService);
  const notificationService = inject(NzNotificationService);
  const translateService = inject(TranslateService);
  const store$ = inject(Store);
  const id = route.paramMap.get('id');
  store$.dispatch(startLoading());
  if (!id) {
    const { agreementType } = route.queryParams;
    store$.dispatch(stopLoading());
    if (!agreementType) {
      /** must have agreementType */
      router.navigate(['/', RouteUtils.AgreementPage.Base]).then();
    }
    /** enable this code if you have a draft feature */
    // return apiService.checkDraftExist().pipe(
    //   tap((res) => {
    //     if (res.result?.data?.agreementID) {
    //       router
    //         .navigate(['/', RouteUtils.AgreementPage.Base, res.result?.data?.agreementID], {
    //           state: { isEdit: true },
    //         })
    //         .then();
    //     }
    //     store$.dispatch(stopLoading());
    //   }),
    // );
    return of({ agreementType });
  }
  return apiService.getDetail(id).pipe(
    map((res) => {
      if (!res.result?.data) {
        notificationService.warning(
          translateService.instant('msg.notification'),
          translateService.instant('msg.data_not_found'),
        );
        router.navigate(['/', RouteUtils.AgreementPage.Base]).then();
        return undefined;
      }
      store$.dispatch(stopLoading());
      return res.result?.data;
    }),
  );
};
