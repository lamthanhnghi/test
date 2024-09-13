import { Inject, Injectable, Provider } from '@angular/core';

import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '@shared/stores';
import { showToast } from '@shared/stores';
import { IConfirmModal, ILoadingState, IToastState } from '@shared/models';
import { APP_CONFIG } from '@core/app-config.token';
import { IAppConfig } from '@core/configs';
import { HEADER_MESSAGE_KEY } from '@shared/constants';
import { eConfirmModalTypes, ERROR_CODES, eToastStatus } from '@shared/enums';
import { RouteUtils } from '@shared/utils';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '@shared/components';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  showModalVerifyAgreementAndUpdateDocument = false;
  constructor(
    private store$: Store<IToastState | ILoadingState>,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private router: Router,
    private modal: NzModalService,
  ) {
    this.store$
      .select(AuthActions.selectShowModalVerifyAgreementAndUpdateDocument)
      .subscribe((showModalVerifyAgreementAndUpdateDocument) => {
        this.showModalVerifyAgreementAndUpdateDocument = showModalVerifyAgreementAndUpdateDocument;
      });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Record<string, string>>> {
    const exceptErrorCodes = req.headers.get(HEADER_MESSAGE_KEY.EXCEPT_ERROR_CODES)?.split('|') || [];

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 500) {
          this.store$.dispatch(
            showToast({
              status: eToastStatus.Error,
              title: 'msg.error',
              message: 'error_code.ER0000',
            }),
          );
        } else {
          if (req.url?.startsWith(this.appConfig.api_url || '')) {
            const code = error.error?.['errorCode']; // use later, translate this code to message
            if (!code) {
              this.store$.dispatch(
                showToast({
                  status: eToastStatus.Error,
                  title: 'msg.error',
                  message: 'error_code.ER9999',
                }),
              );
            } else {
              const translateKey = `error_code.${code}`;
              if (!exceptErrorCodes.includes(code)) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Error,
                    title: 'msg.error',
                    message: translateKey,
                  }),
                );
              }

              /** handle user has not checked agreement yet */
              if (code === ERROR_CODES.ERROR_CODE_SELLER_AGREEMENT_IS_NOT_UPDATED) {
                /** redirect to agreement page */
                if (!this.showModalVerifyAgreementAndUpdateDocument) {
                  this.router
                    .navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.SignupTermOfUse], {
                      replaceUrl: true,
                    })
                    .then();
                } else {
                  const modalRef = this.modal.create({
                    nzClassName: 'modal-confirm',
                    nzContent: ConfirmModalComponent,
                    nzData: {
                      type: eConfirmModalTypes.Confirm,
                      title: 'msg.confirm',
                      closeOnSubmit: true,
                      hideCancel: true,
                      message: `msg.please_accept_agreement`,
                    } as IConfirmModal,
                  });

                  modalRef.afterClose.subscribe((isOk) => {
                    if (isOk) {
                      this.router
                        .navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.SignupTermOfUse], {
                          replaceUrl: true,
                        })
                        .then();
                    }
                  });
                }
              }
              /** handle user has not updated information yet */
              if (
                [
                  ERROR_CODES.ERROR_CODE_SELLER_INFO_IS_NOT_UPDATED,
                  ERROR_CODES.ERROR_CODE_SELLER_DOCUMENT_IS_NOT_UPDATED,
                ].includes(code)
              ) {
                /** redirect to update information page */
                if (!this.showModalVerifyAgreementAndUpdateDocument) {
                  this.router.navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.UpdateInfo]).then();
                } else {
                  const modalRef = this.modal.create({
                    nzClassName: 'modal-confirm',
                    nzContent: ConfirmModalComponent,
                    nzData: {
                      type: eConfirmModalTypes.Confirm,
                      title: 'msg.confirm',
                      closeOnSubmit: true,
                      hideCancel: true,
                      message: `msg.please_update_information`,
                    } as IConfirmModal,
                  });

                  modalRef.afterClose.subscribe((isOk) => {
                    if (isOk) {
                      this.router
                        .navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.UpdateInfo])
                        .then();
                    }
                  });
                }
              }
            }
          }
        }
        return throwError(() => error);
      }),
    );
  }
}

export const globalInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: GlobalInterceptor,
  multi: true,
  deps: [Store, APP_CONFIG, Router, NzModalService],
};
