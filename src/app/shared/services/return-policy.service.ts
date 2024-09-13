import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IApprovalItem } from '@shared/requesting-product.model';
import { IReturnPolicyPayload } from '@shared/return-policy.model';

@Injectable({ providedIn: 'root' })
export class ReturnPolicyService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<IReturnPolicyPayload[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ReturnPolicies.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ReturnPolicies.GetCounters}`);
  }

  create(payload: IReturnPolicyPayload): Observable<ICommonResponse<IReturnPolicyPayload>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.ReturnPolicies.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(payload: IReturnPolicyPayload): Observable<ICommonResponse<IReturnPolicyPayload>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.ReturnPolicies.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  delete(id: string): Observable<ICommonResponse<IReturnPolicyPayload>> {
    const params = ApiUtils.genHttpParams({ returnPolicyID: id });
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.ReturnPolicies.Delete}`, { params })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<IReturnPolicyPayload>> {
    const params = ApiUtils.genHttpParams({ returnPolicyID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ReturnPolicies.GetDetail}`, { params });
  }
}
