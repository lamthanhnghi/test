import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { IApprovalItem } from '@shared/requesting-product.model';
import { CommonService } from '@shared/common.service';
import {
  ICreateUserGuidePayload, IDeleteUserGuidePayload,
  IGetUserGuideDetailPayload,
  IGetUserGuideListPayload, IUpdateUserGuidePayload,
  IUserGuide
} from '@shared/user-guide.model';
import { eUserTypes } from '@shared/enums';

@Injectable({ providedIn: 'root' })
export class UserGuideService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getItems(payload: IGetUserGuideListPayload): Observable<ICommonResponse<IUserGuide[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.UserGuide.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(payload: IGetUserGuideDetailPayload): Observable<ICommonResponse<IUserGuide>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.UserGuide.GetDetail}`, {
      params: { ...payload },
    });
  }

  getCounters(qnaType: eUserTypes): Observable<ICommonResponse<IApprovalItem[]>> {
    const params = ApiUtils.genHttpParams({ qnaType });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.UserGuide.GetCounters}`, { params });
  }

  create(payload: ICreateUserGuidePayload): Observable<ICommonResponse<IUserGuide>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.UserGuide.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_policy_success'));
  }

  update(payload: IUpdateUserGuidePayload): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.UserGuide.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_policy_success'));
  }

  delete(payload: IDeleteUserGuidePayload): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.UserGuide.Delete}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_policy_success'));
  }
}
