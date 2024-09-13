import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import {
  ApiResponse,
  IApprovalItemCountingData,
  ICommonResponse,
  IGetSellerRequestingProfileDetailPayload,
  IGetSellerRequestingProfileListPayload,
  ISellerRequestingProfile,
  ISellerRequestingProfileDetail,
  ISetSellerRequestingProfileStatus,
} from '@shared/models';
import { ApiUtils } from '@shared/utils';

@Injectable({ providedIn: 'root' })
export class RequestingProfilesService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
  ) {}

  getItems(payload: IGetSellerRequestingProfileListPayload): Observable<ICommonResponse<ISellerRequestingProfile[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProfiles.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(
    payload: IGetSellerRequestingProfileDetailPayload,
  ): Observable<ApiResponse<ISellerRequestingProfileDetail>> {
    return this.httpClient.get<any>(
      `${this.baseApiUrl}/${ApiUtils.RequestingProfiles.GetDetail}/${payload.sellerProfileID}`,
    );
  }

  getCounters(): Observable<ApiResponse<IApprovalItemCountingData>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProfiles.GetCounters}`);
  }

  reviewing(sellerProfileID: string): Observable<ApiResponse<any>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProfiles.Reviewing}`, {
      sellerProfileID,
    });
  }

  setStatus(payload: ISetSellerRequestingProfileStatus): Observable<ApiResponse<any>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProfiles.SetStatus}`, payload);
  }

  hide({ contentStatus, ...payload }: ISetSellerRequestingProfileStatus): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProfiles.Hide}`, payload);
  }

  archive({ contentStatus, ...payload }: ISetSellerRequestingProfileStatus): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.RequestingProfiles.Archive}`, payload);
  }
}
