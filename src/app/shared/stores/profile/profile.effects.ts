import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as ProfileActions from './profile.actions';
import { countDocuments, loadDocuments, loadProfile, setUser, showToast } from '@shared/stores';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { CommonService, ProfileService } from '@shared/services';
import {
  AddressModalComponent,
  ConfirmModalComponent,
  ContactInfoModalComponent,
  EmailModalComponent,
  ManageLoginIdComponent,
  OtpModalComponent,
  PhoneModalComponent,
  UrlModalComponent,
} from '@shared/components';
import { eContentStatuses, eToastStatus } from '@shared/enums';
import { IAddAddressPayload } from '@shared/models';
import { RouteUtils } from '@shared/utils';

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions);

  constructor(
    private profileService: ProfileService,
    private store$: Store,
    private modal: NzModalService,
    private router: Router,
    private commonService: CommonService,
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      switchMap(() =>
        this.profileService
          .getProfile()
          .pipe(map((rs) => ProfileActions.loadProfileSuccess({ profile: rs.result.data }))),
      ),
    ),
  );

  loadProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.loadProfileSuccess),
        tap(({ profile }) => {
          this.store$.dispatch(setUser({ user: profile }));
        }),
      ),
    { dispatch: false },
  );

  updateAvatar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.updateAvatar),
        tap(({ payload }) => {
          this.profileService.updateAvatar(payload).subscribe(() => {
            // this.store$.dispatch(
            //   showToast({
            //     status: eToastStatus.Success,
            //     title: 'msg.success',
            //     message: 'profile_page.update_avatar_success',
            //   }),
            // );
            // this.store$.dispatch(loadProfile());
          });
        }),
      ),
    { dispatch: false },
  );

  updateCover$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.updateCover),
        tap(({ payload }) => {
          console.log(' =>(profile.effects.ts:80) payload', payload); // todo: remove this
          this.profileService.updateCover(payload).subscribe(() => {
            // this.store$.dispatch(
            //   showToast({
            //     status: eToastStatus.Success,
            //     title: 'msg.success',
            //     message: 'profile_page.update_cover_success',
            //   }),
            // );
            // this.store$.dispatch(loadProfile());
          });
        }),
      ),
    { dispatch: false },
  );

  /** ****************************************************************************************************
   * Address *********************************************************************************************
   **************************************************************************************************** */

  showAddAddressModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showAddAddressModal),
        tap(() => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-lg',
            nzContent: AddressModalComponent,
            nzData: {
              title: 'profile_page.add_address',
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((address) => {
            const payload: IAddAddressPayload = {
              cityID: address.cityID,
              districtID: address.districtID,
              addressLabel: address.addressLabel,
              addressString: address.addressString,
              postalCode: '84',
              isDefault: Number(address.isDefault) || 0,
            };
            // send otp email
            this.profileService.addAddress(payload).subscribe((response) => {
              if (response) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Success,
                    title: 'msg.success',
                    message: 'profile_page.add_address_success',
                  }),
                );
                // close address modal
                this.store$.dispatch(loadProfile());
                modalRef.close();
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  showEditAddressModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showUpdateAddressModal),
        tap(({ address }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-lg',
            nzContent: AddressModalComponent,
            nzData: {
              title: 'profile_page.edit_address',
              closeOnSubmit: false,
              data: address,
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((newAddress) => {
            const payload: any = {
              addressID: address.addressID,
              cityID: newAddress.cityID,
              districtID: newAddress.districtID,
              addressLabel: newAddress.addressLabel,
              addressString: newAddress.addressString,
              postalCode: '84',
              isDefault: newAddress.isDefault,
            };
            // send otp email
            this.profileService.updateAddress(payload).subscribe((response) => {
              if (response) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Success,
                    title: 'msg.success',
                    message: 'profile_page.edit_address_success',
                  }),
                );
                // reload profile
                this.store$.dispatch(loadProfile());
                // close email modal
                modalRef.close();
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  deleteAddress$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.deleteAddress),
        tap(({ payload }) => {
          const modalRef = this.modal.create({
            nzClassName: 'mc-address-modal',
            nzContent: ConfirmModalComponent,
            nzData: {
              title: 'msg.confirm',
              message: 'msg.confirm_delete_address',
            },
          });

          modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
            if (isOk) {
              this.profileService.deleteAddress(payload).subscribe((response) => {
                if (response) {
                  this.store$.dispatch(
                    showToast({
                      status: eToastStatus.Success,
                      title: 'msg.success',
                      message: 'profile_page.delete_address_success',
                    }),
                  );
                  // reload profile
                  this.store$.dispatch(loadProfile());
                  // close email modal
                  modalRef.close();
                }
              });
            }
          });
        }),
      ),
    { dispatch: false },
  );

  /** ****************************************************************************************************
   * Email ***********************************************************************************************
   **************************************************************************************************** */

  showAddEmailModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showAddEmailModal),
        tap(() => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: EmailModalComponent,
            nzData: {
              title: 'profile_page.add_email',
              closeOnSubmit: false,
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((payload) => {
            // send otp email
            this.profileService.addEmail(payload as any).subscribe((response) => {
              if (response) {
                // close email modal
                modalRef.close();
                // send otp email success and open otp modal
                const otpModalRef = this.modal.create({
                  nzClassName: 'modal-md',
                  nzContent: OtpModalComponent,
                  nzData: {
                    objectValue: response.result.emailAddress,
                    uuid: response.result.uuid,
                    objectId: response.result.emailID,
                  },
                });

                otpModalRef.getContentComponent().okEvent$.subscribe(({ otp, objectId, uuid }) => {
                  // verify otp
                  if (otp && objectId && uuid) {
                    this.profileService.verifyOtpEmail({ emailID: objectId, uuid, otp }).subscribe(() => {
                      this.store$.dispatch(
                        showToast({
                          status: eToastStatus.Success,
                          title: 'msg.success',
                          message: 'profile_page.add_email_success',
                        }),
                      );
                      // verify success, close otp modal and load profile
                      this.store$.dispatch(loadProfile());
                      // close otp modal
                      otpModalRef.close();
                    });
                  }
                });

                // listen resend otp click
                if (response.result.emailID) {
                  otpModalRef.getContentComponent().resendEvent$.subscribe(() => {
                    this.profileService
                      .resendOtpEmail({ emailID: response.result.emailID as string })
                      .subscribe((responseResend) => {
                        this.store$.dispatch(
                          showToast({
                            status: eToastStatus.Success,
                            title: 'msg.success',
                            message: 'profile_page.resend_otp_success',
                          }),
                        );
                        otpModalRef.getContentComponent().data = {
                          ...otpModalRef.getContentComponent().data,
                          objectValue: responseResend.result.emailAddress,
                          uuid: responseResend.result.uuid,
                          objectId: responseResend.result.emailID,
                        };
                        otpModalRef.getContentComponent().resendSubject.next();
                      });
                  });
                }
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  showEditEmailModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showUpdateEmailModal),
        tap(({ email }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: EmailModalComponent,
            nzData: {
              title: 'profile_page.edit_email',
              closeOnSubmit: false,
              data: email,
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((payload) => {
            // send otp email
            this.profileService.updateEmail({ ...payload, emailID: email.emailID } as any).subscribe((response) => {
              if (response) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Success,
                    title: 'msg.success',
                    message: 'profile_page.edit_email_success',
                  }),
                );
                // reload profile
                this.store$.dispatch(loadProfile());
                // close email modal
                modalRef.close();
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  deleteEmail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.deleteEmail),
        tap(({ payload }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: ConfirmModalComponent,
            nzData: {
              title: 'msg.confirm',
              closeOnSubmit: false,
              message: 'msg.confirm_delete_email',
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
            if (isOk) {
              this.profileService.deleteEmail(payload).subscribe((response) => {
                if (response) {
                  this.store$.dispatch(
                    showToast({
                      status: eToastStatus.Success,
                      title: 'msg.success',
                      message: 'profile_page.delete_email_success',
                    }),
                  );
                  // reload profile
                  this.store$.dispatch(loadProfile());
                  // close email modal
                  modalRef.close();
                }
              });
            }
          });
        }),
      ),
    { dispatch: false },
  );

  /** ****************************************************************************************************
   * Phone ***********************************************************************************************
   **************************************************************************************************** */

  showAddPhoneModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showAddPhoneModal),
        tap(() => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: PhoneModalComponent,
            nzData: {
              title: 'profile_page.add_phone',
              closeOnSubmit: false,
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((payload) => {
            // send otp email
            this.profileService.addPhone(payload as any).subscribe((response) => {
              if (response) {
                // close email modal
                modalRef.close();
                // send otp email success and open otp modal
                const otpModalRef = this.modal.create({
                  nzClassName: 'modal-md',
                  nzContent: OtpModalComponent,
                  nzData: {
                    objectValue: response.result.phone,
                    uuid: response.result.uuid,
                    objectId: response.result.phoneID,
                  },
                });

                otpModalRef.getContentComponent().okEvent$.subscribe(({ otp, objectId, uuid }) => {
                  // verify otp
                  if (otp && objectId && uuid) {
                    this.profileService.verifyOtpPhone({ phoneID: objectId, otp, uuid }).subscribe(() => {
                      this.store$.dispatch(
                        showToast({
                          status: eToastStatus.Success,
                          title: 'msg.success',
                          message: 'profile_page.add_phone_success',
                        }),
                      );
                      // verify success, close otp modal and load profile
                      this.store$.dispatch(loadProfile());
                      // close otp modal
                      otpModalRef.close();
                    });
                  }
                });

                // listen resend otp click
                if (response.result.phoneID) {
                  otpModalRef.getContentComponent().resendEvent$.subscribe(() => {
                    this.profileService
                      .resendOtpPhone({ phoneID: response.result.phoneID as string })
                      .subscribe((responseResend) => {
                        this.store$.dispatch(
                          showToast({
                            status: eToastStatus.Success,
                            title: 'msg.success',
                            message: 'profile_page.resend_otp_success',
                          }),
                        );
                        otpModalRef.getContentComponent().data = {
                          ...otpModalRef.getContentComponent().data,
                          objectValue: responseResend.result.phone,
                          uuid: responseResend.result.uuid,
                          objectId: responseResend.result.phoneID,
                        };
                        otpModalRef.getContentComponent().resendSubject.next();
                      });
                  });
                }
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  showEditPhoneModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showUpdatePhoneModal),
        tap(({ phone }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: PhoneModalComponent,
            nzData: {
              title: 'profile_page.edit_phone',
              closeOnSubmit: false,
              data: phone,
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((payload) => {
            // send otp email
            this.profileService.updatePhone({ ...payload, phoneID: phone.phoneID } as any).subscribe((response) => {
              if (response) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Success,
                    title: 'msg.success',
                    message: 'profile_page.edit_phone_success',
                  }),
                );
                // reload profile
                this.store$.dispatch(loadProfile());
                // close email modal
                modalRef.close();
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  deletePhone$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.deletePhone),
        tap(({ payload }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: ConfirmModalComponent,
            nzData: {
              title: 'msg.confirm',
              closeOnSubmit: false,
              message: 'msg.confirm_delete_phone',
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
            if (isOk) {
              this.profileService.deletePhone(payload).subscribe((response) => {
                if (response) {
                  this.store$.dispatch(
                    showToast({
                      status: eToastStatus.Success,
                      title: 'msg.success',
                      message: 'profile_page.delete_phone_success',
                    }),
                  );
                  // reload profile
                  this.store$.dispatch(loadProfile());
                  // close email modal
                  modalRef.close();
                }
              });
            }
          });
        }),
      ),
    { dispatch: false },
  );

  /** ****************************************************************************************************
   * Url ***********************************************************************************************
   **************************************************************************************************** */

  showAddUrlModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showAddUrlModal),
        tap(() => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: UrlModalComponent,
            nzData: {
              title: 'profile_page.add_url',
              closeOnSubmit: false,
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((payload) => {
            // send otp email
            this.profileService.addUrl(payload).subscribe((response) => {
              if (response) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Success,
                    title: 'msg.success',
                    message: 'profile_page.add_url_success',
                  }),
                );
                this.store$.dispatch(loadProfile());
                // close email modal
                modalRef.close();
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  showEditUrlModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showUpdateUrlModal),
        tap(({ url }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: UrlModalComponent,
            nzData: {
              title: 'profile_page.edit_url',
              closeOnSubmit: false,
              data: url,
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((payload) => {
            // send otp email
            this.profileService.updateUrl({ ...payload, urlID: url.urlID }).subscribe((response) => {
              if (response) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Success,
                    title: 'msg.success',
                    message: 'profile_page.edit_url_success',
                  }),
                );
                // reload profile
                this.store$.dispatch(loadProfile());
                // close email modal
                modalRef.close();
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  deleteUrl$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.deleteUrl),
        tap(({ payload }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: ConfirmModalComponent,
            nzData: {
              title: 'msg.confirm',
              closeOnSubmit: false,
              message: 'msg.confirm_delete_url',
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
            if (isOk) {
              this.profileService.deleteUrl(payload).subscribe((response) => {
                if (response) {
                  this.store$.dispatch(
                    showToast({
                      status: eToastStatus.Success,
                      title: 'msg.success',
                      message: 'profile_page.delete_url_success',
                    }),
                  );
                  // reload profile
                  this.store$.dispatch(loadProfile());
                  // close email modal
                  modalRef.close();
                }
              });
            }
          });
        }),
      ),
    { dispatch: false },
  );

  showManageContactInfoModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showManageContactInfoModal),
        tap(({ contactInfo }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-lg',
            nzContent: ContactInfoModalComponent,
            nzData: {
              title: 'profile_page.edit_contact_info',
              closeOnSubmit: false,
              data: contactInfo,
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((payload) => {
            // send otp email
            this.profileService.updateContactInfo(payload).subscribe((response) => {
              if (response) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Success,
                    title: 'msg.success',
                    message: 'profile_page.edit_contact_info_success',
                  }),
                );
                // reload profile
                this.store$.dispatch(loadProfile());
                // close email modal
                modalRef.close();
              }
            });
          });
        }),
      ),
    { dispatch: false },
  );

  showManageSellerLoginIDModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.showManageSellerLoginIDModal),
        tap(({ sellerLoginID }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: ManageLoginIdComponent,
            nzData: {
              title: 'profile_page.edit_seller_login_id',
              closeOnSubmit: false,
              data: { sellerLoginID },
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((payload: any) => {
            alert('this feature is not implemented yet ^_^');
            modalRef.close();
            // send otp email
            // this.profileService.updateSellerLoginID(payload).subscribe((response) => {
            //   // todo: implement this
            //   if (response) {
            //     // close email modal
            //     modalRef.close();
            //     // send otp email success and open otp modal
            //     const otpModalRef = this.modal.create({
            //       nzClassName: 'modal-md',
            //       nzContent: OtpModalComponent,
            //       nzData: {
            //         objectValue: response.result.phone,
            //         uuid: response.result.uuid,
            //         objectId: response.result.phoneID,
            //       },
            //     });
            //
            //     otpModalRef.getContentComponent().okEvent$.subscribe(({ otp, objectId, uuid }) => {
            //       // verify otp
            //       if (otp && objectId && uuid) {
            //         this.profileService.verifyOtpPhone({ phoneID: objectId, otp, uuid }).subscribe(() => {
            //           this.store$.dispatch(
            //             showToast({
            //               status: eToastStatus.Success,
            //               title: 'msg.success',
            //               message: 'profile_page.add_phone_success',
            //             })
            //           );
            //           // verify success, close otp modal and load profile
            //           this.store$.dispatch(loadProfile());
            //           // close otp modal
            //           otpModalRef.close();
            //         });
            //       }
            //     });
            //
            //     // listen resend otp click
            //     if (response.result.phoneID) {
            //       otpModalRef.getContentComponent().resendEvent$.subscribe(() => {
            //         this.profileService
            //           .resendOtpPhone({ phoneID: response.result.phoneID as string })
            //           .subscribe((responseResend) => {
            //             this.store$.dispatch(
            //               showToast({
            //                 status: eToastStatus.Success,
            //                 title: 'msg.success',
            //                 message: 'profile_page.resend_otp_success',
            //               })
            //             );
            //             otpModalRef.getContentComponent().data = {
            //               ...otpModalRef.getContentComponent().data,
            //               objectValue: responseResend.result.phone,
            //               uuid: responseResend.result.uuid,
            //               objectId: responseResend.result.phoneID,
            //             };
            //             otpModalRef.getContentComponent().resendSubject.next();
            //           });
            //       });
            //     }
            //   }
            // });
          });
        }),
      ),
    { dispatch: false },
  );

  countDocuments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.countDocuments),
      switchMap(() => this.profileService.countDocuments()),
      switchMap((data) => of(ProfileActions.countDocumentsSuccess({ data }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ProfileActions.loadDocumentsFailure({ error }));
      }),
    ),
  );

  saveDocuments$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.saveDocuments),
        tap(({ payload }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: ConfirmModalComponent,
            nzData: {
              title: 'msg.confirm',
              closeOnSubmit: false,
              message: 'msg.confirm_save_document',
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
            if (isOk) {
              this.profileService.saveDocument(payload).subscribe((response) => {
                if (response) {
                  this.store$.dispatch(
                    showToast({
                      status: eToastStatus.Success,
                      title: 'msg.success',
                      message: 'profile_page.save_document_success',
                    }),
                  );
                  // redirect to new document page
                  this.router
                    .navigate([
                      '/',
                      RouteUtils.ProfilePage.Base,
                      RouteUtils.ProfilePage.Documents,
                      RouteUtils.ProfilePage.New,
                    ])
                    .then();
                  modalRef.close();
                }
              });
            }
          });
        }),
      ),
    { dispatch: false },
  );

  updateDocuments$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.updateDocuments),
        tap(({ payload }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: ConfirmModalComponent,
            nzData: {
              title: 'msg.confirm',
              closeOnSubmit: false,
              message: 'msg.confirm_save_document',
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
            if (isOk) {
              this.profileService.updateDocument(payload).subscribe((response) => {
                if (response) {
                  this.store$.dispatch(
                    showToast({
                      status: eToastStatus.Success,
                      title: 'msg.success',
                      message: 'profile_page.save_document_success',
                    }),
                  );
                  this.router
                    .navigate([
                      '/',
                      RouteUtils.ProfilePage.Base,
                      RouteUtils.ProfilePage.Documents,
                      RouteUtils.ProfilePage.New,
                    ])
                    .then();
                  modalRef.close();
                  modalRef?.close();
                }
              });
            }
          });
        }),
      ),
    { dispatch: false },
  );

  loadDocuments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadDocuments),
      switchMap(({ params }) => this.profileService.getDocuments(params)),
      switchMap((documents) => of(ProfileActions.loadDocumentsSuccess({ documents }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ProfileActions.loadDocumentsFailure({ error }));
      }),
    ),
  );

  changeContentStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.changeContentStatus),
        tap(({ payload, confirm, redirect }) => {
          const handleApi = (modalRef?: NzModalRef) =>
            this.profileService.changeContentStatus(payload).subscribe((response) => {
              if (response) {
                this.store$.dispatch(
                  showToast({
                    status: eToastStatus.Success,
                    title: 'msg.success',
                    message: 'profile_page.change_document_status_success',
                  }),
                );
                this.router.navigate(redirect).then();
                // close email modal
                modalRef?.close();
              }
            });
          if (confirm) {
            let message = '';
            switch (payload.contentStatus) {
              case eContentStatuses.AdminPending:
                message = 'msg.confirm_request_review_document';
                break;
              case eContentStatuses.New:
                message = 'msg.confirm_edit_document';
                break;
              default:
                message = 'msg.confirm_edit_document';
                break;
            }
            const modalRef = this.modal.create({
              nzClassName: 'modal-md',
              nzContent: ConfirmModalComponent,
              nzData: {
                title: 'msg.confirm',
                closeOnSubmit: false,
                message: message,
              },
            });

            // listen to okEvent$ to get payload
            modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
              if (isOk) {
                handleApi(modalRef);
              }
            });
          } else {
            handleApi();
          }
        }),
      ),
    { dispatch: false },
  );

  deleteDocument$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.deleteDocument),
        tap(({ payload, contentStatus }) => {
          const modalRef = this.modal.create({
            nzClassName: 'modal-md',
            nzContent: ConfirmModalComponent,
            nzData: {
              title: 'msg.confirm',
              closeOnSubmit: false,
              message: 'msg.confirm_delete_document',
            },
          });

          // listen to okEvent$ to get payload
          modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
            if (isOk) {
              this.profileService.deleteDocument(payload).subscribe((response) => {
                if (response) {
                  this.store$.dispatch(
                    showToast({
                      status: eToastStatus.Success,
                      title: 'msg.success',
                      message: 'profile_page.delete_document_success',
                    }),
                  );
                  // reload documents
                  this.store$.dispatch(loadDocuments({ params: { contentStatus: contentStatus } }));
                  this.store$.dispatch(countDocuments());
                  // close email modal
                  modalRef?.close();
                }
              });
            }
          });
        }),
      ),
    { dispatch: false },
  );
}
