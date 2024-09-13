import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IPagination } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils, CommonHelpers } from '@shared/utils';
import { IGeneralSettingDetail, IGeneralSettingListItem, IManageGeneralSetting } from '@shared/general-setting.model';
import { CommonService } from '@shared/services';
import { IApprovalItem } from '@shared/requesting-product.model';

@Injectable({ providedIn: 'root' })
export class GeneralSettingService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(payload?: IPagination): Observable<ICommonResponse<IGeneralSettingListItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.GeneralSetting.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(id: string): Observable<ICommonResponse<IGeneralSettingDetail>> {
    const params = ApiUtils.genHttpParams({ adSettingID: id });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.GeneralSetting.GetDetail}`, {
      params,
    });
  }

  checkDraftExist(): Observable<ICommonResponse<IGeneralSettingDetail | undefined>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.GeneralSetting.CheckDraftExist}`);
  }

  create(payload: IManageGeneralSetting): Observable<ICommonResponse<IGeneralSettingDetail>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.GeneralSetting.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_setting_success'));
  }

  update(payload: IManageGeneralSetting): Observable<ICommonResponse<IGeneralSettingDetail>> {
    const headers = new HttpHeaders({
      ...CommonHelpers.generateHeaderMsgKey({ title: 'msg.notification', message: 'msg.update_setting_success' }),
    });
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.GeneralSetting.Update}`, payload, { headers })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_setting_success'));
  }

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.GeneralSetting.GetCounters}`);
  }

  delete(id: string): Observable<ICommonResponse<null>> {
    const headers = new HttpHeaders({
      ...CommonHelpers.generateHeaderMsgKey({ title: 'msg.notification', message: 'msg.delete_setting_success' }),
    });
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.GeneralSetting.Delete}`, {
        headers,
        body: { adSettingID: id },
      })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_setting_success'));
  }
}
