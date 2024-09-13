import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IApprovalItem } from '@shared/requesting-product.model';
import { INotification, INotificationPayload } from '@shared/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationManagementService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<INotification[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.NotificationManagement.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.NotificationManagement.GetCounters}`);
  }

  create(payload: INotificationPayload): Observable<ICommonResponse<INotification>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.NotificationManagement.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(payload: INotificationPayload): Observable<ICommonResponse<INotification>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.NotificationManagement.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  delete(id: string): Observable<ICommonResponse<INotification>> {
    const params = ApiUtils.genHttpParams({ notificationID: id });
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.NotificationManagement.Delete}`, { params })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<INotification>> {
    const params = ApiUtils.genHttpParams({ notificationID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.NotificationManagement.GetDetail}`, { params });
  }
}
