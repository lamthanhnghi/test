import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { IApprovalItem } from '@shared/requesting-product.model';
import {
  ICreateProgramPolicyPayload,
  IDeleteProgramPolicyPayload,
  IGetProgramPolicyDetailPayload,
  IGetProgramPolicyListPayload,
  IProgramPolicy,
  IUpdateProgramPolicyPayload,
} from '@shared/program-policy.model';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class ProgramPolicyService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getItems(payload: IGetProgramPolicyListPayload): Observable<ICommonResponse<IProgramPolicy[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProgramPolicies.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(payload: IGetProgramPolicyDetailPayload): Observable<ICommonResponse<IProgramPolicy>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProgramPolicies.GetDetail}`, {
      params: { ...payload },
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.ProgramPolicies.GetCounters}`);
  }

  create(payload: ICreateProgramPolicyPayload): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.ProgramPolicies.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_policy_success'));
  }

  update(payload: IUpdateProgramPolicyPayload): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.ProgramPolicies.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_policy_success'));
  }

  delete(payload: IDeleteProgramPolicyPayload): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.ProgramPolicies.Delete}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_policy_success'));
  }
}
