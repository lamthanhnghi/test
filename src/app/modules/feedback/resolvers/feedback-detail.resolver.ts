import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ReportService } from '@shared/report.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { RouteUtils } from '@shared/utils';
import { eRatingReportType, eReportType } from '@shared/enums';
import { startLoading, stopLoading } from '@shared/stores';
import { FeedbackService } from '@shared/feedback.service';

export const feedbackDetailResolver: ResolveFn<any> = (route, state) => {
  const router = inject(Router);
  const apiService = inject(FeedbackService);
  const notificationService = inject(NzNotificationService);
  const translateService = inject(TranslateService);
  const store$ = inject(Store);
  const id = route.paramMap.get('id');


  store$.dispatch(startLoading());

  return apiService.getFeedbackDetail({ feedbackID: id! })
    .pipe(
      map((res) => {

        store$.dispatch(stopLoading());

        if (!res.result?.data) {
          notificationService.warning(
            translateService.instant('msg.notification'),
            translateService.instant('msg.data_not_found'),
          );
          router.navigate(['/', RouteUtils.FeedbacksPage.Base]).then();
          return undefined;
        }
        return { ...res.result?.data};
      }),
      catchError((err: any) => {
        store$.dispatch(stopLoading());
        router.navigate(['/', RouteUtils.FeedbacksPage.Base]).then();
        return of(undefined)
      })
    );
};
