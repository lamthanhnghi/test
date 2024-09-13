import { Component, OnDestroy, OnInit } from '@angular/core';
import { IConfirmModal, IMcBreadcrumb, IProgram, ITextFeedbackModal } from '@shared/models';
import { RouteUtils } from '@shared/utils';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { showToast, startLoading, stopLoading } from '@shared/stores';
import { TextFeedbackModalComponent } from '@shared/text-feedback-modal/text-feedback-modal.component';
import { ConfirmModalComponent } from '@shared/components';
import { eConfirmModalTypes, eContentStatuses, eToastStatus } from '@shared/enums';
import dayjs from 'dayjs';
import { ProgramsService } from '@shared/programs.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.scss',
})
export class ProgramDetailComponent implements OnInit, OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Chương trình', link: ['/', RouteUtils.ProgramsPage.Base] },
    { title: 'Chi tiết', disabled: true, link: [] },
  ];
  data: IProgram | null = null;
  destroy$: Subject<void> = new Subject();
  private sub: any;

  constructor(
    private programsService: ProgramsService,
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store,
    private modal: NzModalService,
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
    this.programsService
      .getDetail(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.data = res.result.data;
          }
          this.store$.dispatch(stopLoading());
        },
        error: () => {
          console.log('get item failed');
          this.router.navigate(['/', RouteUtils.ProgramsPage.Base]);
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
      case eContentStatuses.AdminReviewing: {
        observableObject = this.programsService.review({ programID: this.data.programID! });
        break;
      }
      case eContentStatuses.AdminApproved: {
        observableObject = this.programsService.approve({ programID: this.data.programID! });
        break;
      }
      case eContentStatuses.AdminRejected: {
        observableObject = this.programsService.reject({ programID: this.data.programID!, reason: message });
        break;
      }
      case eContentStatuses.AdminHidden: {
        observableObject = this.programsService.hide({ programID: this.data.programID!, reason: message });
        break;
      }
      case eContentStatuses.AdminArchived: {
        observableObject = this.programsService.archive({ programID: this.data.programID!, reason: message });
        break;
      }
    }

    if (!observableObject) return;
    this.store$.dispatch(startLoading());
    observableObject.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          this.getItem(this.data!.programID!);
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
