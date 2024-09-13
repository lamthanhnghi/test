import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IApprovalItem } from '@shared/requesting-product.model';
import { IInspectionPolicyItem, IInspectionPolicyPayload } from '@shared/inspection-policy.model';

@Injectable({ providedIn: 'root' })
export class InspectionPolicyService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<IInspectionPolicyItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.InspectionPolicies.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.InspectionPolicies.GetCounters}`);
  }

  create(payload: IInspectionPolicyPayload): Observable<ICommonResponse<IInspectionPolicyItem>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.InspectionPolicies.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(payload: IInspectionPolicyPayload): Observable<ICommonResponse<IInspectionPolicyItem>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.InspectionPolicies.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  delete(id: string): Observable<ICommonResponse<IInspectionPolicyItem>> {
    const params = ApiUtils.genHttpParams({ checkGoodsPolicyID: id });
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.InspectionPolicies.Delete}`, { params })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<IInspectionPolicyItem>> {
    const params = ApiUtils.genHttpParams({ checkGoodsPolicyID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.InspectionPolicies.GetDetail}`, { params });
  }
}
