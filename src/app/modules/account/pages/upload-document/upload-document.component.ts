import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { eBusinessTypes } from '@shared/enums';
import { IAccountState, McUploadFile } from '@shared/models';
import { uploadDocumentBusiness, uploadDocumentPersonalAccount } from '@shared/stores';
import { SwiperOptions } from 'swiper/types';

register();

enum eUploadFormKeys {
  front = 'file_front',
  back = 'file_back',
  other = 'file_other',
  license = 'file_license',
}

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UploadDocumentComponent implements OnInit {
  readonly RouteUtils = RouteUtils;
  readonly eBusinessTypes = eBusinessTypes;
  readonly limitSize = 5 * 1024 * 1024;
  public config: SwiperOptions = {
    // Set your Swiper configuration here
    slidesPerView: 'auto',
  };
  submitted = false;
  frontFiles: McUploadFile[] = [];
  licenseFiles: McUploadFile[] = [];
  backFiles: McUploadFile[] = [];
  otherFiles: McUploadFile[] = [];
  previewVisible = false;
  filePreview: McUploadFile | undefined;

  businessType?: eBusinessTypes = undefined;

  constructor(
    private store$: Store<IAccountState>,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.store$.select(selectAccountState).subscribe((state) => {
    //   this.businessType = state.businessType;
    //   if (
    //     this.businessType === undefined ||
    //     ![eBusinessTypes.Personal, eBusinessTypes.Business].includes(this.businessType)
    //   ) {
    //     this.router.navigate(['/', RouteUtils.AccountPage.Base]).then();
    //   }
    // });
    return
  }

  preview(file: McUploadFile): void {
    this.previewVisible = true;
    this.filePreview = file;
  }

  get valid(): boolean {
    return this.businessType === eBusinessTypes.Personal
      ? this.frontFiles.length > 0 && this.backFiles.length > 0 && this.otherFiles.length <= 5
      : this.licenseFiles.length > 0 && this.otherFiles.length <= 5;
  }

  upload(): void {
    this.submitted = true;
    if (this.valid) {
      const payload = new FormData();
      if (this.businessType === eBusinessTypes.Personal) {
        // upload for personal account
        this.frontFiles.forEach((file) => {
          payload.append(eUploadFormKeys.front, file.originFileObj as File);
        });
        this.backFiles.forEach((file) => {
          payload.append(eUploadFormKeys.back, file.originFileObj as File);
        });
        this.otherFiles.forEach((file) => {
          payload.append(eUploadFormKeys.other, file.originFileObj as File);
        });
        this.store$.dispatch(uploadDocumentPersonalAccount({ payload: payload }));
      } else {
        // upload for business account
        this.licenseFiles.forEach((file) => {
          payload.append(eUploadFormKeys.license, file.originFileObj as File);
        });
        this.otherFiles.forEach((file) => {
          payload.append(eUploadFormKeys.other, file.originFileObj as File);
        });
        this.store$.dispatch(uploadDocumentBusiness({ payload: payload }));
      }
    }
  }

  protected readonly undefined = undefined;
}
