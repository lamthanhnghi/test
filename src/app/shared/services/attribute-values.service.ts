import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPaginationResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { IAttributeValue } from '@shared/stores';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ApiUtils } from '@shared/utils';

@Injectable({ providedIn: 'root' })
export class AttributeValuesService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  getList(payload?: { attributeID: string }): Observable<IPaginationResponse<IAttributeValue>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.AttributeValues.GetListByAttributeId}`, {
      params: ApiUtils.genHttpParams(payload),
      headers: new HttpHeaders({
        [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
      }),
    });
  }
}
