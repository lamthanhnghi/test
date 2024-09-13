import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IGetSellerRequestingProfileListPayload, IProduct } from '@shared/models';
import { ApiUtils } from '@shared/utils';
import {
  IApprovalItem,
  IGetSellerRequestingProductDetailPayload,
  ISellerRequestingProduct,
  ISetRequestProductStatusPayload,
} from '@shared/requesting-product.model';

@Injectable({ providedIn: 'root' })
export class RequestingProductService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  getItems(payload: IGetSellerRequestingProfileListPayload): Observable<ICommonResponse<ISellerRequestingProduct[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(payload: IGetSellerRequestingProductDetailPayload): Observable<ICommonResponse<IProduct>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.GetDetail}`, {
      params: { ...payload },
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.GetCounters}`);
  }

  review(payload: ISetRequestProductStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.SetReviewing}`, payload);
  }

  approve(payload: ISetRequestProductStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.SetApproved}`, payload);
  }

  reject(payload: ISetRequestProductStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.SetRejected}`, payload);
  }

  hide(payload: ISetRequestProductStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.SetHidden}`, payload);
  }

  archive(payload: ISetRequestProductStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.SetArchived}`, payload);
  }

  verify(payload: { productID: string; productVersionID: string; isVerify: boolean }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProducts.Verify}`, payload);
  }
}
