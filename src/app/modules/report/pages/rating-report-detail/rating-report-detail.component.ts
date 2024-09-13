import { Component } from '@angular/core';
import { IMcBreadcrumb } from '@shared/models';
import { IProductRating } from '@shared/product-rating.model';
import {
  eContentStatuses,
  eRatingReportType,
  eReportAction,
  eReportContentStatus,
  eReportType,
  eReportUserType
} from '@shared/enums';
import { ReportService } from '@shared/report.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { eReportHandleFormKeys } from '@modules/report/pages/seller-report-detail/seller-report-detail.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonHelpers } from '@shared/utils';
import { IReportInfo } from '@shared/report.model';


@Component({
  selector: 'app-rating-report-detail',
  templateUrl: './rating-report-detail.component.html',
  styleUrl: './rating-report-detail.component.scss'
})
export class RatingReportDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    {title: "Báo xấu", link: ".."},
    {title: "Chi tiết", disabled: true, link: "."},
  ]
  data: IProductRating | null = null;
  destroy$: Subject<void> = new Subject<void>();
  productRatingActions = [
    {label: "Ẩn bình luận", value: eReportAction.HideComment},
    {label: "Không phát hiện vi pham", value: eReportAction.RejectReport},
  ]
  actions: {label: string, value: eReportAction}[] = [];
  form: FormGroup = new FormGroup({
    [eReportHandleFormKeys.Note]: new FormControl(""),
    [eReportHandleFormKeys.Option]: new FormControl(null, [Validators.required]),
  });
  type: eRatingReportType | undefined;
  contentStatus: eReportContentStatus | undefined
  id: string | undefined
  titleConfig = {
    icon: "",
    color: "",
    title: "",
  };
  titleConfigs = {
    "rating": {icon: "star", color: "text-yellow", title: "Báo xấu đánh giá"},
    "message": {icon: "chat-circle", color: "text-blue", title: "Báo xấu tin nhắn"},
    "shop": {icon: "store-front", color: "text-pink", title: "Báo xấu shop"},
  }

  constructor(
    private apiService: ReportService,
    private store$: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.type = Number(this.route.snapshot.queryParams.type) as eRatingReportType

      // if type is not a valid eRatingReportType, return
      if (this.type === undefined || isNaN(this.type)) {
        this.router.navigate([".."], {relativeTo: this.route})
        return
      }

      this.data = data['dataResolved'];
      this.getContentStatus()
      this.getId()
      this.getInfo()
    });

    this.actions = this.productRatingActions;
    this.titleConfig = this.titleConfigs.rating
  }

  getInfo() : IReportInfo | undefined {
    if (!this.data) return undefined;
    return {
      avatar: this.type == eRatingReportType.SellerComment ? this.data.dataRating.userAvatar : this.data.dataRating.sellerAvatar,
      name: this.type == eRatingReportType.SellerComment ? this.data.dataRating.userContactFullName : this.data.dataRating.businessName,
      reportUserType: this.type == eRatingReportType.SellerComment ? eReportUserType.User : eReportUserType.Seller,
      reportType: eReportType.Rating,
      reportDate: this.data.dataRating.createdDate,
      reasonOption: this.type == eRatingReportType.UserComment
        ? this.data.dataRating.reportedRatingProduct!.reasonOption
        : this.data.dataRating.reportedReplyOfRatingProduct!.reasonOption,
      note: this.type == eRatingReportType.UserComment
        ? this.data.dataRating.reportedRatingProduct!.reasonDescription
        : this.data.dataRating.reportedReplyOfRatingProduct!.reasonDescription
    }
  }

  getId() {
    if (!this.data) return;
    this.id = this.type == eRatingReportType.UserComment
      ? this.data.dataRating.reportedRatingProduct?.reportedRatingProductID
      : this.data.dataRating.reportedReplyOfRatingProduct?.reportedReplyOfRatingProductID
  }

  getContentStatus() {

    if (!this.data) return;

    switch(this.type) {
      case eRatingReportType.UserComment: {
        this.contentStatus = this.data.dataRating.reportedRatingProduct?.contentStatus
        break;
      }
      case eRatingReportType.SellerComment: {
        this.contentStatus = this.data.dataRating.reportedReplyOfRatingProduct?.contentStatus
        break;
      }
    }
  }

  setStatus(status: eReportContentStatus): void {

    if (!this.data) return;

    let observable: Observable<any> | null = null;
    let cb: () => void = () => {}
    const reportedRatingID = this.type== eRatingReportType.UserComment
      ? this.data.dataRating.reportedRatingProduct?.reportedRatingProductID
      : this.data.dataRating.reportedReplyOfRatingProduct?.reportedReplyOfRatingProductID

    switch(status) {
      case eReportContentStatus.Reviewing: {
        observable = this.apiService.reviewRatingReport({
          reportedRatingID: reportedRatingID!,
          reportedRatingType: this.type!
        })
        break;
      }
      case eReportContentStatus.Handled: {
        if (this.form.invalid) {
          CommonHelpers.markFormDirty(this.form);
          return
        }

        observable = this.apiService.handleRatingReport({
          reportedRatingID: reportedRatingID!,
          reportedRatingType: this.type!,
          action: this.form.value[eReportHandleFormKeys.Option] as eReportAction,
          note: this.form.value[eReportHandleFormKeys.Note],
        })

        cb = () => {
          this.router
            .navigate(["..", this.id], {
              relativeTo: this.route,
              onSameUrlNavigation: 'reload',
              queryParams: {
                type: this.type,
              }
            })
            .then();
        }
        break;
      }
    }

    observable?.subscribe(() => {
      // Do something
      cb?.()
    })
  }


  protected readonly eContentStatuses = eContentStatuses;
  protected readonly console = console;
  protected readonly eReportContentStatus = eReportContentStatus;
  protected readonly eReportHandleFormKeys = eReportHandleFormKeys;
  protected readonly eReportAction = eReportAction;
}
