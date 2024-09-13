import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import {
  IPackedUnitPayload,
  IPackedUnitValuePayload,
  ICommonResponse,
  IPackedUnitValue,
  IPagination,
} from '@shared/models';
import { Observable } from 'rxjs';
import { IAttribute } from '@shared/stores';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class PackedUnitService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<IAttribute[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  add(payload: IPackedUnitPayload): Observable<ICommonResponse<IAttribute>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.Add}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(payload: IPackedUnitPayload): Observable<ICommonResponse<IAttribute>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<IAttribute>> {
    const params = ApiUtils.genHttpParams({ attributeID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.GetDetail}`, { params });
  }

  /** attribute values */
  getListValues(pagination: IPagination): Observable<ICommonResponse<IPackedUnitValue[]>> {
    const params = ApiUtils.genHttpParams({ ...pagination });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.GetListValue}`, { params });
  }

  addValue(payload: IPackedUnitValuePayload): Observable<ICommonResponse<IPackedUnitValue>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.AddValue}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  updateValue(payload: IPackedUnitValuePayload): Observable<ICommonResponse<IPackedUnitValue>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.UpdateValue}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }
}
