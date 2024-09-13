import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { IApprovalItem } from '@shared/requesting-product.model';
import {
  ICreatePrivacyPolicyPayload,
  IDeletePrivacyPolicyPayload,
  IGetPrivacyPolicyDetailPayload,
  IGetPrivacyPolicyListPayload,
  IPrivacyPolicy,
  IUpdatePrivacyPolicyPayload,
} from '@shared/privacy-policy.model';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class PrivacyPolicyService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getItems(payload: IGetPrivacyPolicyListPayload): Observable<ICommonResponse<IPrivacyPolicy[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.PrivacyPolicies.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(payload: IGetPrivacyPolicyDetailPayload): Observable<ICommonResponse<IPrivacyPolicy>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.PrivacyPolicies.GetDetail}`, {
      params: { ...payload },
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.PrivacyPolicies.GetCounters}`);
  }

  create(payload: ICreatePrivacyPolicyPayload): Observable<ICommonResponse<IPrivacyPolicy>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.PrivacyPolicies.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_policy_success'));
  }

  update(payload: IUpdatePrivacyPolicyPayload): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.PrivacyPolicies.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_policy_success'));
  }

  delete(payload: IDeletePrivacyPolicyPayload): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.PrivacyPolicies.Delete}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_policy_success'));
  }
}
