import { Component, OnDestroy } from '@angular/core';
import { IMcBreadcrumb } from '@shared/models';
import { IReportData, IReportInfo } from '@shared/report.model';
import { ReportService } from '@shared/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { eReportAction, eReportContentStatus, eReportType } from '@shared/enums';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@shared/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { eReportHandleFormKeys } from '@modules/report/pages/seller-report-detail/seller-report-detail.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonHelpers } from '@shared/utils';

@Component({
  selector: 'app-message-report-detail',
  templateUrl: './message-report-detail.component.html',
  styleUrl: './message-report-detail.component.scss'
})
export class MessageReportDetailComponent implements OnDestroy{
  breadcrumbs: IMcBreadcrumb[] = [
    {title: "Báo xấu", link: ".."},
    {title: "Chi tiết", disabled: true, link: "."},
  ]
  destroy$: Subject<void> = new Subject<void>();
  data: IReportData | null = null;
  selectedAction?: string;
  messageActions = [
    {label: "Khóa tài khoản", value: eReportAction.BlockUser},
    {label: "Không phát hiện vi pham", value: eReportAction.RejectReport},
  ]
  actions: {label: string, value: eReportAction}[] = [];
  form: FormGroup = new FormGroup({
    [eReportHandleFormKeys.Note]: new FormControl(""),
    [eReportHandleFormKeys.Option]: new FormControl(null, [Validators.required]),
  });

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


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
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store
  ) {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
    });

    this.actions = this.messageActions;
    this.titleConfig = this.titleConfigs.message
  }

  getInfo(): IReportInfo | undefined{
    if (!this.data) return undefined

    return {
      avatar: this.data?.memberInfos[0].memberAvatar,
      note: this.data.reasonDescription,
      name: this.data.memberInfos[0].memberName,
      reportUserType: this.data.memberInfos[0].memberType,
      reportType: eReportType.Message,
      reportDate: this.data.reportedDate,
      reasonOption: this.data.reasonOption
    }
  }

  setStatus(status: eReportContentStatus): void {


    if (!this.data) return;

    let observable: Observable<any> | null = null;
    let cb: () => void = () => {}

    switch(status) {
      case eReportContentStatus.Reviewing: {
        observable = this.apiService.reviewSellerReport({
          reportedSellerID: this.data.reportedSellerID,
        })
        break;
      }
      case eReportContentStatus.Handled: {
        if (this.form.invalid) {
          CommonHelpers.markFormDirty(this.form);
          return
        }

        observable = this.apiService.handleMessageReport({
          reportedMessageID: this.data!.reportedMessageID,
          action: this.form.value[eReportHandleFormKeys.Option] as eReportAction,
          note: this.form.value[eReportHandleFormKeys.Note],
        })

        cb = () => {
          this.router
            .navigate(["..", this.data!.reportedMessageID], {
              relativeTo: this.route,
              onSameUrlNavigation: 'reload',
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


  protected readonly eReportContentStatus = eReportContentStatus;
  protected readonly eReportAction = eReportAction;
  protected readonly DATE_FORMAT = DATE_FORMAT;
  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
  protected readonly eReportHandleFormKeys = eReportHandleFormKeys;
}
