import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { IAddress, IAgreementPayload, ICommonResponse, IEmail, IPhone } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiUtils } from '@shared/utils';
import { CommonService } from '@shared/common.service';
import { IAddressPayload, IContact, IContactPayload, IEmailPayload, IPhonePayload } from '@shared/contact.model';
import { eUserTypes } from '@shared/enums';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  getList(contactType: eUserTypes): Observable<ICommonResponse<IContact[]>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Contact.GetList}`, {
      params: ApiUtils.genHttpParams({ contactType }),
    });
  }

  getByType(contactType: eUserTypes): Observable<ICommonResponse<IContact>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Contact.GetByType}`, {
      params: ApiUtils.genHttpParams({ contactType }),
    });
  }

  create(payload: IAgreementPayload): Observable<ICommonResponse<IContact>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Contact.Create}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  update(payload: IContactPayload): Observable<ICommonResponse<IContact>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Contact.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  getDetail(id: string): Observable<ICommonResponse<IContact>> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Contact.GetDetail}/${id}`);
  }

  /** phone */

  createPhone(payload: IPhonePayload): Observable<ICommonResponse<IPhone>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Contact.CreatePhone}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  updatePhone(payload: IPhonePayload): Observable<ICommonResponse<IPhone>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Contact.UpdatePhone}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  deletePhone(contactID: string, phoneID: string): Observable<ICommonResponse<IPhone>> {
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.Contact.DeletePhone}`, { body: { contactID, phoneID } })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }

  /** email */

  createEmail(payload: IEmailPayload): Observable<ICommonResponse<IEmail>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Contact.CreateEmail}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  updateEmail(payload: IEmailPayload): Observable<ICommonResponse<IEmail>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Contact.UpdateEmail}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  deleteEmail(contactID: string, emailID: string): Observable<ICommonResponse<IEmail>> {
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.Contact.DeleteEmail}`, { body: { contactID, emailID } })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }

  /** address */

  createAddress(payload: IAddressPayload): Observable<ICommonResponse<IAddress>> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Contact.CreateAddress}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.add_data_success'));
  }

  updateAddress(payload: IAddressPayload): Observable<ICommonResponse<IAddress>> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Contact.UpdateAddress}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.update_data_success'));
  }

  deleteAddress(contactID: string, addressID: string): Observable<ICommonResponse<IAddress>> {
    return this.httpClient
      .delete<any>(`${this.baseApiUrl}/${ApiUtils.Contact.DeleteAddress}`, { body: { contactID, addressID } })
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'msg.delete_data_success'));
  }
}
