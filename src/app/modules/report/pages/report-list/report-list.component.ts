import { Component } from '@angular/core';
import { DATE_TIME_FORMAT, REPORT_MENU_ITEMS } from '@shared/constants';
import {
  eContentStatuses, eMessageReportReason, eRatingReportReason,
  eRatingReportType,
  eReportContentStatus,
  eReportType,
  eReportUserType, eShopReportReason,
  eToastStatus
} from '@shared/enums';
import { ICommonResponse, IFilterBase } from '@shared/models';
import { Observable, skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AttributesActions, showToast, stopLoading } from '@shared/stores';
import { ReportService } from '@shared/report.service';
import { IReportCountingData, IReportData } from '@shared/report.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss'
})
export class ReportListComponent {
  menu = REPORT_MENU_ITEMS
  destroy$: Subject<void> = new Subject();
  filterObject: IFilterBase & {
    reportContentStatus?: eReportContentStatus
    reportReason?: string
    reportType?: eReportType;
    reportUserType?: eReportUserType;
  } = {
    pageIndex: 1,
    pageSize: 1,
    total: 0,
    search: '',
    reportUserType: eReportUserType.All,
    reportReason: ""
  };
  data: IReportData[] = []
  isLoading = false
  tableQueryParamsChange$ = new Subject<NzTableQueryParams & {
    type?: eReportType
  }>();

  reportReasonOption = [
    {label: "enums.rating_report_reason.all", value: ""},
  ]
  reportUserTypeOptions = [
    {label: "enums.report_user_type.all", value: ""},
    {label: "enums.report_user_type.seller", value: eReportUserType.Seller},
    {label: "enums.report_user_type.user", value: eReportUserType.User},
  ]

