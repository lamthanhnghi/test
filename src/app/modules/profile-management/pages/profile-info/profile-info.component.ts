import { Component } from '@angular/core';
import { eAccountStatus, eAddressLabels, eConfirmModalTypes, eContentStatuses, eEmailLabels } from '@shared/enums';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import {
  IAddress,
  IAddressModal,
  IAuthState,
  IConfirmModal,
  IEmail,
  IEmailModal,
  IPhone,
  IPhoneModal,
  IProfile,
  IUrl,
  IUrlModal
} from '@shared/models';
import * as AuthActions from '@shared/stores/auth/auth.actions';
import { selectUser } from '@shared/auth';
import {
  AddressModalComponent,
  ConfirmModalComponent,
  EmailModalComponent,
  PhoneModalComponent,
  UrlModalComponent
} from '@shared/components';
import { ProfileService } from '@shared/services';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PROFILE_COVER_SIZE } from '@shared/constants';
import { CommonHelpers } from '@shared/utils';
import { startLoading, stopLoading } from '@shared/stores';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent {
  protected readonly eUserStatuses = eAccountStatus;
  protected readonly eContentStatuses = eContentStatuses;
  data?: IProfile;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private apiService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<IAuthState>,
    private imageCompress: NgxImageCompressService,
    private translate: TranslateService,
  ) {
    this.store$.select(selectUser).subscribe((state) => {
      this.data = state;
    });
  }

  updateCover(): void {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imageCompress
        .compressFile(
          image,
          orientation,
          100,
          PROFILE_COVER_SIZE.quality,
          PROFILE_COVER_SIZE.maxWidth,
          PROFILE_COVER_SIZE.maxHeight,
        )
        .then((result) => {
          this.store$.dispatch(startLoading());
          // to file formData
          const imageBlob = CommonHelpers.dataURItoBlob(result);
          const imageFile = new File([imageBlob], 'profile_cover.jpg', { type: 'image/jpeg' });
          const formData = new FormData();
          formData.append('file_cover', imageFile);

          this.apiService.updateCover(formData).subscribe({
            next: () => {
              // this.store$.dispatch(
              //   showToast({
              //     status: eToastStatus.Success,
              //     title: 'msg.success',
              //     message: 'profile_page.update_cover_success',
              //   }),
              // );
              this.store$.dispatch(AuthActions.getUser());
              this.store$.dispatch(stopLoading());
            },
            error: () => {
              this.store$.dispatch(stopLoading());
            },
          });
        });
    });
  }

  addAddress() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-lg',
      nzContent: AddressModalComponent,
      nzData: {
        title: 'profile_page.add_address',
        closeOnSubmit: false,
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .addAddress({
          addressLabel: payload.addressLabel || eAddressLabels.Other,
          addressString: payload.addressString || '',
          latitude: payload.latitude || '1',
          longitude: payload.longitude || '1',
          isDefault: Number(payload.isDefault) || 0,
          cityID: payload.cityID,
          districtID: payload.districtID,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  editAddress(item: IAddress) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-lg',
      nzContent: AddressModalComponent,
      nzData: {
        title: 'profile_page.edit_address',
        closeOnSubmit: false,
        data: item,
      } as IAddressModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .updateAddress({
          addressID: item.addressID!,
          addressLabel: payload.addressLabel || eAddressLabels.Other,
          addressString: payload.addressString || '',
          isDefault: Number(payload.isDefault) || 0,
          cityID: payload.cityID,
          districtID: payload.districtID,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  deleteAddress(item: IAddress) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        closeOnSubmit: true,
        cancelText: 'common.close',
        message: this.translate.instant('Bạn muốn xóa địa chỉ này?'),
      } as IConfirmModal,
    });
    modalRef.afterClose.subscribe((isOk) => {
      if (!isOk) return;
      this.apiService
        .deleteAddress({
          addressID: item.addressID,
        })
        .subscribe((response) => {
          if (response) {
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  addEmail() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: EmailModalComponent,
      nzData: {
        title: 'profile_page.add_email',
        closeOnSubmit: false,
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .addEmail({
          emailAddress: payload.emailAddress || '',
          emailLabel: payload.emailLabel || eEmailLabels.Other,
          isDefault: Number(payload.isDefault) || 0,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  addUrl() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: UrlModalComponent,
      nzData: {
        title: 'profile_page.add_url',
        closeOnSubmit: false,
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .addUrl({
          urlString: payload.urlString,
          isDefault: Number(payload.isDefault) || 0,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  editUrl(item: IUrl) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: UrlModalComponent,
      nzData: {
        title: 'profile_page.edit_url',
        closeOnSubmit: false,
        data: item,
      } as IUrlModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .updateUrl({
          urlID: item.urlID!,
          urlString: payload.urlString!,
          isDefault: Number(payload.isDefault) || 0,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  deleteUrl(item: IUrl) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        closeOnSubmit: true,
        cancelText: 'common.close',
        message: this.translate.instant('Bạn muốn xóa liên kết này?'),
      } as IConfirmModal,
    });
    modalRef.afterClose.subscribe((isOk) => {
      if (!isOk) return;
      this.apiService
        .deleteUrl({
          urlID: item.urlID,
        })
        .subscribe((response) => {
          if (response) {
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  updateUrl(item: IUrl) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: UrlModalComponent,
      nzData: {
        title: 'profile_page.edit_url',
        closeOnSubmit: false,
        data: item,
      } as IUrlModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .updateUrl({
          urlID: item.urlID!,
          urlString: payload.urlString!,
          isDefault: Number(payload.isDefault) || 0,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  editEmail(item: IEmail) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: EmailModalComponent,
      nzData: {
        title: 'profile_page.edit_phone',
        closeOnSubmit: false,
        data: item,
      } as IEmailModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .updateEmail({
          emailID: item.emailID!,
          emailAddress: payload.emailAddress!,
          emailLabel: payload.emailLabel!,
          isDefault: Number(payload.isDefault) || 0,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  deleteEmail(item: IEmail) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        closeOnSubmit: true,
        cancelText: 'common.close',
        message: this.translate.instant('Bạn muốn xóa email này?'),
      } as IConfirmModal,
    });
    modalRef.afterClose.subscribe((isOk) => {
      if (!isOk) return;
      this.apiService
        .deleteEmail({
          emailID: item.emailID,
        })
        .subscribe((response) => {
          if (response) {
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  deletePhone(item: IPhone) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        closeOnSubmit: true,
        cancelText: 'common.close',
        message: this.translate.instant('Bạn muốn xóa số điện thoại này?'),
      } as IConfirmModal,
    });
    modalRef.afterClose.subscribe((isOk) => {
      if (!isOk) return;
      this.apiService
        .deletePhone({
          phoneID: item.phoneID,
        })
        .subscribe((response) => {
          if (response) {
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  editPhone(item: IPhone) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: PhoneModalComponent,
      nzData: {
        title: 'profile_page.edit_phone',
        closeOnSubmit: false,
        data: item,
      } as IPhoneModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .updatePhone({
          phoneID: item.phoneID!,
          phoneNo: payload.phone!,
          phoneLabel: payload.phoneLabel!,
          isDefault: Number(payload.isDefault) || 0,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }

  addPhone() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: PhoneModalComponent,
      nzData: {
        title: 'profile_page.add_phone',
        closeOnSubmit: false,
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      // send otp email
      this.apiService
        .addPhone({
          phoneNo: payload.phone!,
          phoneLabel: payload.phoneLabel!,
          isDefault: Number(payload.isDefault) || 0,
        })
        .subscribe((response) => {
          if (response) {
            // close email modal
            modalRef.close();
            this.store$.dispatch(AuthActions.getUser());
          }
        });
    });
  }
}
