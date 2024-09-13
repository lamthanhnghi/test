import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import {
  ICommonResponse,
  IPagination,
  IPaginationResponse,
  IProductGroup,
  IProductGroupItem,
  IProductGroupPayload, ISaleUnit, ISaleUnitPayload
} from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { IApprovalItem } from '@shared/requesting-product.model';
import { IDeleteProductGroupPayload, IGetProductGroupListPayload } from '@shared/product-group.model';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class SaleUnitService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {
  }

  getItems(payload: IGetProductGroupListPayload): Observable<ICommonResponse<ISaleUnit[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.SaleUnits.GetList}`, {
      params: ApiUtils.genHttpParams(payload)
    });
  }

  getDetail(payload: {
    saleUnitID: string
  }): Observable<ICommonResponse<IProductGroupItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.SaleUnits.GetDetail}`, {
      params: ApiUtils.genHttpParams(payload)
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.SaleUnits.GetCounters}`);
  }

  create(payload: ISaleUnitPayload): Observable<ICommonResponse<ISaleUnit>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.SaleUnits.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_setting_success'));
  }

  update(payload: ISaleUnitPayload & {
    saleUnitID: string,
  }): Observable<ICommonResponse<ISaleUnit>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.SaleUnits.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_setting_success'));
  }

  delete(payload : {
    saleUnitID: string
  }): Observable<ICommonResponse<any>> {
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.SaleUnits.Delete}`, {
        body: payload
      })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_setting_success'));
  }
}
