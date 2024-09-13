import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { IApprovalItem } from '@shared/requesting-product.model';
import {
  IBank,
  ICreateBankPayload,
  IDeleteBankPayload,
  IGetBankDetailPayload,
  IGetBankListPayload,
  IUpdateBankPayload,
} from '@shared/bank.model';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class BankService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getItems(payload: IGetBankListPayload): Observable<ICommonResponse<IBank[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Banks.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(payload: IGetBankDetailPayload): Observable<ICommonResponse<IBank>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Banks.GetDetail}`, {
      params: { ...payload },
    });
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Banks.GetCounters}`);
  }

  create(payload: ICreateBankPayload): Observable<ICommonResponse<IBank>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Banks.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_bank_success'));
  }

  update(payload: IUpdateBankPayload): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Banks.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_bank_success'));
  }

  delete(payload: IDeleteBankPayload): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Banks.Delete}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_bank_success'));
  }
}
