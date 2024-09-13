import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import {
  ICommonResponse,
  IDeleteProductCategoryPayload,
  IGetProductCategoryListPayload,
  IPagination,
  IPaginationResponse,
  IProductCategory,
  IProductCategoryPayload,
} from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { IApprovalItem } from '@shared/requesting-product.model';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<IPaginationResponse<IProductCategory>> {
    return this.httpClient.get<any>(`${this.connectBaseApiUrl}/${ApiUtils.ProductCategories.GetConnectList}`, {
      params: ApiUtils.genHttpParams(payload),
      headers: new HttpHeaders({
        [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
      }),
    });
  }

  getItems(payload: IGetProductCategoryListPayload): Observable<ICommonResponse<IProductCategory[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProductCategories.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(id: string): Observable<ICommonResponse<IProductCategory>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProductCategories.GetDetail}/${id}`);
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProductCategories.GetCounters}`);
  }

  create(payload: IProductCategoryPayload): Observable<ICommonResponse<IProductCategory>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.ProductCategories.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_setting_success'));
  }

  update(payload: IProductCategoryPayload, id: string): Observable<ICommonResponse<IProductCategory>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.ProductCategories.Update}/${id}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_setting_success'));
  }

  delete(payload: IDeleteProductCategoryPayload): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.baseApiUrl}/${ApiUtils.ProductCategories.Delete}/${payload.productCategoryID}`,
    );
  }
}
