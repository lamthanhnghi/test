import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { IBrand, ICommonResponse, IPagination, IPaginationResponse } from '@shared/models';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { AttributesEntity, IAttribute, IAttributePayload, IAttributeValue } from '@shared/stores';
import { ApiUtils } from '@shared/utils';
import { IApprovalItem } from '@shared/requesting-product.model';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class AttributesService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;
  private data: AttributesEntity[] = [];
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getCounters(): Observable<ICommonResponse<IApprovalItem[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.GetCounters}`);
  }

  getList2(payload?: IPagination):  Observable<ICommonResponse<IAttribute[]>>{
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
      headers: new HttpHeaders({
        [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
      }),
    });
  }

  getDetail(payload: {
    attributeID: string;
  }): Observable<ICommonResponse<IAttribute>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.GetDetail}`, {
      params: ApiUtils.genHttpParams(payload),
    });
  }

  add(payload: IAttributePayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.Add}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_attribute_success'));
  }

  update(payload: IAttributePayload & {
    attributeID: string;
  }): Observable<any> {
    return new Observable()
  }

  getList(payload?: IPagination): Observable<IPaginationResponse<AttributesEntity>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Attributes.GetList}`, {
      params: ApiUtils.genHttpParams(payload),
      headers: new HttpHeaders({
        [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
      }),
    });
  }

  getValuesList(payload?: { attributeID: string }): Observable<IPaginationResponse<IAttributeValue>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.AttributeValues.GetListByAttributeId}`, {
      params: ApiUtils.genHttpParams(payload),
      headers: new HttpHeaders({
        [HEADER_MESSAGE_KEY.EXCEPT_LOADING]: 'true',
      }),
    });
  }

  getAttributeAndValuesList(): Observable<AttributesEntity[]> {
    if (this.data.length) {
      return new Observable((subscriber) => {
        subscriber.next(this.data);
        subscriber.complete();
      });
    }
    return this.getList().pipe(
      switchMap(({ results }) => {
        return forkJoin([
          ...results.map((attribute: any) => this.getValuesList({ attributeID: attribute.attributeID })),
        ]).pipe(
          switchMap((values) => {
            // map values to attributes
            results.forEach((attribute: any, index: any) => {
              attribute.values = values[index].results;
            });
            this.data = results;
            return of(results);
          }),
        );
      }),
    );
  }
}
