import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IFeedbackCountingData, IFeedbackData, IGetFeedbackPayload } from '@shared/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  private readonly baseApiUrl2 = `${this.appConfig.api_url2}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}


  getFeedbacks(payload: IGetFeedbackPayload): Observable<ICommonResponse<IFeedbackData[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Feedbacks.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getFeedbackDetail(payload: {
    feedbackID: string
  }): Observable<ICommonResponse<IFeedbackData>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Feedbacks.GetDetail}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getCounters(): Observable<ICommonResponse<IFeedbackCountingData[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Feedbacks.GetCounters}`);
  }

  markUseful(payload: {
    feedbackID: string
  }): Observable<ICommonResponse<any>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Feedbacks.MarkUseful}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  review(payload: {
    feedbackID: string
  }): Observable<ICommonResponse<any>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Feedbacks.Review}`, {
      params: ApiUtils.genHttpParams(payload),
    })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  reply(payload: {
    feedbackID: string
    adminReply: string
  }): Observable<ICommonResponse<any>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Feedbacks.Reply}`, payload)
      // .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));

  }

  handle(payload: {
    feedbackID: string
  }): Observable<ICommonResponse<any>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Feedbacks.Handle}`, {
      params: ApiUtils.genHttpParams(payload),
    })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));

  }
}
