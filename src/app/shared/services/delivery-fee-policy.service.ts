import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IDeliveryFeePolicyItem, IDeliveryFeePolicyPayload, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IApprovalItem } from '@shared/requesting-product.model';

@Injectable({ providedIn: 'root' })
export class DeliveryFeePolicyService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<IDeliveryFeePolicyItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.DeliveryFeePolicies.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.DeliveryFeePolicies.GetCounters}`);
  }

  create(payload: IDeliveryFeePolicyPayload): Observable<ICommonResponse<IDeliveryFeePolicyItem>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.DeliveryFeePolicies.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(payload: IDeliveryFeePolicyPayload): Observable<ICommonResponse<IDeliveryFeePolicyItem>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.DeliveryFeePolicies.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  delete(id: string): Observable<ICommonResponse<IDeliveryFeePolicyItem>> {
    const params = ApiUtils.genHttpParams({ deliveryPricePolicyID: id });
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.DeliveryFeePolicies.Delete}`, { params })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<IDeliveryFeePolicyItem>> {
    const params = ApiUtils.genHttpParams({ deliveryPricePolicyID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.DeliveryFeePolicies.GetDetail}`, { params });
  }
}
