import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { Observable } from 'rxjs';
import { McUploadFile } from '@shared/models';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { ApiUtils } from '@shared/utils';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  upload(payload: McUploadFile): Observable<any> {
    const formData = new FormData();
    formData.append('file', payload.originFileObj!);
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Media.Upload}`, formData, {
      observe: 'events',
      reportProgress: true,
      headers: new HttpHeaders({
        [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
      }),
    });
  }

  uploadCkEditor(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Media.UploadCkEditor}`, formData);
  }
}
