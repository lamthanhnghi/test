import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { IAgreementItem, IAgreementPayload, ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IApprovalItem } from '@shared/requesting-product.model';

@Injectable({ providedIn: 'root' })
export class AgreementsService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<IAgreementItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Agreement.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  checkDraftExist(): Observable<ICommonResponse<IAgreementItem | undefined>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Agreement.CheckDraftExist}`);
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Agreement.GetCounters}`);
  }

  create(payload: IAgreementPayload): Observable<ICommonResponse<IAgreementItem>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Agreement.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(payload: IAgreementPayload): Observable<ICommonResponse<IAgreementItem>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Agreement.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<IAgreementItem>> {
    const params = ApiUtils.genHttpParams({ agreementID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Agreement.GetDetail}`, { params });
  }
}
