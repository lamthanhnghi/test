import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ApiResponse, ICommonResponse } from '@shared/models';
import { ApiUtils } from '@shared/utils';
import {
  IAddUserPayload,
  IGetUserListPayload,
  ISetPasswordPayload, IUpdateAdminStatusPayload,
  IUpdateUserPayload,
  IUser,
  IUserCountingData,
  IVerifyTokenEmailPayload,
  IVerifyTokenEmailResponse
} from '@shared/users.model';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getItems(payload: IGetUserListPayload): Observable<ICommonResponse<any> & { result: { admins: IUser[] } }> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Users.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  createAdmin(payload: IAddUserPayload): Observable<ICommonResponse<any>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Users.Create}`, payload);
  }

  getDetail(payload: { adminID: string }): Observable<ICommonResponse<IUser>> {
    const params = ApiUtils.genHttpParams(payload);
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Users.GetDetail}`, { params });
  }

  getCounters(): Observable<ApiResponse<IUserCountingData>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Users.GetCounters}`);
  }

  setPassword(payload: ISetPasswordPayload): Observable<ApiResponse<any>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Users.SetPassword}`, payload);
  }

  verifyTokenEmail(payload: IVerifyTokenEmailPayload): Observable<ApiResponse<IVerifyTokenEmailResponse>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Portal.VerifyTokenEmail}`, payload);
  }

  resendEmailActive(payload: IVerifyTokenEmailPayload): Observable<ApiResponse<any>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Portal.ResendEmailActive}`, payload);
  }

  updateAdminStatus(payload: IUpdateAdminStatusPayload): Observable<ApiResponse<any>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Users.UpdateStatus}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  updateAdmin(payload: IUpdateUserPayload): Observable<ApiResponse<any>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Users.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }
}