  constructor(
    private apiService: ReportService,
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router,
  ) {

    store$.dispatch(stopLoading());

    // this.menuItems.find((c) => c.id == 'categories')!.collapsed = true;
    this.store$.dispatch(AttributesActions.setTitle({ title: 'menu.registering_profiles.base' }));
    this.tableQueryParamsChange$.pipe(takeUntil(this.destroy$), skip(1)).subscribe((params) => {
      this.onQueryParamsChange(params);
    });

    const statuses = this.menu[1].children?.map((item) => item['queryParams']?.status?.toString()) || [];
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (!params.has('status') || !statuses.includes(params.get('status'))) {
        this.router.navigate([], { queryParams: { status: statuses[0] }, replaceUrl: true }).then();
      } else {

        if (!this.route.routeConfig?.path) {
          console.error("No report type found in route config")
        }
        // Check if route path is valid report type
        // Capitalize first letter of string of route path before comparing
        const routePath = this.route.routeConfig!.path!.charAt(0).toUpperCase() + this.route.routeConfig!.path!.slice(1);
        // Get eReportType from string
        const reportType = eReportType[routePath as keyof typeof eReportType];
        if (!Object.values(eReportType).includes(reportType)) {
          console.error("Invalid report type in route config", reportType)
        }

        this.filterObject.reportReason = "";
        this.filterObject.reportType = reportType;
        this.filterObject.reportContentStatus = Number(params.get('status'));
        this.resetPagination();
        this.getItems();
        this.getCounters();
        this.getReasons();
      }
    });
  }

  getReasons() {
    switch(this.filterObject.reportType) {
      case eReportType.Rating: {
        this.reportReasonOption = [

          {label: "enums.rating_report_reason.all", value: ""},
          {label: "enums.rating_report_reason.violation", value: eRatingReportReason.Violation.toString()},
          {label: "enums.rating_report_reason.fake", value: eRatingReportReason.Fake.toString()},
          {label: "enums.rating_report_reason.other", value: eRatingReportReason.Other.toString()},

      ]
        break;
      }
      case eReportType.Shop: {
        this.reportReasonOption = [
          { label: "enums.shop_report_reason.all", value: "" },
          { label: "enums.shop_report_reason.poor_quality", value: eShopReportReason.PoorQuality.toString() },
          { label: "enums.shop_report_reason.cheat", value: eShopReportReason.Cheat.toString() },
          { label: "enums.shop_report_reason.rating_fake", value: eShopReportReason.RatingFake.toString() },
          { label: "enums.shop_report_reason.other", value: eShopReportReason.Other.toString() },
        ]
        break
      }
      case eReportType.Message: {

          this.reportReasonOption = [
            { label: "enums.message_report_reason.all", value: "" },
            { label: "enums.message_report_reason.fake_product", value: eMessageReportReason.FakeProduct.toString() },
            { label: "enums.message_report_reason.contact_outside", value: eMessageReportReason.ContactOutside.toString() },
            { label: "enums.message_report_reason.violent_language", value: eMessageReportReason.ViolentLanguage.toString() },
            { label: "enums.message_report_reason.offensive_language", value: eMessageReportReason.OffensiveLanguage.toString() },
            { label: "enums.message_report_reason.other", value: eMessageReportReason.Other.toString() },
          ]
        break
      }
    }
  }

  getCounters(){
    let observable: Observable<ICommonResponse<IReportCountingData[]>> | null = null;
    switch(this.filterObject.reportType) {
      case eReportType.Rating:
        observable = this.apiService.countRatingReports();
        break;
      case eReportType.Shop:
        observable = this.apiService.countSellerReports();
        break;
      case eReportType.Message:
        observable = this.apiService.countMessagesReports();
        break;
      default: {
        console.error("Invalid report type", this.filterObject.reportType)
        return
      }
    }

    if (!observable) return;
    observable.pipe().subscribe((res) => {
      this.menu.find(i => i.id == this.filterObject.reportType)?.children?.forEach((item) => {
        item.count = res.result.data.find(i => {
          return i.status.toString() == item.id
        })?.count || 0
      })
    })
  }

  getItems() {
    this.isLoading = true;
    let observable: Observable<ICommonResponse<IReportData[]>> | null = null;

    const fromDate = this.filterObject.dateRange?.[0] ? new Date(this.filterObject.dateRange?.[0]).toISOString() : undefined;
    const toDate = this.filterObject.dateRange?.[1] ? new Date(this.filterObject.dateRange?.[1]).toISOString() : undefined;
    const reporterType = this.filterObject.reportUserType ? this.filterObject.reportUserType : undefined

    switch(this.filterObject.reportType) {
      case eReportType.Rating:
        observable = this.apiService.getRatingReports({
          offset: (this.filterObject.pageIndex - 1) * this.filterObject.pageSize,
          limit: this.filterObject.pageSize,
          contentStatus: this.filterObject.reportContentStatus,
          fromDate,
          toDate,
          reporterType,
          search: this.filterObject.search,
          reasonOption: this.filterObject.reportReason

        });
        break;
      case eReportType.Shop:
        observable = this.apiService.getSellerReports({
          offset: (this.filterObject.pageIndex - 1) * this.filterObject.pageSize,
          limit: this.filterObject.pageSize,
          contentStatus: this.filterObject.reportContentStatus,
          fromDate,
          toDate,
          reporterType,
          search: this.filterObject.search,
          reasonOption: this.filterObject.reportReason

        });
        break;
      case eReportType.Message:
        observable = this.apiService.getMessagesReports({
          offset: (this.filterObject.pageIndex - 1) * this.filterObject.pageSize,
          limit: this.filterObject.pageSize,
          contentStatus: this.filterObject.reportContentStatus,
          fromDate,
          toDate,
          reporterType,
          search: this.filterObject.search,
          reasonOption: this.filterObject.reportReason

        });
        break;
    }

    if (!observable) return;

    observable.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.data = res.result.data;
      this.filterObject.total = res.result.total || 0;
      this.isLoading = false;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams & {type?: eReportType}) {
    this.filterObject.pageIndex = params.pageIndex;
    this.filterObject.pageSize = params.pageSize;
    this.getItems();
  }

  review(report: IReportData) {

    let observable: Observable<any> | null = null;
    let cb: () => void = () => {}

    switch(this.filterObject.reportType) {
      case eReportType.Rating:
        observable = this.apiService.reviewRatingReport({
          reportedRatingID: report.reportedID,
          reportedRatingType: report.reportedObjectType as eRatingReportType
        })
        cb = () => {
          this.router.navigate([report.reportedID], {
            relativeTo: this.route,
            queryParams: this.getDetailQueryParams(report)
          })
        }
        break;
      case eReportType.Shop:
        observable = this.apiService.reviewSellerReport({reportedSellerID: report.reportedSellerID})
        cb  = () => {
          this.router.navigate([report.reportedSellerID], {
            relativeTo: this.route
          })
        }
        break;
      case eReportType.Message:
        observable = this.apiService.reviewMessageReport({reportedMessageID: report.reportedMessageID})
        cb = () => {
          this.router.navigate([report.reportedMessageID], {
            relativeTo: this.route
          })
        }
        break;
      default:
        this.store$.dispatch(
          showToast({
            message: "msg.feature_updating",
            status: eToastStatus.Warning,
            title: "Thông báo"
          })
        )
        return
    }

    observable?.pipe().subscribe((res) => {
      // Do something?
      // Navigate to detail page?
      cb?.()
    })
  }

  resetPagination(): void {
    this.filterObject.pageIndex = 1;
    this.filterObject.pageSize = 10;
  }

  onPageSizeChange() {
    this.filterObject.pageIndex = 1;
    this.getItems();
  }

  onPageIndexChange(pageIndex: number) {
    this.filterObject.pageIndex = pageIndex;
    this.getItems();
  }

  getDetailQueryParams(report: IReportData) {
    switch(this.filterObject.reportType) {
      case eReportType.Rating:
        return {type: report.reportedObjectType}
      default:
        return {}
    }
  }

  getDetailLink(report: IReportData) {
    switch (this.filterObject.reportType) {
      case eReportType.Rating:
        return [report.reportedID];
      case eReportType.Shop:
        return [report.reportedSellerID];
      case eReportType.Message:
        return [report.reportedMessageID];
    }
    return ["."]
  }

  onSearchKeywordChange(keyword: string) {
    this.filterObject.search = keyword;
    this.getItems()
  }

  protected readonly eReportUserType = eReportUserType;
  protected readonly eReportType = eReportType;
  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
  protected readonly eReportContentStatus = eReportContentStatus;
}
