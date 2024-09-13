import { Component, ViewEncapsulation } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Store } from '@ngrx/store';
import { RouteUtils } from '@shared/utils';
import { eBusinessTypes } from '@shared/enums';
import { IAccountState, IUploadProfileDocument, McUploadFile } from '@shared/models';
import { startLoading, stopLoading, uploadFile } from '@shared/stores';
import { SwiperOptions } from 'swiper/types';
import { AuthService, ProfileService } from '@shared/services';
import * as AuthActions from '@shared/stores/auth/auth.actions';

register();

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UploadDocumentComponent {
  readonly RouteUtils = RouteUtils;
  readonly eBusinessTypes = eBusinessTypes;
  readonly limitSize = 5 * 1024 * 1024;
  public config: SwiperOptions = {
    // Set your Swiper configuration here
    slidesPerView: 'auto',
  };
  submitted = false;
  previewVisible = false;
  filePreview: McUploadFile | undefined;

  licenseFiles: McUploadFile[] = [];
  otherFiles: McUploadFile[] = [];
  businessMediaIDS: string[] = [];
  certificatesMediaIDS: string[] = [];

  constructor(
    private store$: Store<IAccountState>,
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  get isValid(): boolean {
    return this.licenseFiles.length > 0;
  }

  get isUploading(): boolean {
    return (
      this.licenseFiles.some((file) => file.status === 'uploading') ||
      this.otherFiles.some((file) => file.status === 'uploading')
    );
  }

  preview(file: McUploadFile): void {
    this.previewVisible = true;
    this.filePreview = file;
  }

  licenseUploaded(fileList: McUploadFile[]): void {
    this.businessMediaIDS = fileList.map((file) => file.mediaID || '').filter((id) => id);
  }

  licenseAdded(file: McUploadFile): void {
    this.store$.dispatch(uploadFile({ payload: { ...file, id: file.uid } }));
  }

  certificatesUploaded(fileList: McUploadFile[]): void {
    this.certificatesMediaIDS = fileList.map((file) => file.mediaID || '').filter((id) => id);
  }

  certificateAdded(file: McUploadFile): void {
    this.store$.dispatch(uploadFile({ payload: { ...file, id: file.uid } }));
  }

  upload(): void {
    this.submitted = true;
    if (!this.isValid) {
      return;
    }
    const payload: IUploadProfileDocument = {
      businessMediaIDS: this.businessMediaIDS,
      certificatesMediaIDS: this.certificatesMediaIDS,
    };
    this.store$.dispatch(startLoading());
    this.profileService.updateProfileDocument(payload).subscribe({
      next: () => {
        this.store$.dispatch(stopLoading());
        const token = this.authService.getToken();
        this.store$.dispatch(AuthActions.getTokenSuccessAndRetrieveUserProfile({ token, isRedirectAfterLogin: true }));
      },
      error: () => {
        this.store$.dispatch(stopLoading());
      },
    });
  }
}
