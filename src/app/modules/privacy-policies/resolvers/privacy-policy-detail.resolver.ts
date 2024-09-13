import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { RouteUtils } from '@shared/utils';
import { map } from 'rxjs';
import { PrivacyPolicyService } from '@shared/privacy-policy.service';

export const privacyPolicyDetailResolver: ResolveFn<any> = (route, state) => {
  const router = inject(Router);
  const apiService = inject(PrivacyPolicyService);
  const notificationService = inject(NzNotificationService);
  const translateService = inject(TranslateService);
  const store$ = inject(Store);
  const id = route.paramMap.get('id');
  console.log('privacyPolicyDetailResolver (id)', id);
  store$.dispatch(startLoading());
  if (!id) {
    router.navigate(['/', RouteUtils.PrivacyPoliciesPage.Base]).then();
    return;
  }
  if (id == 'create') {
    // 👇 Navigate to previous session if existed
    // return apiService.checkDraftExist().pipe(
    //   tap((res) => {
    //     if (res.result?.data?.adSettingID) {
    //       router
    //         .navigate(['/', RouteUtils.PrivacyPoliciesPage.Base, res.result?.data?.adSettingID], {
    //           state: { isEdit: true },
    //         })
    //         .then();
    //     }
    //     store$.dispatch(stopLoading());
    //   }),
    // );
    store$.dispatch(stopLoading());
    return true;
  }
  return apiService.getDetail({ privacyPolicyID: id }).pipe(
    map((res) => {
      if (!res.result?.data) {
        notificationService.warning(
          translateService.instant('msg.notification'),
          translateService.instant('msg.data_not_found'),
        );
        router.navigate(['/', RouteUtils.PrivacyPoliciesPage.Base]).then();
      }
      store$.dispatch(stopLoading());
      console.log('resolve data', res.result?.data);
      return res.result?.data;
    }),
  );
};
