import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  ApiResponse,
  IAddAgreementPayload,
  IAgreement,
  ICreateActiveEmailPasswordPayload,
  ICreatePassword,
  ICreatePasswordResponse,
  IDecodedToken,
  IForgotPasswordCreatePassword,
  IForgotPasswordCreatePasswordResponse,
  IForgotPasswordSendOtp,
  IForgotPasswordVerifyOtp,
  IForgotPasswordVerifyOtpResponse,
  ILoginRequest,
  ILoginResponse,
  IProfile,
  IResendOtp,
  IResendOtpEmail,
  IResendOtpResponse,
  IUpdateInfo,
  IUpdateInfoPersonalAccount,
  IVerifyActiveEmailToken,
  IVerifyOtp,
  IVerifyOtpResponse,
} from '@shared/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { APP_CONFIG } from '@core/app-config.token';
import { IAppConfig } from '@core/configs';
import { ApiUtils } from '@shared/utils';
import { EXCEPT_ERROR_CODES } from '@shared/constants';
import { eCookieNames, eRoles, ERROR_CODES, eToastStatus } from '@shared/enums';
import { Store } from '@ngrx/store';
import { showToast } from '@shared/toast';

dayjs.extend(duration);

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseApiUrl = `${this.appConfig.api_url}`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private jwt: JwtHelperService,
    private store$: Store<any>,
  ) {}

  login(payload: ILoginRequest): Observable<ILoginResponse> {
    const headers = new HttpHeaders({
      [EXCEPT_ERROR_CODES]: `${ERROR_CODES.ERROR_CODE_SELLER_IS_INACTIVE}`,
    });
    return this.httpClient.post<ILoginResponse>(`${this.baseApiUrl}/${ApiUtils.Portal.Login}`, payload, {
      headers,
    });
  }

  resendOtpPhone(payload: IResendOtp): Observable<IResendOtpResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ResendOtpPhone}`, payload).pipe(
      tap(() => {
        this.store$.dispatch(
          showToast({ status: eToastStatus.Success, message: 'msg.send_otp_success', title: 'msg.success' }),
        );
      }),
    );
  }

  resendOtpEmail(payload: IResendOtpEmail): Observable<IResendOtpResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ResendOtpEmail}`, payload).pipe(
      tap(() => {
        this.store$.dispatch(
          showToast({ status: eToastStatus.Success, message: 'msg.send_otp_success', title: 'msg.success' }),
        );
      }),
    );
  }

  verifyOtp(payload: IVerifyOtp): Observable<IVerifyOtpResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.VerifyOtp}`, payload).pipe(
      tap(() => {
        this.store$.dispatch(
          showToast({ status: eToastStatus.Success, message: 'msg.verify_otp_success', title: 'msg.success' }),
        );
      }),
    );
  }

  createPassword(payload: ICreatePassword): Observable<ICreatePasswordResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.CreatePassword}`, payload).pipe(
      tap(() => {
        this.store$.dispatch(
          showToast({ status: eToastStatus.Success, message: 'msg.create_password_success', title: 'msg.success' }),
        );
      }),
    );
  }

  forgotCreatePassword(payload: ICreatePassword): Observable<IForgotPasswordCreatePasswordResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ForgotPasswordCreatePassword}`, payload);
  }

  verifyActiveEmailToken(token: string): Observable<ApiResponse<IVerifyActiveEmailToken>> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Portal.VerifyTokenEmail}`, {
      token,
    });
  }

  createActiveEmailPassword(payload: ICreateActiveEmailPasswordPayload) {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Portal.CreateActiveEmailPassword}`, payload);
  }

  getProfile(): Observable<IProfile> {
    // const params = ApiUtils.genHttpParams({ adminID: payload.id  });
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Users.GetDetail}`, {});
  }

  forgotPasswordSendOtpPhone(payload: IForgotPasswordSendOtp): Observable<IResendOtpResponse> {
    const headers = new HttpHeaders({
      [EXCEPT_ERROR_CODES]: `${ERROR_CODES.ERROR_CODE_SELLER_IS_NOT_EXISTING}`,
    });
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ForgotPasswordSendOtpPhone}`, payload, { headers })
      .pipe(
        tap(() => {
          this.store$.dispatch(
            showToast({ status: eToastStatus.Success, message: 'msg.send_otp_success', title: 'msg.success' }),
          );
        }),
      );
  }

  forgotPasswordSendOtpEmail(payload: IForgotPasswordSendOtp): Observable<IResendOtpResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Portal.ForgotPasswordSendOtp}`, payload).pipe(
      tap(() => {
        this.store$.dispatch(
          showToast({ status: eToastStatus.Success, message: 'msg.send_otp_success', title: 'msg.success' }),
        );
      }),
    );
  }

  forgotPasswordVerifyOtp(payload: IForgotPasswordVerifyOtp): Observable<IForgotPasswordVerifyOtpResponse> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ForgotPasswordVerifyOtp}`, payload).pipe(
      tap(() => {
        this.store$.dispatch(
          showToast({ status: eToastStatus.Success, message: 'msg.verify_otp_success', title: 'msg.success' }),
        );
      }),
    );
  }

  forgotPasswordCreatePassword(
    payload: IForgotPasswordCreatePassword,
  ): Observable<IForgotPasswordCreatePasswordResponse> {
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ForgotPasswordCreatePassword}`, payload)
      .pipe(
        tap(() => {
          this.store$.dispatch(
            showToast({ status: eToastStatus.Success, message: 'msg.create_password_success', title: 'msg.success' }),
          );
        }),
      );
  }

  updateInfoPersonal(payload: IUpdateInfoPersonalAccount): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.AddInfoPerson}`, payload);
  }

  uploadDocumentPersonal(payload: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.UploadDocumentPerson}`, payload);
  }

  updateInfoBusiness(payload: IUpdateInfo): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.AddInfoBusiness}`, payload);
  }

  updateInfo(payload: IUpdateInfo): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.ProfileUpdateInfo}`, payload);
  }

  uploadDocumentBusiness(payload: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.UploadDocumentBusiness}`, payload);
  }

  getAgreement(): Observable<IAgreement> {
    return this.httpClient.get<any>(`${this.baseApiUrl}/${ApiUtils.Seller.GetAgreement}`);
  }

  addAgreement(payload: IAddAgreementPayload): Observable<IAgreement> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.AddAgreement}`, payload);
  }

  signout(): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}/${ApiUtils.Seller.SignOut}`, {});
  }

  setToken(token: string, isTemp = false): void {
    // get duration of token
    if (isTemp) {
      this.sessionStorage.store(eCookieNames.Token, token);
    } else {
      this.localStorage.store(eCookieNames.Token, token);
    }
  }

  getToken(): string {
    return this.sessionStorage.retrieve(eCookieNames.Token) || this.localStorage.retrieve(eCookieNames.Token);
  }

  removeToken(): void {
    this.sessionStorage.clear(eCookieNames.Token);
    this.localStorage.clear(eCookieNames.Token);
  }

  removeSessionToken(): void {
    this.sessionStorage.clear(eCookieNames.Token);
  }

  decodeToken(token: string): IDecodedToken {
    return this.jwt.decodeToken(token) as IDecodedToken;
  }

  getRole(): eRoles | undefined {
    const decodedToken = this.retrieveDecodedToken();
    if (decodedToken) {
      return decodedToken.role;
    }

    return undefined;
  }

  retrieveDecodedToken(): IDecodedToken | undefined {
    const token = this.getToken();
    if (token) {
      return this.decodeToken(token);
    }
    return undefined;
  }
}
