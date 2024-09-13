import { Component, OnDestroy } from '@angular/core';
import {
  eProgramFormKeys, IComment, ICommonResponse, IConfirmModal,
  IMcBreadcrumb, IPagination,
  IProgram,
  IProgramProductSKU,
  ITextFeedbackModal,
  McUploadFile
} from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  eConfirmModalTypes,
  eContentStatuses,
  ePageActions,
  eProgramGiftBase,
  eProgramGiftTypes,
  eProgramTypes, eToastStatus
} from '@shared/enums';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { showToast, startLoading, stopLoading } from '@shared/stores';
import { DATE_FORMAT, DATE_TIME_FORMAT, FALLBACK_IMAGE, PLACEHOLDER_IMAGE } from '@shared/constants';
import dayjs from 'dayjs';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { formatCurrency, formatNumber, formatPercent } from '@angular/common';
import { ProgramsService } from '@shared/programs.service';
import { TextFeedbackModalComponent } from '@shared/text-feedback-modal/text-feedback-modal.component';
import { ConfirmModalComponent } from '@shared/components';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommentService } from '@shared/services';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.scss',
})
export class ProgramDetailComponent implements OnDestroy {
  readonly eProgramFormKeys = eProgramFormKeys;
  readonly eProgramTypes = eProgramTypes;
  readonly eProgramGiftBase = eProgramGiftBase;
  readonly eProgramGiftTypes = eProgramGiftTypes;
  readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
  readonly eContentStatuses = eContentStatuses;
  readonly PLACEHOLDER_IMAGE = PLACEHOLDER_IMAGE;
  readonly FALLBACK_IMAGE = FALLBACK_IMAGE;
  readonly RouteUtils = RouteUtils;
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Chương trình', link: ['/', RouteUtils.ProgramsPage.Base] },
    { title: 'Chi tiết', disabled: true, link: [] },
  ];
  get startValidDate(): Date | null {
    return this.form.get(eProgramFormKeys.startValidDate)?.value;
  }
  /** disabled date before current date */
  disableStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return dayjs(startValue).isBefore(dayjs(), 'day');
  };
  /** disabled time before current times */
  disableStartTime: DisabledTimeFn = (current: any) => {
    const now = dayjs();

    if (dayjs(current).isSame(now, 'day')) {
      return {
        nzDisabledHours: () => Array.from({ length: now.hour() }, (_, i) => i),
        nzDisabledMinutes: () => Array.from({ length: now.minute() }, (_, i) => i),
        nzDisabledSeconds: () => [],
      };
    }

    return {
      nzDisabledHours: () => [],
      nzDisabledMinutes: () => [],
      nzDisabledSeconds: () => [],
    };
  };
  /** disabled date before start date */
  disableEndDate = (endValue: Date): boolean => {
    if (!endValue) {
      return false;
    }
    return dayjs(endValue).isBefore(dayjs(this.startValidDate), 'day');
  };

  /** disabled time before start times */
  disableEndTime: DisabledTimeFn = (current: any) => {
    const startDate = dayjs(this.startValidDate);

    if (dayjs(current).isSame(startDate, 'day')) {
      if (startDate.minute() === 59) {
        // If startDate.minute() is 59, increment 1 hour, allow all minutes
        return {
          nzDisabledHours: () => Array.from({ length: startDate.hour() + 1 }, (_, i) => i),
          nzDisabledMinutes: () => [],
          nzDisabledSeconds: () => [],
        };
      } else {
        return {
          nzDisabledHours: () => Array.from({ length: startDate.hour() }, (_, i) => i),
          nzDisabledMinutes: () => Array.from({ length: startDate.minute() + 1 }, (_, i) => i),
          nzDisabledSeconds: () => [],
        };
      }
    }

    return {
      nzDisabledHours: () => [],
      nzDisabledMinutes: () => [],
      nzDisabledSeconds: () => [],
    };
  };

  /** disabled published date after start date  */
  disablePublishedDate = (publishedValue: Date): boolean => {
    if (!publishedValue) {
      return false;
    }
    return dayjs(publishedValue).isAfter(this.startValidDate, 'day');
  };

  /** disabled time after start times */
  disablePublishedTime: DisabledTimeFn = (current: any) => {
    const startDate = dayjs(this.startValidDate);

    // disable hours from start hour to 24

    if (dayjs(current).isSame(startDate, 'day')) {
      if (startDate.minute() === 0) {
        // If startDate.minute() is 0, decrease 1 hour, allow all minutes
        return {
          nzDisabledHours: () => Array.from({ length: 24 - startDate.hour() + 1 + 1 }, (_, i) => 24 - i),
          nzDisabledMinutes: () => [],
          nzDisabledSeconds: () => [],
        };
      } else {
        return {
          nzDisabledHours: () => Array.from({ length: 24 - startDate.hour() }, (_, i) => 24 - i),
          nzDisabledMinutes: (hour) => {
            if (hour === startDate.hour()) {
              return Array.from({ length: 60 - startDate.minute() + 1 }, (_, i) => 60 - i);
            }
            return [];
          },
          nzDisabledSeconds: () => [],
        };
      }
    }

    return {
      nzDisabledHours: () => [],
      nzDisabledMinutes: () => [],
      nzDisabledSeconds: () => [],
    };
  };

  /** form data */
  /** genuineDocs */
  coverControl = new FormControl<McUploadFile[]>([]);
  covers: McUploadFile[] = [];
  form: FormGroup = new FormGroup({
    [eProgramFormKeys.coverMediaID]: new FormControl('', [Validators.required]),
    [eProgramFormKeys.coverString]: new FormControl('', []),
    [eProgramFormKeys.linkString]: new FormControl(''),
    [eProgramFormKeys.contentStatus]: new FormControl(''),
    [eProgramFormKeys.title]: new FormControl('', [Validators.required]),
    [eProgramFormKeys.description]: new FormControl('', [Validators.required]),
    [eProgramFormKeys.startValidDate]: new FormControl('', [Validators.required]),
    [eProgramFormKeys.endValidDate]: new FormControl('', [Validators.required]),
    [eProgramFormKeys.publishedDate]: new FormControl('', [Validators.required]),
    [eProgramFormKeys.programType]: new FormControl<eProgramTypes>(eProgramTypes.Discount, [Validators.required]),
    [eProgramFormKeys.productSKUIDs]: new FormControl<string[]>([], [Validators.minLength(1)]),
    [eProgramFormKeys.programGiftType]: new FormControl<eProgramGiftTypes>(eProgramGiftTypes.Percent),
    [eProgramFormKeys.programGiftBase]: new FormControl<eProgramGiftBase>(eProgramGiftBase.Quantity),
    [eProgramFormKeys.programGiftValue]: new FormControl<number>(0),
    [eProgramFormKeys.programGiftMinPurchaseQuantity]: new FormControl<number>(0), // follow eProgramGiftBase.Quantity
    [eProgramFormKeys.programGiftMinOrderPrice]: new FormControl<number>(0), // follow eProgramGiftBase.Price
    [eProgramFormKeys.programGiftDescription]: new FormControl<string>('', []),
    [eProgramFormKeys.programValue]: new FormControl<number>(0),
  });
  protected readonly ePageActions = ePageActions;
  discountTypesOptions = [
    {
      label: 'Percent', // not used, use value to translate
      value: eProgramGiftTypes.Percent,
    },
    {
      label: 'Amount', // not used, use value to translate
      value: eProgramGiftTypes.Amount,
    },
  ];
  giftTypesOptions = [
    {
      label: 'Similar product', // not used, use value to translate
      value: eProgramGiftTypes.SimilarProduct,
    },
    {
      label: 'Other gift', // not used, use value to translate
      value: eProgramGiftTypes.Any,
    },
  ];
  giftBaseOptions = [
    {
      label: 'Buy amount', // not used, use value to translate
      value: eProgramGiftBase.Price,
    },
    {
      label: 'Purchase Volume', // not used, use value to translate
      value: eProgramGiftBase.Quantity,
    },
  ];
  /** subjects, need to destroy on ngOnDestroy */
  destroy$: Subject<void> = new Subject<void>();
  /** data */
  id: string = '';
  mode: ePageActions | any = ePageActions.View;
  listProductSKU: IProgramProductSKU[] = [];
  contentStatus?: eContentStatuses | any;
  data?: IProgram;

  /** section comments */
  getComments?: (pagination: IPagination) => Observable<ICommonResponse<IComment[]>>;
  addComment?: (payload: { content: string }) => Observable<ICommonResponse<IComment>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<any>,
    private programService: ProgramsService,
    private modal: NzModalService,
    private commentService: CommentService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.listProductSKU = state?.['productSKUs'] || [];

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const { id } = params as any;
      this.id = id;
      if (this.id) {
        this.initData(this.id);
      } else {
        this.router.navigate(['/', RouteUtils.ProgramsPage.Base]).then();
      }
    });
  }

  initData(id: string = ''): void {
    this.store$.dispatch(startLoading());
    this.programService.getDetail(id).subscribe({
      next: (res) => {
        const data = res.result.data;
        this.data = data;
        this.getComments = (pagination: IPagination) =>
          this.commentService.getProgramReviewRequests({ ...pagination, programID: this.data!.programID! });
        this.addComment = (payload: { content: string }) =>
          this.commentService.createProgramReviewRequest({
            programID: this.data!.programID!,
            ...payload,
          });
        this.form.patchValue(
          {
            [eProgramFormKeys.coverMediaID]: data.mediaID,
            [eProgramFormKeys.coverString]: data.linkString,
            [eProgramFormKeys.createdDate]: data.createdDate,
            [eProgramFormKeys.contentStatus]: data.contentStatus,
            [eProgramFormKeys.title]: data.title,
            [eProgramFormKeys.description]: data.description,
            [eProgramFormKeys.startValidDate]: dayjs(data.startValidDate).toDate(),
            [eProgramFormKeys.endValidDate]: dayjs(data.endValidDate).toDate(),
            [eProgramFormKeys.publishedDate]: dayjs(data.publishedDate).toDate(),
            [eProgramFormKeys.programType]: data.programType,
            [eProgramFormKeys.productSKUIDs]: [],
            [eProgramFormKeys.programGiftType]: data.programGift?.programGiftType,
            [eProgramFormKeys.programGiftBase]: data.programGift?.programGiftBase,
            [eProgramFormKeys.programGiftValue]: data.programGift?.programGiftValue,
            [eProgramFormKeys.programGiftMinPurchaseQuantity]: data.programGift?.programGiftMinPurchaseQuantity,
            [eProgramFormKeys.programGiftMinOrderPrice]: data.programGift?.programGiftMinOrderPrice,
            [eProgramFormKeys.programGiftDescription]: data.programGift?.programGiftDescription,
            [eProgramFormKeys.programValue]: data.programValue,
          },
          { emitEvent: false },
        );
        this.covers = data.mediaID
          ? [CommonHelpers.mediaToMcUploadFile({ mediaID: data.mediaID, linkString: data.linkString || '' })]
          : [];
        this.listProductSKU = data.productSKUs || [];
        this.store$.dispatch(stopLoading());
      },
      error: () => {
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
        message: `Xác nhận duyệt chương trình này?`,
        confirmText: 'common.approve',
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
        observableObject = this.programService.review({ programID: this.data.programID! });
        break;
      }
      case eContentStatuses.AdminApproved: {
        observableObject = this.programService.approve({ programID: this.data.programID! });
        break;
      }
      case eContentStatuses.AdminRejected: {
        observableObject = this.programService.reject({ programID: this.data.programID!, reason: message });
        break;
      }
      case eContentStatuses.AdminHidden: {
        observableObject = this.programService.hide({ programID: this.data.programID!, reason: message });
        break;
      }
      case eContentStatuses.AdminArchived: {
        observableObject = this.programService.archive({ programID: this.data.programID!, reason: message });
        break;
      }
    }

    if (!observableObject) return;
    this.store$.dispatch(startLoading());
    observableObject.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          this.initData(this.data!.programID!);
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

  /** helper functions */

  get isCreate(): boolean {
    return this.mode === ePageActions.Create;
  }

  get isView(): boolean {
    return this.mode === ePageActions.View;
  }

  formatNumber(value: number): string {
    return formatNumber(value, 'vi-VN');
  }

  renderDiscountValue(base: number, discountValue: number, type: eProgramGiftTypes): string[] {
    if (base <= 0) {
      return ['0 đ', '0 đ', '0%'];
    }
    if (type === eProgramGiftTypes.Percent) {
      discountValue = Math.max(0, discountValue);
      discountValue = Math.min(100, discountValue);
      const to = base - (base * discountValue) / 100;
      return [
        `${formatCurrency(base, 'vi-VN', 'đ', 'VND', '1.0-2')}`,
        `${formatCurrency(to, 'vi-VN', 'đ', 'VND', '1.0-2')}`,
        `-${discountValue}%`,
      ];
    } else {
      discountValue = Math.max(0, discountValue);
      discountValue = Math.min(base, discountValue);
      const to = base - discountValue;
      return [
        `${formatCurrency(base, 'vi-VN', 'đ', 'VND', '1.0-2')}`,
        `${formatCurrency(to, 'vi-VN', 'đ', 'VND', '1.0-2')}`,
        `-${formatPercent((base - to) / base, 'vi-VN', '1.0-2')}`,
      ];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly Number = Number;
  protected readonly DATE_FORMAT = DATE_FORMAT;
}
