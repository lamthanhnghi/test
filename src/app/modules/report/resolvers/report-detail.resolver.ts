import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { catchError, map, Observable, of } from 'rxjs';
import { RouteUtils } from '@shared/utils';
import { ReportService } from '@shared/report.service';
import { eRatingReportType, eReportType } from '@shared/enums';

export const reportDetailResolver: ResolveFn<any> = (route, state) => {
  const router = inject(Router);
  const apiService = inject(ReportService);
  const notificationService = inject(NzNotificationService);
  const translateService = inject(TranslateService);
  const store$ = inject(Store);
  const id = route.paramMap.get('id');
  const type = route.queryParamMap.get('type');

  // Get type from the route params

  let observable: Observable<any> | null = null
  let fallbackQueryParams = {}

  switch(route.parent?.routeConfig?.path) {
    case RouteUtils.ReportsPage.RatingReport:

      // If type is not a valid eRatingReportType, then no need to call the API
      if (!isNaN(Number(type)) && Object.values(eRatingReportType).includes(Number(type) as eRatingReportType)) {
        observable = apiService.getDetailedRatingReport({ reportedRatingID: id!, reportedRatingType: Number(type)  })
      }
      fallbackQueryParams = { type: eReportType.Rating }
      break;
    case RouteUtils.ReportsPage.MessageReport:
      observable = apiService.getDetailedMessageReport({ reportedMessageID: id! })
      fallbackQueryParams = { type: eReportType.Message }
      break;
    case RouteUtils.ReportsPage.SellerReport:
      observable = apiService.getDetailedSellerReport({ reportedSellerID: id! })
      fallbackQueryParams = { type: eReportType.Shop }
      break;
    default:
      console.error('reportDetailResolver invalid (id)', id);
      break;
  }

  store$.dispatch(startLoading());

  return observable
    ?.pipe(
      map((res) => {

        store$.dispatch(stopLoading());

        if (!res.result?.data) {
          notificationService.warning(
            translateService.instant('msg.notification'),
            translateService.instant('msg.data_not_found'),
          );
          router.navigate(['/', RouteUtils.ReportsPage.Base], {queryParams: fallbackQueryParams}).then();
          return undefined;
        }
        return { ...res.result?.data, reportID: id};
      }),
      catchError((err: any) => {
        store$.dispatch(stopLoading());
        router.navigate(['/', RouteUtils.ReportsPage.Base], {queryParams: fallbackQueryParams}).then();
        return of(undefined)
      })
    );
};
