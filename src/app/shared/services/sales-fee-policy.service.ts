import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IApprovalItem } from '@shared/requesting-product.model';
import { ISalesFeePolicyItem, ISalesFeePolicyPayload } from '@shared/sales-fee-policy.model';

@Injectable({ providedIn: 'root' })
export class SalesFeePolicyService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<ISalesFeePolicyItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.SalesFeePolicies.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.SalesFeePolicies.GetCounters}`);
  }

  create(payload: ISalesFeePolicyPayload): Observable<ICommonResponse<ISalesFeePolicyItem>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.SalesFeePolicies.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(payload: ISalesFeePolicyPayload): Observable<ICommonResponse<ISalesFeePolicyItem>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.SalesFeePolicies.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  delete(id: string): Observable<ICommonResponse<ISalesFeePolicyItem>> {
    const params = ApiUtils.genHttpParams({ saleFeePolicyID: id });
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.SalesFeePolicies.Delete}`, { params })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<ISalesFeePolicyItem>> {
    const params = ApiUtils.genHttpParams({ saleFeePolicyID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.SalesFeePolicies.GetDetail}`, { params });
  }
}
