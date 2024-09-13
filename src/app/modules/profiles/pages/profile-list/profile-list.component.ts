import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemWithCounter, PROFILE_MENU_ITEMS } from '@shared/constants/side-menu.constant';
import { RequestingProfilesService } from '@shared/requesting-profiles.service';
import { eContentStatuses, eToastStatus } from '@shared/enums';
import { skip, Subject, takeUntil } from 'rxjs';
import {
  IFilterBase,
  IGetSellerRequestingProfileListPayload,
  IMcMenuItem,
  ISellerRequestingProfile,
} from '@shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributesActions, showToast, startLoading, stopLoading } from '@shared/stores';
import { Store } from '@ngrx/store';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RouteUtils } from '@shared/utils';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
})
export class ProfileListComponent implements OnInit, OnDestroy {
  readonly eContentStatuses = eContentStatuses;
  menuItems: MenuItemWithCounter[] = PROFILE_MENU_ITEMS;
  data: ISellerRequestingProfile[] = [];
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
    private requestingProfilesService: RequestingProfilesService,
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router,
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

  ngOnInit(): void {
    this.getCounters();
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

  getCounters() {
    this.requestingProfilesService
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
                  item.count = res.result.countApproval;

                  return item;
                }
                case eContentStatuses.AdminPending.toString(): {
                  item.count = res.result.countPending;
                  return item;
                }
                case eContentStatuses.AdminReviewing.toString(): {
                  item.count = res.result.countReview;
                  return item;
                }
                case eContentStatuses.AdminRejected.toString(): {
                  item.count = res.result.countReject;
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
    };
    this.loading = true;
    this.requestingProfilesService
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

  reviewing(id: string) {
    this.store$.dispatch(startLoading());
    this.requestingProfilesService
      .reviewing(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.store$.dispatch(stopLoading());
          if (res.statusCode == 200) {
            this.router.navigate([RouteUtils.ProfilesPage.Base, id]);
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'Chuyển trạng thái thành công',
              }),
            );
          }
        },
        error: () => {
          console.log('set status failed');
          this.store$.dispatch(stopLoading());
        },
      });
  }

  resetPagination(): void {
    this.filterObject.pageIndex = 1;
    this.filterObject.pageSize = 10;
  }
}
