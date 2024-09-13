import { Component, OnDestroy, OnInit } from '@angular/core';
import { QA_MENU_ITEMS } from '@shared/constants/side-menu.constant';
import { RouteUtils } from '@shared/utils';
import { eContentStatuses, eUserTypes } from '@shared/enums';
import { IFilterBase, IGetSellerRequestingProfileListPayload, IQnA } from '@shared/models';
import { delay, skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuestionAndAnswerService } from '@shared/services';

@Component({
  selector: 'app-question-and-answer-list',
  templateUrl: './question-and-answer-list.component.html',
  styleUrl: './question-and-answer-list.component.scss',
})
export class QuestionAndAnswerListComponent implements OnInit, OnDestroy {
  menuItems = QA_MENU_ITEMS;
  selectedIndex: 0 | 1 = 0;
  typeIndexMap = {
    [0]: eUserTypes.Seller,
    [1]: eUserTypes.User,
  }
  tabChange$: Subject<void> = new Subject();
  isShow = true;
  protected readonly RouteUtils = RouteUtils;
  data: IQnA[] = [];
  destroy$: Subject<void> = new Subject();
  filterObject: IFilterBase = {
    pageIndex: 1,
    pageSize: 1,
    total: 0,
    contentStatus: eContentStatuses.All,
    search: '',
  };
  loading = false;

  tableQueryParamsChange$ = new Subject<NzTableQueryParams>();

  constructor(
    private apiService: QuestionAndAnswerService,
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router,
  ) {
    this.tabChange$.pipe(takeUntil(this.destroy$), delay(300)).subscribe(() => {
      this.isShow = true;
    });
    // this.store$.dispatch(AttributesActions.setTitle({ title: 'menu.registering_profiles.base' }));
    this.tableQueryParamsChange$.pipe(takeUntil(this.destroy$), skip(1)).subscribe((params) => {
      this.onQueryParamsChange(params);
    });

    const statuses = this.menuItems[0].children?.map((item) => item['queryParams']?.status?.toString()) || [];
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (!params.has('status') || !statuses.includes(params.get('status'))) {
        this.router.navigate([], { queryParams: { status: statuses[0] }, replaceUrl: true }).then();
      } else {
        this.filterObject.contentStatus = Number(params.get('status'));
        this.resetPagination();
        this.getCounters();
        this.getItems(this.filterObject);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    return;
  }

  ngOnInit(): void {
    return;
  }

  onTabChange(index: 0 | 1): void {
    this.isShow = false;
    this.tabChange$.next();
    this.selectedIndex = index;
    this.data = [];
    this.getItems(this.filterObject);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || undefined;
    const sortOrder = (currentSort && currentSort.value) || undefined;
    this.filterObject = {
      ...this.filterObject,
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      filter,
    };
  }

  resetPagination(): void {
    this.filterObject.pageIndex = 1;
    this.filterObject.pageSize = 10;
  }

  getCounters() {
    this.apiService
      .getCounters(this.typeIndexMap[this.selectedIndex])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.menuItems[0].children?.forEach((item) => {
              if (item['queryParams'].status === eContentStatuses.All) {
                item['count'] = res.result.data.reduce((acc, cur) => acc + cur.count, 0);
                return;
              } else {
                const found = res.result.data.find((result) => result.status === item['queryParams'].status);
                if (found) {
                  item['count'] = found.count;
                }
              }
            });
          }
        },
        error: () => {
          console.log('get counters failed');
        },
      });
  }

  onPageSizeChange() {
    this.filterObject.pageIndex = 1;
    this.getItems(this.filterObject);
  }

  onPageIndexChange(pageIndex: number) {
    this.filterObject.pageIndex = pageIndex;
    this.getItems(this.filterObject);
  }

  onSearchKeywordChange(keyword: string) {
    this.filterObject.search = keyword;
    this.filterObject.pageIndex = 1;
    this.getItems(this.filterObject);
  }

  getItems(filter: IFilterBase) {
    const pagination: IGetSellerRequestingProfileListPayload = {
      offset: (filter.pageIndex - 1) * filter.pageSize,
      limit: filter.pageSize,
      contentStatus: filter.contentStatus as eContentStatuses,
      search: filter.search,
      qnaType: this.typeIndexMap[this.selectedIndex]
    };
    this.loading = true;
    this.apiService
      .getItems(pagination)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.data = res.result.data || [];
            this.filterObject.total = res.result.total || 0;
          }
          this.loading = false;
        },
        error: () => {
          console.log('get items failed');
          this.loading = false;
        },
      });
  }

  protected readonly eContentStatuses = eContentStatuses;
  protected readonly eUserTypes = eUserTypes;
}
