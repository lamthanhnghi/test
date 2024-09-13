import { Component } from '@angular/core';
import { GROUPS_MENU_ITEMS } from '@shared/constants';
import { IBrand, IConfirmModal, IFilterBase, IMcMenuItem, IPagination, IProductCategory } from '@shared/models';
import { skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BrandService } from '@shared/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmModalComponent } from '@shared/components';
import { eConfirmModalTypes, eContentStatuses, eLayouts } from '@shared/enums';
import { IAttribute, startLoading, stopLoading } from '@shared/stores';
import { RouteUtils } from '@shared/utils';
import { AttributesService } from '@shared/services';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrl: './attribute-list.component.scss'
})
export class AttributeListComponent {
  menuItems = GROUPS_MENU_ITEMS
  protected readonly RouteUtils = RouteUtils;
  data: IAttribute[] = [];
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
    private apiService: AttributesService,
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router,
    private modal : NzModalService
  ) {
    // this.store$.dispatch(AttributesActions.setTitle({ title: 'menu.registering_profiles.base' }));
    this.tableQueryParamsChange$.pipe(takeUntil(this.destroy$), skip(1)).subscribe((params) => {
      this.onQueryParamsChange(params);
    });

    const statuses = this.menuItems.find(i => i.id == "attributes")?.children?.map((item) => item['queryParams']?.status?.toString()) || [];
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

  getCategoryNames(categories: IProductCategory[]): string {
    return categories.map((category) => category.productCategoryName).filter(i => i).join(', ');
  }

  getCounters() {
    this.apiService
      .getCounters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.menuItems = this.menuItems.map((parent) => {
              if (parent.id != 'attributes') return parent;
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

  delete(item: IAttribute): void {
    // const modalRef = this.modal.create({
    //   nzClassName: 'modal-confirm',
    //   nzContent: ConfirmModalComponent,
    //   nzData: {
    //     type: eConfirmModalTypes.Confirm,
    //     title: 'msg.confirm',
    //     message: `msg.confirm_delete_data`,
    //   } as IConfirmModal,
    // });
    //
    // modalRef.componentInstance?.okEvent$.subscribe(() => {
    //   if (item?.brandID) {
    //     this.store$.dispatch(startLoading());
    //     this.apiService.delete({ brandID: item.brandID }).subscribe({
    //       next: () => {
    //         this.store$.dispatch(stopLoading());
    //         modalRef.close();
    //         this.getItems(this.filterObject);
    //         this.getCounters()
    //       },
    //       error: (err) => {
    //         this.store$.dispatch(stopLoading());
    //         console.error(err);
    //       },
    //     });
    //   } else {
    //     this.router.navigate(['../'], { relativeTo: this.route }).then();
    //   }
    // });
  }
  getItems(filter: IFilterBase) {
    const pagination: IPagination = {
      offset: (filter.pageIndex - 1) * filter.pageSize,
      limit: filter.pageSize,
      contentStatus: filter.contentStatus as eContentStatuses,
      search: filter.search,
    };
    this.loading = true;
    this.apiService
      .getList2(pagination)
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
  protected readonly eLayouts = eLayouts;
}
