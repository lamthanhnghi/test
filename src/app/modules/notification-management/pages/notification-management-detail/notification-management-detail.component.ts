import { Component, OnDestroy } from '@angular/core';
import { eDeliveryFeePolicyFormKeys, IConfirmModal, ILoadingState, IMcBreadcrumb, McUploadFile } from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ConfirmModalComponent } from '@shared/components';
import { eConfirmModalTypes, eContentStatuses, eDebtCyclePeriods, ePageActions } from '@shared/enums';
import { startLoading, stopLoading, uploadFile } from '@shared/stores';
import { DATE_FORMAT } from '@shared/constants';
import { Subject, takeUntil } from 'rxjs';
import { eNotificationFormKeys, INotification, INotificationPayload } from '@shared/notification.model';
import { NotificationManagementService } from '@shared/notification-management.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-management-detail',
  templateUrl: './notification-management-detail.component.html',
  styleUrl: './notification-management-detail.component.scss',
})
export class NotificationManagementDetailComponent implements OnDestroy {
  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly DATE_FORMAT = DATE_FORMAT;
  protected readonly eNotificationFormKeys = eNotificationFormKeys;
  readonly ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.pdf'];
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'common.notification', link: ['/', RouteUtils.NotificationManagement.Base] },
    { title: 'common.detail', link: '#', disabled: true },
  ];
  data?: INotification;
  listTargets: string[] = [];
  listNotificationTypes: string[] = [];
  avatars: McUploadFile[] = [];
  mode: ePageActions | any = ePageActions.Create;
  destroy$: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({
    [eNotificationFormKeys.Title]: new FormControl(undefined, [Validators.required]),
    [eNotificationFormKeys.Content]: new FormControl(undefined, [Validators.required]),
    // -----------------------------------------------------------------------------------------------------------------
    [eNotificationFormKeys.ApplyForSeller]: new FormControl(false, []),
    [eNotificationFormKeys.ApplyForUser]: new FormControl(false, []),
    // -----------------------------------------------------------------------------------------------------------------
    [eNotificationFormKeys.IsSendSMS]: new FormControl(false, []),
    [eNotificationFormKeys.IsSendEmail]: new FormControl(false, []),
    [eNotificationFormKeys.IsSendPushNotification]: new FormControl(false, []),
    // -----------------------------------------------------------------------------------------------------------------
    [eNotificationFormKeys.MediaIDs]: new FormControl(undefined, []),
    [eNotificationFormKeys.SendDate]: new FormControl(undefined, [Validators.required]),
    // -----------------------------------------------------------------------------------------------------------------
    [eNotificationFormKeys.ContentStatus]: new FormControl(undefined, []),
  });

  constructor(
    private apiService: NotificationManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
    private translate: TranslateService,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
      if (this.data?.notificationID) {
        this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
        this.form.patchValue(this.data);
        this.listTargets = [
          this.data?.applyForSeller ? this.translate.instant('common.seller') : '',
          this.data?.applyForUser ? this.translate.instant('common.buyer') : '',
        ].filter((i) => !!i);
        this.listNotificationTypes = [
          this.data?.isSendEmail ? this.translate.instant('common.email') : '',
          this.data?.isSendSMS ? this.translate.instant('common.sms') : '',
          this.data?.isSendPushNotification ? this.translate.instant('common.push_notification') : '',
        ].filter((i) => !!i);
        if (this.data?.medias?.length) {
          this.avatars =
            this.data?.medias?.map((item) =>
              CommonHelpers.mediaToMcUploadFile({
                mediaID: item.mediaID,
                linkString: item.linkString,
              }),
            ) || [];
        }
      }
      this.updateBreadcrumb();
    });
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
      if (this.data?.notificationID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete(this.data.notificationID).subscribe({
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

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: INotificationPayload = {
      ...this.form.value,
      languageCode: 'vi',
      mediaIDs: this.avatars.map((item) => item.mediaID),
    };
    delete (payload as Record<any, any>)[eDeliveryFeePolicyFormKeys.ContentStatus];
    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({ ...payload, notificationID: this.data?.notificationID || '' });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.notificationID) {
          if (this.mode === ePageActions.Create) {
            this.mode = ePageActions.View;
            this.router
              .navigate(['../', res.result.data.notificationID], {
                relativeTo: this.route,
              })
              .then();
          } else {
            this.data = res.result.data;
            this.form.patchValue({ ...this.data });
            this.mode = ePageActions.View;
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.store$.dispatch(stopLoading());
      },
    });
  }

  fileAdded(file: McUploadFile): void {
    this.store$.dispatch(uploadFile({ payload: { ...file, id: file.uid } }));
  }

  removeSkuImage(media: McUploadFile): void {
    this.avatars = this.avatars.filter((item) => item.mediaID !== media.mediaID);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly eDebtCyclePeriods = eDebtCyclePeriods;
}
