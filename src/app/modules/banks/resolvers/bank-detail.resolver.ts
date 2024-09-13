import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { RouteUtils } from '@shared/utils';
import { map, of } from 'rxjs';
import { BankService } from '@shared/bank.service';

export const bankDetailResolver: ResolveFn<any> = (route, state) => {
  const router = inject(Router);
  const apiService = inject(BankService);
  const notificationService = inject(NzNotificationService);
  const translateService = inject(TranslateService);
  const store$ = inject(Store);
  const id = route.paramMap.get('id');
  console.log('bankDetailResolver (id)', id);
  store$.dispatch(startLoading());
  if (!id) {
    store$.dispatch(stopLoading());
    /** enable this code if you have a draft feature */
    // return apiService.checkDraftExist().pipe(
    //   tap((res) => {
    //     if (res.result?.data?.agreementID) {
    //       router
    //         .navigate(['/', RouteUtils.CategoriesPage.Base, res.result?.data?.agreementID], {
    //           state: { isEdit: true },
    //         })
    //         .then();
    //     }
    //     store$.dispatch(stopLoading());
    //   }),
    // );
    return of(undefined);
  }
  return apiService.getDetail({ bankID: id! }).pipe(
    map((res) => {
      if (!res.result?.data) {
        notificationService.warning(
          translateService.instant('msg.notification'),
          translateService.instant('msg.data_not_found'),
        );
        router.navigate(['/', RouteUtils.BanksPage.Base]).then();
        return undefined;
      }
      store$.dispatch(stopLoading());
      return { ...res.result?.data, bankID: id };
    }),
  );
};
