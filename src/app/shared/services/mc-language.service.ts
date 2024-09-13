import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { IMcLanguage, IPagination } from '@shared/models';
import { map, Observable } from 'rxjs';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { ApiUtils } from '@shared/utils';

@Injectable({ providedIn: 'root' })
export class McLanguageService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  getLanguages(payload?: IPagination): Observable<IMcLanguage[]> {
    return this.httpClient
      .get<any>(`${this.baseApiUrl}/${ApiUtils.Languages.GetList}`, {
        params: ApiUtils.genHttpParams(payload),
        headers: new HttpHeaders({
          [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
        }),
      })
      .pipe(map((data) => data));
  }
}
