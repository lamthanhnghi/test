import { Component, OnInit } from '@angular/core';
import {
  eBrandFormKey,
  IBrand,
  IBrandPayload,
  IConfirmModal,
  ILoadingState,
  IMcBreadcrumb,
  McUploadFile,
} from '@shared/models';
import { CommonHelpers, FormValidators, RouteUtils } from '@shared/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { showToast } from '@shared/toast';
import { eConfirmModalTypes, eContentStatuses, ePageActions, eToastStatus } from '@shared/enums';
import { ConfirmModalComponent } from '@shared/components';
import { startLoading, stopLoading } from '@shared/stores';
import { BrandService } from '@shared/brand.service';
import { Subject, takeUntil } from 'rxjs';
import { MediaService } from '@shared/services';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.scss',
})
export class BrandDetailComponent implements OnInit {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Danh mục', link: ['/', RouteUtils.BrandsPage.Base] },
    { title: 'Thương hiệu', link: ['/', RouteUtils.BrandsPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true },
  ];
  data?: IBrand | null;
  avatars: McUploadFile[] = [];
  destroy$ = new Subject<void>();
  logoControl = new FormControl<McUploadFile[]>([]);
  mode: ePageActions | any = ePageActions.Create;
  form: FormGroup = new FormGroup({
    [eBrandFormKey.Name]: new FormControl(null, [Validators.required]),
    [eBrandFormKey.Logo]: new FormControl(null, []),
    [eBrandFormKey.Description]: new FormControl(null, []),
    [eBrandFormKey.Url]: new FormControl(null, [FormValidators.MustUrl('urlPattern')]),
    [eBrandFormKey.Email]: new FormControl(null, [FormValidators.MustBeEmail('mailPattern')]),
    [eBrandFormKey.Phone]: new FormControl(null, [
      FormValidators.MustBePhoneInternational('phonePatternInternational'),
    ]),
    [eBrandFormKey.Address]: new FormControl(null, []),
    [eBrandFormKey.DunsNumber]: new FormControl(null, [FormValidators.MustDuns('dunsPattern')]),
  });
  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly eBrandFormKey = eBrandFormKey;

  constructor(
    private apiService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
    private mediaService: MediaService,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];

    if (this.data?.brandID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue(this.data);
      this.avatars = this.data.logo ? [CommonHelpers.mediaToMcUploadFile(this.data.logo)] : [];
    }
    this.updateBreadcrumb();
  }

  ngOnInit() {
    this.logoControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((files) => {
      this.avatars.push(...(files ?? []));
      this.avatars.forEach((file) => {
        file.upload$ = this.mediaService.upload(file);
      });
    });
  }

  updateBreadcrumb(): void {
    if (this.mode === ePageActions.Create) {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Thêm mới';
    } else if (this.mode === ePageActions.Edit) {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Sửa';
    } else {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Chi tiết';
    }
  }

  fileUploaded(fileList: McUploadFile[]): void {
    const mediaIds = fileList.map((file) => file.uid);
    this.form.controls[eBrandFormKey.Logo].setValue(mediaIds?.[0] || undefined);
  }

  removeAvatar(media: McUploadFile): void {
    this.avatars = this.avatars.filter((item) => item.uid !== media.uid);
    this.form.controls[eBrandFormKey.Logo].setValue(undefined);
  }

  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
    this.updateBreadcrumb();
  }

  cancel(): void {
    switch (this.mode) {
      case ePageActions.Create:
        this.router.navigate(['../'], { relativeTo: this.route }).then();
        break;
      case ePageActions.Edit:
        this.mode = ePageActions.View;
        this.updateBreadcrumb();
        break;
    }
  }

  restore() {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang được cập nhật.',
      }),
    );
  }

  archive() {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang được cập nhật.',
      }),
    );
  }

  delete(): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        message: `msg.confirm_delete_data`,
      } as IConfirmModal,
    });

    modalRef.componentInstance?.okEvent$.subscribe(() => {
      if (this.data?.brandID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete({ brandID: this.data.brandID }).subscribe({
          next: () => {
            this.store$.dispatch(stopLoading());
            modalRef.close();
            this.router.navigate(['../'], { relativeTo: this.route }).then();
          },
          error: (err) => {
            this.store$.dispatch(stopLoading());
            console.error(err);
          },
        });
      } else {
        this.router.navigate(['../'], { relativeTo: this.route }).then();
      }
    });
  }

  capitalizeFirstLetter() {
    const control = this.form.get(this.eBrandFormKey.Name);
    if (control) {
      let value = control.value;
      if (value) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
        control.setValue(value);
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: IBrandPayload = {
      brandName: this.form.controls[eBrandFormKey.Name].value,
      logoMediaID: this.form.controls[eBrandFormKey.Logo].value,
      brandDescription: this.form.controls[eBrandFormKey.Description].value,
      url: this.form.controls[eBrandFormKey.Url].value,
      email: this.form.controls[eBrandFormKey.Email].value,
      phone: this.form.controls[eBrandFormKey.Phone].value,
      address: this.form.controls[eBrandFormKey.Address].value,
      dunsNumber: this.form.controls[eBrandFormKey.DunsNumber].value,
    };

    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({
            brandID: this.data?.brandID || '',
            ...payload,
          });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.brandID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.brandID], { relativeTo: this.route }).then();
          } else {
            if (!res.result?.data) {
              this.data = res.result.data;
              this.form.patchValue({ ...this.data });
              this.mode = ePageActions.View;
            }
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.store$.dispatch(stopLoading());
      },
    });
  }
}
