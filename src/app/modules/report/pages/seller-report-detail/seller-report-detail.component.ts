import { Component } from '@angular/core';
import { ePageActions, eReportAction, eReportContentStatus } from '@shared/enums';
import { IMcBreadcrumb } from '@shared/models';
import { IReportData } from '@shared/report.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '@shared/report.service';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { eReturnPolicyFormKeys } from '@shared/return-policy.model';
import { CommonHelpers } from '@shared/utils';
import { DATE_TIME_FORMAT } from '@shared/constants';


export const eReportHandleFormKeys = {
  Note: 'note',
  Option: 'option',
}

@Component({
  selector: 'app-seller-report-detail',
  templateUrl: './seller-report-detail.component.html',
  styleUrl: './seller-report-detail.component.scss'
})

export class SellerReportDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    {title: "Báo xấu", link: ".."},
    {title: "Chi tiết", disabled: true, link: "."},
  ]
  data: IReportData | null = null;
  shopActions = [
    {label: "Khóa shop", value: eReportAction.BlockSeller},
    {label: "Không phát hiện vi pham", value: eReportAction.RejectReport},
  ]
  actions: {label: string, value: eReportAction}[] = [];


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
  form: FormGroup = new FormGroup({
    [eReportHandleFormKeys.Note]: new FormControl(""),
    [eReportHandleFormKeys.Option]: new FormControl(null, [Validators.required]),
  });

  constructor(
    private apiService: ReportService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store
  ) {
    this.data = route.snapshot.data['dataResolved'];
    this.actions = this.shopActions;
    this.titleConfig = this.titleConfigs.shop
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

        observable = this.apiService.handleSellerReport({
          reportedSellerID: this.data!.reportedSellerID,
          action: this.form.value[eReportHandleFormKeys.Option] as eReportAction,
          note: this.form.value[eReportHandleFormKeys.Note],
        })

        cb = () => {
          this.router
            .navigate(["..", this.data!.reportedSellerID], {
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

    // this.store$.dispatch(
    //   showToast({
    //     status: eToastStatus.Warning,
    //     title: 'Thông báo',
    //     message: "msg.updating",
    //   }),
    // );
  }

  protected readonly eReportContentStatus = eReportContentStatus;
  protected readonly ePageActions = ePageActions;
  protected readonly FormKeys = eReturnPolicyFormKeys;
  protected readonly eReportHandleFormKeys = eReportHandleFormKeys;
  protected readonly eReportAction = eReportAction;
  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
}
