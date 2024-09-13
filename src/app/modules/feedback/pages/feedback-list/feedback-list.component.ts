import { Component } from '@angular/core';
import { DATE_TIME_FORMAT, FEEDBACK_MENU_ITEMS } from '@shared/constants';
import { IReportCountingData, IReportData } from '@shared/report.model';
import { Observable, skip, Subject, takeUntil } from 'rxjs';
import { eFeedbackFilterType, eFeedbackTopic, eRatingReportType, eReportUserType, eToastStatus } from '@shared/enums';
import { showToast } from '@shared/toast';
import { IFeedbackData } from '@shared/feedback.model';
import { ReportService } from '@shared/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICommonResponse, IFilterBase } from '@shared/models';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { FeedbackService } from '@shared/feedback.service';
import { AttributesActions, stopLoading } from '@shared/stores';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackListComponent {
  menu = FEEDBACK_MENU_ITEMS
  destroy$: Subject<void> = new Subject();
  filterObject: IFilterBase & {
    fromUserType?: eReportUserType
    topic?: eFeedbackTopic
    filterType?: eFeedbackFilterType
  } = {
    pageIndex: 1,
    pageSize: 1,
    total: 0,
    search: '',
    fromUserType: eReportUserType.All,
    filterType: eFeedbackFilterType.All,
    topic: eFeedbackTopic.All
  };
  data: IFeedbackData[] = []
  isLoading = false
  tableQueryParamsChange$ = new Subject<NzTableQueryParams & {
  }>();

  userTypeOptions = [
    {label: "enums.report_user_type.all", value: ""},
    {label: "enums.report_user_type.seller", value: eReportUserType.Seller},
    {label: "enums.report_user_type.user", value: eReportUserType.User},
  ]

   topicOptions = [
      {label: "enums.feedback_topic.all", value: ""},
      {label: "enums.feedback_topic.consultation", value: eFeedbackTopic.Consultation},
      {label: "enums.feedback_topic.reflection", value: eFeedbackTopic.Reflection},
      {label: "enums.feedback_topic.suggestion", value: eFeedbackTopic.Suggestion},
      {label: "enums.feedback_topic.other", value: eFeedbackTopic.Other},
   ]

  constructor(
    private apiService: FeedbackService,
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

    const statuses = this.menu[0].children?.map((item) => item['queryParams']?.status?.toString()) || [];
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (!params.has('status') || !statuses.includes(params.get('status'))) {
        this.router.navigate([], { queryParams: { status: statuses[0] }, replaceUrl: true }).then();
      } else {
        this.filterObject.filterType = Number(params.get('status'));
        this.resetPagination();
        this.getItems();
        this.getCounters();
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams & {
    status?: eFeedbackFilterType
  }) {
    this.filterObject.pageIndex = params.pageIndex;
    this.filterObject.pageSize = params.pageSize;
    this.filterObject.filterType = params.status;
    this.getItems();
  }

  review(item: IFeedbackData) {


    this.apiService.review({
      feedbackID: item.feedbackID
    }).pipe().subscribe((res) => {
      // Do something?
      // Navigate to detail page?
      this.router.navigate([item.feedbackID], {
        relativeTo: this.route,
      })
    })
  }

  getCounters(){

    this.apiService.getCounters()
    .pipe().subscribe((res) => {
      this.menu[0]?.children?.forEach((item) => {
        item.count = res.result.data.find(i => {
          return i.status.toString() == item.id
        })?.count || 0
      })
    })
  }

  getItems() {
    this.isLoading = true;
    const fromDate = this.filterObject.dateRange?.[0] ? new Date(this.filterObject.dateRange?.[0]).toISOString() : undefined;
    const toDate = this.filterObject.dateRange?.[1] ? new Date(this.filterObject.dateRange?.[1]).toISOString() : undefined;
    const fromUserType = this.filterObject.fromUserType ? this.filterObject.fromUserType : undefined
    const topic = this.filterObject.topic ? this.filterObject.topic : undefined


    this.apiService.getFeedbacks({
      offset: (this.filterObject.pageIndex - 1) * this.filterObject.pageSize,
      limit: this.filterObject.pageSize,
      filter: this.filterObject.filterType,
      fromDate,
      toDate,
      search: this.filterObject.search,
      fromUserType,
      topic
    }).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.data = res.result.data;
      this.filterObject.total = res.result.total || 0;
      this.isLoading = false;
    });
  }



  onSearchKeywordChange(keyword: string) {
    this.filterObject.search = keyword;
    this.getItems()
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

  protected readonly eReportUserType = eReportUserType;
  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
  protected readonly eFeedbackFilterType = eFeedbackFilterType;
}
