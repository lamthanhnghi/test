import { Component, OnDestroy, OnInit } from '@angular/core';
import { IConfirmModal, IMcBreadcrumb, ISellerRequestingProfileDetail, ITextFeedbackModal } from '@shared/models';
import { RouteUtils } from '@shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestingProfilesService } from '@shared/requesting-profiles.service';
import { Subject, takeUntil } from 'rxjs';
import dayjs from 'dayjs';
import { eConfirmModalTypes, eContentStatuses, eToastStatus } from '@shared/enums';
import { Store } from '@ngrx/store';
import { showToast, startLoading, stopLoading } from '@shared/stores';
import { ConfirmModalComponent } from '@shared/components';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TextFeedbackModalComponent } from '@shared/text-feedback-modal/text-feedback-modal.component';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss',
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Hồ sơ', link: ['/', RouteUtils.ProfilesPage.Base] },
    { title: 'Chi tiết', disabled: true, link: [] },
  ];
  data: ISellerRequestingProfileDetail | null = null;
  destroy$: Subject<void> = new Subject();
  private sub: any;

  constructor(
    private requestingProfilesService: RequestingProfilesService,
    private route: ActivatedRoute,
    private store$: Store,
    private modal: NzModalService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.getItem(params['id']);
    });
  }

  getItem(id: string) {
    this.store$.dispatch(startLoading());
    this.requestingProfilesService
      .getDetail({ sellerProfileID: id })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.data = res.result;
          }
          this.store$.dispatch(stopLoading());
        },
        error: () => {
          console.log('get item failed');
          this.router.navigate(['/', RouteUtils.ProfilesPage.Base]);
          this.store$.dispatch(stopLoading());
        },
      });
  }

  reject() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-feedback',
      nzContent: TextFeedbackModalComponent,
      nzCentered: true,
      nzData: {
        title: 'Từ chối',
        message: 'Nhập lý do từ chối',
        textBtnOk: 'Từ chối',
        textBtnCancel: 'Hủy',
        isDangerAction: true,
      } as ITextFeedbackModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      if (!payload.isOk) {
        return;
      }
      this.setStatus(eContentStatuses.AdminRejected, modalRef, payload.message);
    });
  }

  approve() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzCentered: true,
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        closeOnSubmit: true,
        message: `Bạn đang chọn Đã duyệt dữ liệu. Dữ liệu được Đã duyệt sẽ được xuất bản lên hệ thống?`,
      } as IConfirmModal,
    });

    modalRef.afterClose.subscribe((isOk) => {
      if (!isOk) {
        return;
      }
      this.setStatus(eContentStatuses.AdminApproved, modalRef);
    });
  }

  hide() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-feedback',
      nzContent: TextFeedbackModalComponent,
      nzCentered: true,
      nzData: {
        title: 'Ẩn',
        message:
          'Dữ liệu bị ẩn sẽ không xuất hiện hệ thống. Chủ sở hữu dữ liệu sẽ được thông báo việc ẩn này. Nhập lý do và chọn “Ẩn" để tiếp tục hoặc “Hủy” để hủy tác vụ.',
        textBtnOk: 'Ẩn',
        textBtnCancel: 'Hủy',
      } as ITextFeedbackModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      if (!payload.isOk) {
        return;
      }
      this.setStatus(eContentStatuses.AdminHidden, modalRef, payload.message);
    });
  }

  archive() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-feedback',
      nzContent: TextFeedbackModalComponent,
      nzCentered: true,
      nzData: {
        title: 'Lưu trữ',
        message:
          'Dữ liệu bị lưu trữ sẽ không xuất hiện hệ thống. Chủ sở hữu dữ liệu sẽ được thông báo việc lưu trữ này. Nhập lý do và chọn “Lưu trữ" để tiếp tục hoặc “Hủy” để hủy tác vụ.',
        textBtnOk: 'Lưu trữ',
        textBtnCancel: 'Hủy',
      } as ITextFeedbackModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      if (!payload.isOk) {
        return;
      }
      this.setStatus(eContentStatuses.AdminArchived, modalRef, payload.message);
    });
  }

  setStatus(newStatus: eContentStatuses, modalRef?: NzModalRef, message?: string) {
    if (!this.data) return;

    let observableObject = null;
    switch (newStatus) {
      case eContentStatuses.AdminHidden: {
        observableObject = this.requestingProfilesService.hide({
          reason: message,
          sellerID: this.data.sellerID,
          sellerProfileID: this.data.sellerProfileID!,
        });
        break;
      }
      case eContentStatuses.AdminArchived: {
        observableObject = this.requestingProfilesService.archive({
          reason: message,
          sellerID: this.data.sellerID,
          sellerProfileID: this.data.sellerProfileID!,
        });
        break;
      }
      case eContentStatuses.AdminReviewing: {
        observableObject = this.requestingProfilesService.reviewing(this.data.sellerProfileID!);
        break;
      }
      default: {
        observableObject = this.requestingProfilesService.setStatus({
          reason: message,
          contentStatus: newStatus,
          sellerID: this.data.sellerID,
          sellerProfileID: this.data.sellerProfileID!,
        });
        break;
      }
    }
    if (!observableObject) return;

    this.store$.dispatch(startLoading());
    observableObject.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          this.getItem(this.data!.sellerProfileID);
          this.store$.dispatch(
            showToast({
              status: eToastStatus.Success,
              title: 'msg.success',
              message: 'Chuyển trạng thái thành công',
            }),
          );
        }

        this.store$.dispatch(stopLoading());
        modalRef?.close();
      },
      error: () => {
        console.log('set status failed');
        this.store$.dispatch(stopLoading());
      },
    });
  }

  protected readonly dayjs = dayjs;
  protected readonly eContentStatuses = eContentStatuses;
}
