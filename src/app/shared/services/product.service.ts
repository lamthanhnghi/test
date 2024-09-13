import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ApiResponse,
  IPaginationResponse,
  IProduct,
  IProductCheckUpdatePayload,
  IProductCreatePayload,
  IProductCreateResponse,
  IProductPagination,
} from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils, CommonHelpers } from '@shared/utils';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  addProduct(payload: IProductCreatePayload): Observable<ApiResponse<IProductCreateResponse>> {
    const headers = new HttpHeaders({
      ...CommonHelpers.generateHeaderMsgKey({ title: 'msg.notification', message: 'msg.add_product_success' }),
    });
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Product.Add}`, payload, {
      headers,
    });
  }

  updateProduct(payload: IProductCreatePayload): Observable<ApiResponse<IProductCreateResponse>> {
    const headers = new HttpHeaders({
      ...CommonHelpers.generateHeaderMsgKey({ title: 'msg.notification', message: 'msg.update_product_success' }),
    });
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Product.Update}`, payload, {
      headers,
    });
  }

  getProduct(productID: string, productVersionID: string): Observable<IProduct> {
    const params = ApiUtils.genHttpParams({ productID, productVersionID });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Product.Detail}`, {
      params,
    });
  }

  getProducts(pagination: IProductPagination): Observable<IPaginationResponse<IProduct>> {
    const params = ApiUtils.genHttpParams(pagination);
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Product.GetList}`, {
      params,
    });
  }

  checkUpdateProduct(payload: IProductCheckUpdatePayload): Observable<IProduct> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Product.CheckUpdate}`, payload);
  }
}
