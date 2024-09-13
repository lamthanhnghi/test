import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ApiUtils } from '@shared/utils';
import {
  IApprovingProgramCountingData,
  IGetRequestingProgramDetailPayload,
  IGetRequestingProgramListPayload, IProgram,
  IRequestingProgram,
  ISetRequestingProgramStatusPayload
} from '@shared/program.model';
import { ApiResponse, ICommonResponse } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ProgramsService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  getItems(payload: IGetRequestingProgramListPayload): Observable<ICommonResponse<IRequestingProgram[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.RequestingPrograms.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(programID: string): Observable<ICommonResponse<IProgram>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.RequestingPrograms.GetDetail}/${programID}`);
  }

  getCounters(): Observable<ApiResponse<IApprovingProgramCountingData>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.RequestingPrograms.GetCounters}`);
  }

  review(payload: ISetRequestingProgramStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingPrograms.SetReviewing}`, payload);
  }

  approve(payload: ISetRequestingProgramStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingPrograms.SetApproved}`, payload);
  }

  reject(payload: ISetRequestingProgramStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingPrograms.SetRejected}`, payload);
  }

  hide(payload: ISetRequestingProgramStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingPrograms.SetHidden}`, payload);
  }

  archive(payload: ISetRequestingProgramStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingPrograms.SetArchived}`, payload);
  }
}
