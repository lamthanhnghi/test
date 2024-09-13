import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IApprovalItem } from '@shared/requesting-product.model';
import {
  IOrganizationRegistrationPolicyItem,
  IOrganizationRegistrationPolicyPayload,
} from '@shared/organization-registration-policy.model';

@Injectable({ providedIn: 'root' })
export class OrganizationRegistrationPolicyService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<IOrganizationRegistrationPolicyItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.OrganizationRegistrationPolicies.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.OrganizationRegistrationPolicies.GetCounters}`);
  }

  create(
    payload: IOrganizationRegistrationPolicyPayload,
  ): Observable<ICommonResponse<IOrganizationRegistrationPolicyItem>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.OrganizationRegistrationPolicies.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(
    payload: IOrganizationRegistrationPolicyPayload,
  ): Observable<ICommonResponse<IOrganizationRegistrationPolicyItem>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.OrganizationRegistrationPolicies.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  delete(id: string): Observable<ICommonResponse<IOrganizationRegistrationPolicyItem>> {
    const params = ApiUtils.genHttpParams({ organizationRegistrationPolicyID: id });
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.OrganizationRegistrationPolicies.Delete}`, { params })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<IOrganizationRegistrationPolicyItem>> {
    const params = ApiUtils.genHttpParams({ organizationRegistrationPolicyID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.OrganizationRegistrationPolicies.GetDetail}`, {
      params,
    });
  }
}
