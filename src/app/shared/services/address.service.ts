import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ICity,
  ICommonResponse,
  IDistrict,
  IGetDistrictsByCityIdPayload,
  IPagination,
} from '@shared/models';
import { map, Observable } from 'rxjs';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { ApiUtils } from '@shared/utils';
import { IAppConfig } from '@core/configs';
import { APP_CONFIG } from '@core/app-config.token';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  private cities: ICity[] = [];
  private districtsMap: Map<string, IDistrict[]> = new Map();

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  getCities(payload?: IPagination): Observable<ICommonResponse<ICity[]>> {
    if (this.cities.length) {
      return new Observable((subscriber) => {
        const response: ICommonResponse<ICity[]> = {
          result: {
            data: this.cities,
            total: this.cities.length,
          },
          message: '',
          statusCode: 200,
        };
        subscriber.next(response);
        subscriber.complete();
      });
    }
    return this.httpClient
      .get<ICommonResponse<ICity[]>>(`${this.baseApiUrl}/${ApiUtils.Cities.GetList}`, {
        params: ApiUtils.genHttpParams(payload),
        headers: new HttpHeaders({
          [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
        }),
      })
      .pipe(
        map((res) => {
          this.cities = res?.result?.data || [];
          return res;
        }),
      );
  }

  getDistrictsByCityId(payload: IGetDistrictsByCityIdPayload): Observable<ICommonResponse<IDistrict[]>> {
    if (this.districtsMap.has(payload.cityID) && this.districtsMap.get(payload.cityID)?.length) {
      return new Observable((subscriber) => {
        subscriber.next({
          result: {
            data: this.districtsMap.get(payload.cityID) as IDistrict[],
            total: this.districtsMap.get(payload.cityID)?.length || 0,
          },
          message: '',
          statusCode: 200,
        });
        subscriber.complete();
      });
    }
    return this.httpClient
      .get<ICommonResponse<IDistrict[]>>(`${this.baseApiUrl}/${ApiUtils.District.GetList}`, {
        params: ApiUtils.genHttpParams(payload),
        headers: new HttpHeaders({
          [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
        }),
      })
      .pipe(
        map((res) => {
          this.districtsMap.set(payload.cityID, res?.result?.data || []);
          return res;
        }),
      );
  }
}
