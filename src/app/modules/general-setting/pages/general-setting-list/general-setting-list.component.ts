import { Component, OnDestroy } from '@angular/core';
import { GENERAL_SETTING_MENU_ITEMS } from '@shared/constants';
import { skip, Subject, takeUntil } from 'rxjs';
import { IFilterBase, IMcMenuItem, IPagination } from '@shared/models';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { GeneralSettingService } from '@shared/general-setting.service';
import { IGeneralSettingListItem } from '@shared/general-setting.model';
import { RouteUtils } from '@shared/utils';
import { ActivatedRoute } from '@angular/router';
import { eContentStatuses } from '@shared/enums';

@Component({
  selector: 'app-general-setting-list',
  templateUrl: './general-setting-list.component.html',
  styleUrl: './general-setting-list.component.scss',
})
export class GeneralSettingListComponent implements OnDestroy {
  menuItems = GENERAL_SETTING_MENU_ITEMS;
  data: IGeneralSettingListItem[] = [];
  destroy$: Subject<void> = new Subject();
  filterObject: IFilterBase = {
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    search: '',
  };
  loading = false;

  tableQueryParamsChange$ = new Subject<NzTableQueryParams>();

  constructor(
    private modal: NzModalService,
    private store$: Store,
    private generalSettingService: GeneralSettingService,
    private route: ActivatedRoute,
  ) {
    this.tableQueryParamsChange$.pipe(takeUntil(this.destroy$), skip(1)).subscribe((params) => {
      this.onQueryParamsChange(params);
    });
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.filterObject.contentStatus = Number(params.get('status'));
      this.resetPagination();
      this.getCounters();
      this.getItems(this.filterObject);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  getCounters() {
    this.generalSettingService
      .getCounters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.menuItems = this.menuItems.map((parent) => {
              if (parent.id != 'authentication') return parent;
              parent.children = (parent.children as (IMcMenuItem & {
                count: number;
                onClick?: () => void;
              })[])!.map((item) => {
                switch (item.id) {
                  case eContentStatuses.All: {
                    item.count = res.result.data.reduce((previousValue, currentValue) => {
                      return previousValue + currentValue.count;
                    }, 0);
                    return item;
                  }
                  case eContentStatuses.Draft: {
                    item.count = res.result.data.find((item) => item.status === eContentStatuses.Draft)?.count || 0;
                    return item;
                  }
                  case eContentStatuses.AdminApproved: {
                    item.count =
                      res.result.data.find((item) => item.status === eContentStatuses.AdminApproved)?.count || 0;
                    return item;
                  }
                  case eContentStatuses.AdminPending: {
                    item.count =
                      res.result.data.find((item) => item.status === eContentStatuses.AdminPending)?.count || 0;
                    return item;
                  }
                  case eContentStatuses.AdminReviewing: {
                    item.count =
                      res.result.data.find((item) => item.status === eContentStatuses.AdminReviewing)?.count || 0;
                    return item;
                  }
                  case eContentStatuses.AdminRejected: {
                    item.count =
                      res.result.data.find((item) => item.status === eContentStatuses.AdminRejected)?.count || 0;
                    return item;
                  }
                  case eContentStatuses.AdminArchived: {
                    item.count =
                      res.result.data.find((item) => item.status === eContentStatuses.AdminArchived)?.count || 0;
                    return item;
                  }
                  default: {
                    return item;
                  }
                }
              });
              return parent;
            });
          }
        },
        error: () => {
          console.log('get counters failed');
        },
      });
  }

  getItems(filter: IFilterBase) {
    const pagination: IPagination = {
      offset: (filter.pageIndex - 1) * filter.pageSize,
      limit: filter.pageSize,
      search: filter.search,
      contentStatus: filter.contentStatus,
    };
    this.loading = true;
    this.generalSettingService
      .getList(pagination)
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
          this.loading = false;
        },
      });
  }

  resetPagination(): void {
    this.filterObject.pageIndex = 1;
    this.filterObject.pageSize = 10;
  }

  protected readonly RouteUtils = RouteUtils;
}
