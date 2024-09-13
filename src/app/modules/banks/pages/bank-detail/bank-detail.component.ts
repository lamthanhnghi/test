import { Component } from '@angular/core';
import { IConfirmModal, ILoadingState, IMcBreadcrumb, McUploadFile } from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ConfirmModalComponent } from '@shared/components';
import { eConfirmModalTypes, eContentStatuses, ePageActions, eToastStatus } from '@shared/enums';
import { showToast, startLoading, stopLoading, uploadFile } from '@shared/stores';
import { eBankFormKeys, IBank, ICreateBankPayload } from '@shared/bank.model';
import { BankService } from '@shared/bank.service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrl: './bank-detail.component.scss',
})
export class BankDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Ngân hàng / Danh sách', link: ['/', RouteUtils.BanksPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true },
  ];
  avatars: McUploadFile[] = [];
  data: IBank | null;
  readonly eBankFormKeys = eBankFormKeys;
  private sub: any;
  mode: ePageActions | any = ePageActions.Create;
  form: FormGroup = new FormGroup({
    [eBankFormKeys.Icon]: new FormControl(null, [Validators.required]),
    [eBankFormKeys.Name]: new FormControl(null, [Validators.required]),
    [eBankFormKeys.ShortName]: new FormControl(null, [Validators.required]),
    [eBankFormKeys.Code]: new FormControl(null, [Validators.required]),
    [eBankFormKeys.ContentStatus]: new FormControl(null, []),
  });

  constructor(
    private apiService: BankService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];
    if (this.data?.bankID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue(this.data);
      if (this.data.logo) {
        this.avatars = [
          CommonHelpers.mediaToMcUploadFile({
            mediaID: '?',
            linkString: this.data.logo,
          }),
        ];
        this.form.patchValue({ [eBankFormKeys.Icon]: this.data.logo ? '?' : '' });
      }
    }
    this.updateBreadcrumb();
  }

  updateBreadcrumb(): void {
    if (this.mode === ePageActions.Create) {
      this.breadcrumbs[1].title = 'Thêm mới';
    } else if (this.mode === ePageActions.Edit) {
      this.breadcrumbs[1].title = 'Sửa';
    } else {
      this.breadcrumbs[1].title = 'Chi tiết';
    }
  }

  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
    this.updateBreadcrumb();
  }

  cancel(): void {
    this.mode = ePageActions.View;
    this.updateBreadcrumb();
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

  restore() {
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
      if (this.data?.bankID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete({ bankID: this.data.bankID }).subscribe({
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

  /** images uploaded to server */
  fileUploaded(fileList: McUploadFile[]): void {
    const mediaIds = fileList.map((file) => file.mediaID);
    this.form.controls[eBankFormKeys.Icon].setValue(mediaIds?.[0] || undefined);
  }

  fileAdded(file: McUploadFile): void {
    this.store$.dispatch(uploadFile({ payload: { ...file, id: file.uid } }));
  }

  removeAvatar(media: McUploadFile): void {
    this.avatars = this.avatars.filter((item) => item.mediaID !== media.mediaID);
    this.form.controls[eBankFormKeys.Icon].setValue(undefined);
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: ICreateBankPayload = {
      ...this.form.value,
    };
    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({
            ...payload,
            mediaIDForLogo: payload.mediaIDForLogo == '?' ? '' : payload.mediaIDForLogo || '',
            bankID: this.data?.bankID || '',
          });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result?.data?.bankID) {
          this.store$.dispatch(stopLoading());
          if (this.mode === ePageActions.Create) {
            this.mode = ePageActions.View;
            this.router.navigate(['../', res.result?.data?.bankID], { relativeTo: this.route }).then();
          } else {
            this.data = res.result;
            this.form.patchValue({ ...this.data });
            this.mode = ePageActions.View;
          }
        }
      },
      error: () => {
        this.store$.dispatch(stopLoading());
      },
    });
  }

  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
}
