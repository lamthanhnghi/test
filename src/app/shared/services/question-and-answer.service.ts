import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { ICommonResponse, IQnA, IQnAPayload } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { IApprovalItem } from '@shared/requesting-product.model';
import { IDeleteProductGroupPayload, IGetProductGroupListPayload } from '@shared/product-group.model';
import { CommonService } from '@shared/common.service';
import { eUserTypes } from '@shared/enums';

@Injectable({ providedIn: 'root' })
export class QuestionAndAnswerService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getItems(payload: IGetProductGroupListPayload): Observable<ICommonResponse<IQnA[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.QuestionAndAnswer.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  getDetail(id: string): Observable<ICommonResponse<IQnA[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.QuestionAndAnswer.GetDetail}`, {
      params: ApiUtils.genHttpParams({ qnAID: id }),
    });
  }

  getCounters(qnaType: eUserTypes): Observable<ICommonResponse<IApprovalItem[]>> {
    const params = ApiUtils.genHttpParams({ qnaType });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.QuestionAndAnswer.GetCounters}`, { params });
  }

  create(payload: IQnAPayload): Observable<ICommonResponse<IQnA>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.QuestionAndAnswer.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_setting_success'));
  }

  update(payload: IQnAPayload): Observable<ICommonResponse<IQnA>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.QuestionAndAnswer.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_setting_success'));
  }

  delete(payload: IDeleteProductGroupPayload): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.baseApiUrl}/${ApiUtils.QuestionAndAnswer.Delete}/${payload.productCategoryID}`,
    );
  }
}
