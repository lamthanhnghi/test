import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { CommonService } from '@shared/common.service';
import { Observable } from 'rxjs';
import { IComment, ICommonResponse, IPagination } from '@shared/models';
import { ApiUtils } from '@shared/utils';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  /** product */
  getProductReviewRequests(pagination: IPagination & { productVersionID: string },): Observable<ICommonResponse<IComment[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Comment.GetListProductReviewRequest}`, {
      params: ApiUtils.genHttpParams({ ...pagination }),
    });
  }

  createProductReviewRequest(payload: {
    productVersionID: string;
    content: string;
  }): Observable<ICommonResponse<IComment>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Comment.CreateProductReviewRequest}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.send_request_success'));
  }

  /** program */
  getProgramReviewRequests(pagination: IPagination & { programID: string }): Observable<ICommonResponse<IComment[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Comment.GetListProgramReviewRequest}`, {
      params: ApiUtils.genHttpParams({ ...pagination }),
    });
  }

  createProgramReviewRequest(payload: { programID: string; content: string }): Observable<ICommonResponse<IComment>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Comment.CreateProgramReviewRequest}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.send_request_success'));
  }
}
