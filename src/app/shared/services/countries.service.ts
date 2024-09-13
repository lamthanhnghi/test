import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICountry, IPagination, IPaginationResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { HEADER_MESSAGE_KEY } from '@shared/constants';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  getList(payload?: IPagination): Observable<IPaginationResponse<ICountry>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Countries.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
      headers: new HttpHeaders({
        [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
      }),
    });
  }
}
