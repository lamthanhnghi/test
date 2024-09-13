import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IProductRating } from '@shared/product-rating.model';
import { eContentStatuses, eRatingReportType, eReportAction, eReportUserType } from '@shared/enums';
import { IGetReportPayload, IReportCountingData, IReportData } from '@shared/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly connectBaseApiUrl = `${this.appConfig.connect_api_url}`;
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  private readonly baseApiUrl2 = `${this.appConfig.api_url2}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getRatingReports(payload:  IGetReportPayload): Observable<ICommonResponse<IReportData[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.GetRatingReports}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getSellerReports(payload: IGetReportPayload): Observable<ICommonResponse<IReportData[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.GetSellerReports}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getMessagesReports(payload: IGetReportPayload): Observable<ICommonResponse<IReportData[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.GetMessageReports}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetailedSellerReport(payload: {
    reportedSellerID: string
  }): Observable<ICommonResponse<IReportData>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.GetDetailedSellerReport}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetailedMessageReport(payload: {
    reportedMessageID: string
  }): Observable<ICommonResponse<IReportData>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.GetDetailedMessageReport}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetailedRatingReport(payload: {
    reportedRatingID: string
    reportedRatingType: eRatingReportType
  }): Observable<ICommonResponse<IReportData>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.GetDetailedRatingReport}`, {
      params: ApiUtils.genHttpParams(payload)
    });
  }

  reviewMessageReport(payload: {
    reportedMessageID: string
  }) {
    return this.httpClient.post<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.ReviewMessageReport}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  reviewSellerReport(payload: {
    reportedSellerID: string
  }) {
    return this.httpClient.post<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.ReviewSellerReport}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));

  }

  reviewRatingReport(payload: {
    reportedRatingID: string,
    reportedRatingType: eRatingReportType
  }) {
    return this.httpClient.post<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.ReviewRatingReport}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));

  }

  handleSellerReport(payload: {
    reportedSellerID: string,
    action: eReportAction
    note?: string
  }) {
    return this.httpClient.post<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.HandleSellerReport}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));

  }

  handleRatingReport(payload: {
    reportedRatingID: string,
    reportedRatingType: eRatingReportType,
    action: eReportAction
    note?: string
  }) {
    return this.httpClient.post<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.HandleRatingReport}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));

  }

  handleMessageReport(payload: {
    reportedMessageID: string,
    action: eReportAction
    note?: string
  }) {
    return this.httpClient.post<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.HandleMessageReport}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));

  }

  countMessagesReports(): Observable<ICommonResponse<IReportCountingData[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.CountMessageReports}`);
  }

  countSellerReports(): Observable<ICommonResponse<IReportCountingData[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.CountSellerReports}`);
  }

  countRatingReports(): Observable<ICommonResponse<IReportCountingData[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl2}/${ApiUtils.Reports.CountRatingReports}`);
  }


}
