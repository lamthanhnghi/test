import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemWithCounter, PROGRAM_MENU_ITEMS } from '@shared/constants/side-menu.constant';
import { IFilterBase, IMcMenuItem } from '@shared/models';
import { skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AttributesActions, showToast, startLoading, stopLoading } from '@shared/stores';
import { eContentStatuses, eToastStatus } from '@shared/enums';
import { IGetRequestingProgramListPayload, IRequestingProgram } from '@shared/program.model';
import { ProgramsService } from '@shared/programs.service';
import { RouteUtils } from '@shared/utils';

export type ProgramData = {
  id: string;
  name: string;
  desc: string;
  sellerName: string;
  createdAt: string;
  contentStatus: eContentStatuses;
  thumbnailUrl?: string;
};

export const PROGRAMS_MOCK_DATA: ProgramData[] = [
  {
    id: '1',
    thumbnailUrl: 'https://placehold.co/640x320',
    name: 'Program name',
    desc: 'Mua 10 hộp Xuyên Tâm Liên tặng 1 hộp ngay khi đạt doanh số. Sản phẩ...',
    sellerName: 'Cty CP DP An Đông',
    createdAt: '1/11/2023',
    contentStatus: eContentStatuses.AdminPending,
  },
  {
    id: '1',
    thumbnailUrl: 'https://placehold.co/640x320',
    name: 'Program name',
    desc: 'Mua 10 hộp Xuyên Tâm Liên tặng 1 hộp ngay khi đạt doanh số. Sản phẩ...',
    sellerName: 'Cty CP DP An Đông',
    createdAt: '1/11/2023',
    contentStatus: eContentStatuses.AdminReviewing,
  },
  {
    id: '1',
    thumbnailUrl: 'https://placehold.co/640x320',
    name: 'Program name',
    desc: 'Mua 10 hộp Xuyên Tâm Liên tặng 1 hộp ngay khi đạt doanh số. Sản phẩ...',
    sellerName: 'Cty CP DP An Đông',
    createdAt: '1/11/2023',
    contentStatus: eContentStatuses.AdminRejected,
  },
  {
    id: '1',
    thumbnailUrl: 'https://placehold.co/640x320',
    name: 'Program name',
    desc: 'Mua 10 hộp Xuyên Tâm Liên tặng 1 hộp ngay khi đạt doanh số. Sản phẩ...',
    sellerName: 'Cty CP DP An Đông',
    createdAt: '1/11/2023',
    contentStatus: eContentStatuses.AdminApproved,
  },
];

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.scss',
})
export class ProgramListComponent implements OnInit, OnDestroy {
  readonly eContentStatuses = eContentStatuses;
  menuItems: MenuItemWithCounter[] = PROGRAM_MENU_ITEMS;
  // data: ProgramData[] = PROGRAMS_MOCK_DATA;
  data: IRequestingProgram[] = [];
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
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router,
    private programsService: ProgramsService,
  ) {
    this.store$.dispatch(AttributesActions.setTitle({ title: 'menu.registering_profiles.base' }));
    this.tableQueryParamsChange$.pipe(takeUntil(this.destroy$), skip(1)).subscribe((params) => {
      this.onQueryParamsChange(params);
    });

    const statuses = this.menuItems.map((item) => item['queryParams']?.status?.toString());
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

  getCounters() {
    this.programsService
      .getCounters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.menuItems = (
              this.menuItems as (IMcMenuItem & {
                count: number;
                onClick?: () => void;
              })[]
            ).map((item) => {
              switch (item.id) {
                case eContentStatuses.AdminApproved.toString(): {
                  item.count = res.result.data.find((i) => i.status == eContentStatuses.AdminApproved)?.count || 0;
                  return item;
                }
                case eContentStatuses.AdminPending.toString(): {
                  item.count = res.result.data.find((i) => i.status == eContentStatuses.AdminPending)?.count || 0;
                  return item;
                }
                case eContentStatuses.AdminReviewing.toString(): {
                  item.count = res.result.data.find((i) => i.status == eContentStatuses.AdminReviewing)?.count || 0;
                  return item;
                }
                case eContentStatuses.AdminRejected.toString(): {
                  item.count = res.result.data.find((i) => i.status == eContentStatuses.AdminRejected)?.count || 0;
                  return item;
                }
                default: {
                  return item;
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

  ngOnInit(): void {
    return;
  }

  ngOnDestroy() {
    this.destroy$.complete();
    return;
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

  onSearchKeywordChange(keyword: string) {
    this.filterObject.search = keyword;
    this.filterObject.pageIndex = 1;
    this.getItems(this.filterObject);
  }

  getItems(filter: IFilterBase) {
    const payload: IGetRequestingProgramListPayload = {
      offset: (filter.pageIndex - 1) * filter.pageSize,
      limit: filter.pageSize,
      contentStatus: filter.contentStatus as eContentStatuses,
      search: filter.search,
    };
    this.loading = true;
    this.programsService
      .getItems(payload)
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

  onPageSizeChange() {
    this.filterObject.pageIndex = 1;
    this.getItems(this.filterObject);
  }

  onPageIndexChange(pageIndex: number) {
    this.filterObject.pageIndex = pageIndex;
    this.getItems(this.filterObject);
  }

  review(id: string) {
    this.store$.dispatch(startLoading());
    this.programsService
      .review({ programID: id })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            // this.getItems(this.filterObject);
            // this.getCounters();
            this.router.navigate([RouteUtils.ProgramsPage.Base, id]);
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'Chuyển trạng thái thành công',
              }),
            );
          }
          this.store$.dispatch(stopLoading());
        },
        error: () => {
          console.log('review failed');
          this.store$.dispatch(stopLoading());
        },
      });
  }
}
