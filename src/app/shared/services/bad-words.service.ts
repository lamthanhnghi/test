import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils, CommonHelpers } from '@shared/utils';
import { CommonService } from '@shared/services';
import { IApprovalItem } from '@shared/requesting-product.model';
import { IBadWord } from '@shared/bad-word.model';

@Injectable()
export class BadWordsService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<IBadWord[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(id: string): Observable<ICommonResponse<IBadWord>> {
    const params = ApiUtils.genHttpParams({ badWordID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.GetDetail}`, {
      params,
    });
  }

  checkDraftExist(): Observable<ICommonResponse<IBadWord | undefined>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.CheckDraftExist}`);
  }

  create(payload: { word: string }): Observable<ICommonResponse<IBadWord>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_setting_success'));
  }

  update(payload: { word: string; badWordID: string }): Observable<ICommonResponse<IBadWord>> {
    const headers = new HttpHeaders({
      ...CommonHelpers.generateHeaderMsgKey({ title: 'msg.notification', message: 'msg.update_setting_success' }),
    });
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.Update}`, payload, { headers })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_setting_success'));
  }

  sendApproval(payload: { badWordID: string }): Observable<ICommonResponse<null>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.SendApproval}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.send_approval_success'));
  }

  review(payload: { badWordID: string }): Observable<ICommonResponse<IBadWord>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.Review}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.change_status_reviewing_success'));
  }

  reject(payload: { badWordID: string; reason: string }): Observable<ICommonResponse<IBadWord>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.Reject}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.rejected_data_success'));
  }

  approve(payload: { badWordID: string }): Observable<ICommonResponse<IBadWord>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.Approval}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.approved_data_success'));
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.GetCounters}`);
  }

  delete(badWordID: string): Observable<ICommonResponse<null>> {
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.BadWords.Delete}`, {
        body: { badWordID },
      })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }
}
