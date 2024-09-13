import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IProductGroupItem, IBrand, IBrandPayload, IGetBrandListPayload } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IGetProductGroupListPayload } from '@shared/product-group.model';
import { IApprovalItem } from '@shared/requesting-product.model';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  private readonly baseApiUrl2 = `${this.appConfig.api_url2}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getItems(payload: IGetBrandListPayload): Observable<ICommonResponse<IBrand[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Brands.GetList}`, {
      params: ApiUtils.genHttpParams(payload)
    });
  }

  getDetail(payload: {
    brandID: string
  }): Observable<ICommonResponse<IBrand[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Brands.GetDetail}/${payload.brandID}`, {
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Brands.GetCounters}`);
  }

  create(payload: IBrandPayload): Observable<ICommonResponse<IBrand>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Brands.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_brand_success'));
  }

  update(payload: IBrandPayload & {
    brandID: string,
  }): Observable<ICommonResponse<IBrand>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Brands.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_brand_success'));
  }

  delete(payload : {
    brandID: string
  }): Observable<ICommonResponse<any>> {
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.Brands.Delete}`, {
        body: payload
      })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_brand_success'));
  }


}
