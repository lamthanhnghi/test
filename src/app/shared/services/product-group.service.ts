import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import {
  ICommonResponse,
  IPagination,
  IPaginationResponse, IProductCategory,
  IProductGroup,
  IProductGroupItem,
  IProductGroupPayload
} from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { IApprovalItem } from '@shared/requesting-product.model';
import { IDeleteProductGroupPayload, IGetProductGroupListPayload } from '@shared/product-group.model';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class ProductGroupService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<IPaginationResponse<IProductGroup>> {
    return this.httpClient.get<any>(`${this.connectBaseApiUrl}/${ApiUtils.FunctionalGroups.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
      headers: new HttpHeaders({
        [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
      }),
    });
  }

  getItems(payload: IGetProductGroupListPayload): Observable<ICommonResponse<IProductGroupItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProductGroups.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getItemsByProductGroupID(
    payload: IPagination & { productGroupID: string },
  ): Observable<ICommonResponse<IProductCategory[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.FunctionalGroups.GetListCategory}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }


  getDetail(id: string): Observable<ICommonResponse<IProductGroupItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProductGroups.GetDetail}/${id}`);
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProductGroups.GetCounters}`);
  }

  create(payload: IProductGroupPayload): Observable<ICommonResponse<IProductGroupItem>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.ProductGroups.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_setting_success'));
  }

  update(payload: IProductGroupPayload, id: string): Observable<ICommonResponse<IProductGroupItem>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.ProductGroups.Update}/${id}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_setting_success'));
  }

  delete(payload: IDeleteProductGroupPayload): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.baseApiUrl}/${ApiUtils.ProductGroups.Delete}/${payload.productCategoryID}`,
    );
  }
}
