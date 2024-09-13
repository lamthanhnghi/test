import { Component, OnDestroy } from '@angular/core';
import { COMMUNITY_STANDARDS_MENU_ITEMS } from '@shared/constants';
import { map, Observable, skip, takeUntil } from 'rxjs';
import { IFilterBase, ILoadingState, IPagination } from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { BaseListModel } from '@shared/base-list.model';
import { SharedModule } from '@shared/shared.module';
import { BadWordsService } from '@shared/bad-words.service';
import { IBadWord } from '@shared/bad-word.model';
import { eContentStatuses, eRoles } from '@shared/enums';
import { RoleDirective } from '@shared/role.directive';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';

@Component({
  selector: 'app-community-standards-list',
  templateUrl: './community-standards-list.component.html',
  styleUrl: './community-standards-list.component.scss',
  standalone: true,
  imports: [SharedModule, ItemListMasterLayoutModule, RoleDirective],
  providers: [BadWordsService],
})
export class CommunityStandardsListComponent extends BaseListModel implements OnDestroy {
  menuItems = CommonHelpers.cloneObject(COMMUNITY_STANDARDS_MENU_ITEMS);
  data: IBadWord[] = [];
  title$: Observable<string> = this.route?.data?.pipe(map((data) => data.title ?? 'common.list'));
  protected readonly RouteUtils = RouteUtils;
  protected readonly eContentStatuses = eContentStatuses;
  protected readonly eRoles = eRoles;

  constructor(
    private apiService: BadWordsService,
    public route: ActivatedRoute,
    private router: Router,
    private store$: Store<ILoadingState>,
  ) {
    super({ router });
    if (this.isReviewer) {
      this.menuItems.forEach((parent) => {
        parent.children = parent?.children?.filter(
          (child) => ![eContentStatuses.All, eContentStatuses.Draft].includes(child.id),
        );
      });
    }

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

  getCounters() {
    this.apiService
      .getCounters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.menuItems = CommonHelpers.fillCountByStatus(this.menuItems, res.result.data, 'community_standards');
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
    this.apiService
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

  reviewing(data: IBadWord) {
    if (!data?.badWordID) {
      return;
    }
    this.store$.dispatch(startLoading());
    this.apiService.review({ badWordID: data.badWordID! }).subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.statusCode == 200) {
          this.router.navigate(['./', res.result.data.badWordID], { relativeTo: this.route }).then();
        }
      },
      error: () => {
        this.store$.dispatch(stopLoading());
      },
    });
  }
}
