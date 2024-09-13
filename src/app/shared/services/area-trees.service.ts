import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import {
  ICity,
  ICreateCityPayload,
  ICreateDistrictPayload,
  IDistrict,
  IUpdateCityPayload,
  IUpdateDistrictPayload, IWard
} from '@shared/area-tree.model';

@Injectable({ providedIn: 'root' })
export class AreaTreeService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getCityList(payload?: IPagination): Observable<ICommonResponse<ICity[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.AdminCities.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getCityDetail(id: string): Observable<ICommonResponse<ICity>> {
    const params = ApiUtils.genHttpParams({ cityID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.AdminCities.GetDetail}`, { params });
  }
  createCity(payload: ICreateCityPayload): Observable<ICommonResponse<ICity>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.AdminCities.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  updateCity(payload: IUpdateCityPayload): Observable<ICommonResponse<ICity>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.AdminCities.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  getDistrictList(payload?: IPagination): Observable<ICommonResponse<IDistrict[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.AdminDistricts.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDistrictDetail(id: string): Observable<ICommonResponse<IDistrict>> {
    const params = ApiUtils.genHttpParams({ districtID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.AdminDistricts.GetDetail}`, { params });
  }

  createDistrict(payload: ICreateDistrictPayload): Observable<ICommonResponse<IDistrict>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.AdminDistricts.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  updateDistrict(payload: IUpdateDistrictPayload): Observable<ICommonResponse<IDistrict>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.AdminDistricts.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  getWardList(payload?: IPagination): Observable<ICommonResponse<IWard[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.AdminWards.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  createWard(payload: { name: string; districtID: any }): Observable<ICommonResponse<IWard>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.AdminWards.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  updateWard(payload: { wardID: any; name: string }): Observable<ICommonResponse<IWard>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.AdminWards.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  deleteWard(wardID: string): Observable<ICommonResponse<any>> {
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.AdminWards.Delete}`, {
        params: ApiUtils.genHttpParams({ wardID }),
      })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }
}
