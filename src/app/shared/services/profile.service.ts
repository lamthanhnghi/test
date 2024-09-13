import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import {
  ApiResponse,
  IAddAddressPayload,
  IAddEmailPayload,
  IAddEmailResponse,
  IAddPhonePayload,
  IAddPhoneResponse,
  IAddress,
  IAddUrlPayload,
  IChangeContentStatusPayload,
  ICommonResponse,
  IContactInfoPayload,
  ICountDocument,
  IDeleteAddressPayload,
  IDeleteDocumentPayload,
  IDeleteEmailPayload,
  IDeletePhonePayload,
  IDeleteUrlPayload,
  IGetProfileDocumentParams,
  IProfile,
  IProfileDocument,
  IProfileDocumentResult,
  IResendOtpEmailPayload,
  IResendOtpPhonePayload,
  IUpdateAddressPayload,
  IUpdateAvatarResponse,
  IUpdateCoverResponse,
  IUpdateEmailPayload,
  IUpdatePhonePayload,
  IUpdateProfilePayload,
  IUpdateSellerLoginIDPayload,
  IUpdateUrlPayload,
  IVerifyEmailPayload,
  IVerifyPhonePayload,
} from '@shared/models';
import { ApiUtils } from '@shared/utils';
import { EXCEPT_ERROR_CODES } from '@shared/constants';
import { ERROR_CODES } from '@shared/enums';
import { CommonService } from '@shared/common.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {}

  updateInfo(payload: IUpdateProfilePayload): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.baseApiUrl}/${ApiUtils.Profile.Update}`, payload)
      .pipe(this.commonService.handleSuccessApi('msg.notification', 'profile_page.update_info_success'));
  }

  getProfile(): Observable<ICommonResponse<IProfile>> {
    const headers = new HttpHeaders({
      [EXCEPT_ERROR_CODES]: [
        ERROR_CODES.ERROR_CODE_SELLER_AGREEMENT_IS_NOT_UPDATED,
        ERROR_CODES.ERROR_CODE_SELLER_INFO_IS_NOT_UPDATED,
        ERROR_CODES.ERROR_CODE_SELLER_DOCUMENT_IS_NOT_UPDATED,
      ].join('|'),
    });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Profile.GetDetail}`, { headers });
  }

  updateAvatar(payload: FormData): Observable<IUpdateAvatarResponse> {
    return (
      this.httpClient
        .post<any>(`${this.baseApiUrl}/${ApiUtils.Profile.UpdateAvatar}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'profile_page.update_avatar_success'))
    );
  }

  updateCover(payload: FormData): Observable<IUpdateCoverResponse> {
    return (
      this.httpClient
        .post<any>(`${this.baseApiUrl}/${ApiUtils.Profile.UpdateCover}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'profile_page.update_cover_success'))
    );
  }

  updateProfileDocument(payload: any): Observable<IAddress> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileUploadDocument}`, payload);
  }

  addAddress(payload: IAddAddressPayload): Observable<IAddress> {
    return (
      this.httpClient
        .post<any>(`${this.baseApiUrl}/${ApiUtils.Profile.AddAddress}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Thêm địa chỉ mới thành công'))
    );
  }

  updateAddress(payload: IUpdateAddressPayload): Observable<any> {
    return (
      this.httpClient
        .patch<any>(`${this.baseApiUrl}/${ApiUtils.Profile.UpdateAddress}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Cập nhật địa chỉ thành công'))
    );
  }

  deleteAddress(payload: IDeleteAddressPayload): Observable<any> {
    return (
      this.httpClient
        .delete<any>(`${this.baseApiUrl}/${ApiUtils.Profile.DeleteAddress}`, { body: payload })
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Xóa địa chỉ thành công'))
    );
  }

  addEmail(payload: IAddEmailPayload): Observable<IAddEmailResponse> {
    return (
      this.httpClient
        .post<any>(`${this.baseApiUrl}/${ApiUtils.Profile.AddEmail}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Thêm email mới thành công'))
    );
  }

  updateEmail(payload: IUpdateEmailPayload): Observable<any> {
    return (
      this.httpClient
        .patch<any>(`${this.baseApiUrl}/${ApiUtils.Profile.UpdateEmail}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Cập nhật email thành công'))
    );
  }

  deleteEmail(payload: IDeleteEmailPayload): Observable<any> {
    return (
      this.httpClient
        .delete<any>(`${this.baseApiUrl}/${ApiUtils.Profile.DeleteEmail}`, { body: payload })
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Xóa email thành công'))
    );
  }

  resendOtpEmail(payload: IResendOtpEmailPayload): Observable<IAddEmailResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileResendOtpEmail}`, payload);
  }

  verifyOtpEmail(payload: IVerifyEmailPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileVerifyEmail}`, payload);
  }

  addPhone(payload: IAddPhonePayload): Observable<IAddPhoneResponse> {
    return (
      this.httpClient
        .post<any>(`${this.baseApiUrl}/${ApiUtils.Profile.AddPhone}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Thêm số điện thoại mới thành công'))
    );
  }

  updatePhone(payload: IUpdatePhonePayload): Observable<any> {
    return (
      this.httpClient
        .patch<any>(`${this.baseApiUrl}/${ApiUtils.Profile.UpdatePhone}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Cập nhật số điện thoại thành công'))
    );
  }

  deletePhone(payload: IDeletePhonePayload): Observable<any> {
    return (
      this.httpClient
        .delete<any>(`${this.baseApiUrl}/${ApiUtils.Profile.DeletePhone}`, { body: payload })
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Xóa số điện thoại thành công'))
    );
  }

  resendOtpPhone(payload: IResendOtpPhonePayload): Observable<IAddPhoneResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileResendOtpPhone}`, payload);
  }

  verifyOtpPhone(payload: IVerifyPhonePayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileVerifyPhone}`, payload);
  }

  addUrl(payload: IAddUrlPayload): Observable<any> {
    return (
      this.httpClient
        .post<any>(`${this.baseApiUrl}/${ApiUtils.Profile.AddUrl}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Thêm liên kết mới thành công'))
    );
  }

  updateUrl(payload: IUpdateUrlPayload): Observable<any> {
    return (
      this.httpClient
        .post<any>(`${this.baseApiUrl}/${ApiUtils.Profile.UpdateUrl}`, payload)
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Cập nhật liên kết thành công'))
    );
  }

  deleteUrl(payload: IDeleteUrlPayload): Observable<any> {
    return (
      this.httpClient
        .delete<any>(`${this.baseApiUrl}/${ApiUtils.Profile.DeleteUrl}`, { body: payload })
        // TODO: replace with translation
        .pipe(this.commonService.handleSuccessApi('msg.notification', 'Xóa liên kết thành công'))
    );
  }

  updateContactInfo(payload: IContactInfoPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileUpdateContactInfo}`, payload);
  }

  updateSellerLoginID(payload: IUpdateSellerLoginIDPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileUpdateSellerLoginID}`, payload);
  }

  countDocuments(): Observable<ICountDocument> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileCountDocuments}`);
  }

  getDocuments(params: IGetProfileDocumentParams): Observable<IProfileDocument[]> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileGetDocuments}`, {
      params: ApiUtils.genHttpParams(params),
    });
  }

  saveDocument(payload: FormData): Observable<ApiResponse<IProfileDocumentResult>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileSaveDocument}`, payload);
  }

  updateDocument(payload: FormData): Observable<ApiResponse<IProfileDocumentResult>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileUpdateDocument}`, payload);
  }

  changeContentStatus(payload: IChangeContentStatusPayload): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileChangeContentStatus}`, payload);
  }

  deleteDocument(payload: IDeleteDocumentPayload): Observable<ApiResponse<IProfileDocumentResult>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileDeleteDocument}`, payload);
  }
}
