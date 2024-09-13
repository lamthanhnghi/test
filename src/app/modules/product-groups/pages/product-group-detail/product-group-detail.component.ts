import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import {
  eProductGroupFormKeys,
  ILoadingState,
  IMcBreadcrumb,
  IProductGroupItem,
  IProductGroupPayload,
  McUploadFile,
} from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { eContentStatuses, ePageActions } from '@shared/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { eAttributeFormKeys, startLoading, stopLoading, uploadFile } from '@shared/stores';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ProductGroupService } from '@shared/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrl: './product-group-detail.component.scss',
})
export class ProductGroupDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Danh mục', link: ['/', RouteUtils.GroupsPage.Base] },
    { title: 'Ngành hàng', link: ['/', RouteUtils.GroupsPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true },
  ];
  avatars: McUploadFile[] = [];
  data?: IProductGroupItem;
  readonly eProductGroupFormKeys = eProductGroupFormKeys;
  private sub: any;
  mode: ePageActions | any = ePageActions.Create;
  form: FormGroup = new FormGroup({
    [eProductGroupFormKeys.MediaID]: new FormControl(null, [Validators.required]),
    [eProductGroupFormKeys.GroupName]: new FormControl(null, [Validators.required]),
    [eProductGroupFormKeys.GroupShortName]: new FormControl(null, [Validators.required]),
    [eProductGroupFormKeys.Description]: new FormControl(null, []),
    [eProductGroupFormKeys.ContentStatus]: new FormControl(null, []),
    [eProductGroupFormKeys.OrderNo]: new FormControl(null, [Validators.required]),
  });

  constructor(
    private apiService: ProductGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];

    if (this.data?.productGroupID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue(this.data);
      if (this.data.image) {
        this.avatars = [CommonHelpers.mediaToMcUploadFile(this.data.image)];
        this.form.patchValue({
          [eProductGroupFormKeys.MediaID]: this.data.image.mediaID,
          [eProductGroupFormKeys.Description]: this.data.productGroupDescription
        }, {
        });
      }
    }
    this.updateBreadcrumb();
  }

  updateBreadcrumb(): void {

    if (this.mode === ePageActions.Create) {
      this.breadcrumbs[this.breadcrumbs.length-1].title = 'Thêm mới';
    } else if (this.mode === ePageActions.Edit) {
      this.breadcrumbs[this.breadcrumbs.length-1].title = 'Sửa';
    } else {
      this.breadcrumbs[this.breadcrumbs.length-1].title = 'Chi tiết';
    }
  }

  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
    this.updateBreadcrumb();
  }

  cancel(): void {
    switch(this.mode) {
      case ePageActions.Create:
        this.router.navigate(['../'], { relativeTo: this.route }).then();
        break;
      case ePageActions.Edit:
        this.mode = ePageActions.View;
        this.updateBreadcrumb();
        break;
    }
  }

  delete(): void {
    // const modalRef = this.modal.create({
    //   nzClassName: 'modal-confirm',
    //   nzContent: ConfirmModalComponent,
    //   nzData: {
    //     type: eConfirmModalTypes.Confirm,
    //     title: 'msg.confirm',
    //     message: `msg.confirm_delete_data`,
    //   } as IConfirmModal,
    // });
    //
    // modalRef.componentInstance?.okEvent$.subscribe(() => {
    //   if (this.data?.productGroupID) {
    //     this.store$.dispatch(startLoading());
    //     this.apiService.delete({ productCategoryID: this.data.productGroupID }).subscribe({
    //       next: () => {
    //         this.store$.dispatch(stopLoading());
    //         modalRef.close();
    //         this.router.navigate(['../'], { relativeTo: this.route }).then();
    //       },
    //       error: (err) => {
    //         this.store$.dispatch(stopLoading());
    //         console.error(err);
    //       },
    //     });
    //   } else {
    //     this.router.navigate(['../'], { relativeTo: this.route }).then();
    //   }
    // });
  }

  /** images uploaded to server */
  fileUploaded(fileList: McUploadFile[]): void {
    const mediaIds = fileList.map((file) => file.mediaID);
    this.form.controls[eProductGroupFormKeys.MediaID].setValue(mediaIds?.[0] || undefined);
  }

  fileAdded(file: McUploadFile): void {
    this.store$.dispatch(uploadFile({ payload: { ...file, id: file.uid } }));
  }

  removeAvatar(media: McUploadFile): void {
    this.avatars = this.avatars.filter((item) => item.mediaID !== media.mediaID);
    this.form.controls[eProductGroupFormKeys.MediaID].setValue(undefined);
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: IProductGroupPayload = {
      languageCode: 'vi',
      "groupName": this.form.get(eProductGroupFormKeys.GroupName)?.value,
      "groupShortName": this.form.get(eProductGroupFormKeys.GroupShortName)?.value,
      ...this.form.value,
      notes: this.form.get(eProductGroupFormKeys.GroupShortName)?.value || '',
    };

    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update(payload, this.data?.productGroupID || '');
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.productGroupID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.productGroupID], { relativeTo: this.route }).then();
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

  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly eAttributeFormKeys = eAttributeFormKeys;
}
