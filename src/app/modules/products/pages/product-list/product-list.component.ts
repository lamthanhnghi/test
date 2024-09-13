import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { debounceTime, map, skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { eContentStatuses, eProductSortTypes } from '@shared/enums';
import { RouteUtils } from '@shared/utils';
import {
  IFilterBase,
  IGetSellerRequestingProfileListPayload,
  IMcMenuItem,
  IPagination,
  IProductCategory,
  IProductGroupItem,
  SsrSelection,
} from '@shared/models';
import { startLoading, stopLoading } from '@shared/stores';
import { MenuItemWithCounter, PROFILE_MENU_ITEMS } from '@shared/constants';
import { RequestingProductService } from '@shared/requesting-product.service';
import { ISellerRequestingProduct } from '@shared/requesting-product.model';
import { ProductGroupService } from '@shared/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductListComponent implements OnInit, OnDestroy {
  readonly eContentStatuses = eContentStatuses;
  readonly allGroupID = 'product-group-option-all';
  readonly allCategoryID = 'product-category-option-all';
  menuItems: MenuItemWithCounter[] = PROFILE_MENU_ITEMS;
  data: ISellerRequestingProduct[] = [];
  destroy$: Subject<void> = new Subject();
  filterObject: IFilterBase & { productGroupID: string; productCategoryID: string } = {
    pageIndex: 1,
    pageSize: 1,
    total: 0,
    contentStatus: eContentStatuses.All,
    search: '',
    productCategoryID: this.allCategoryID,
    productGroupID: this.allGroupID,
    orderBy: '',
  };
  loading = false;
  sortOptions: { field: string; value: eProductSortTypes; label: string }[] = [];

  tableQueryParamsChange$ = new Subject<NzTableQueryParams>();

  /** handle product group selection */
  productGroupSelection = new SsrSelection<IProductGroupItem>({
    getDataFn: (query) => this.productGroupService.getItems({ ...query }).pipe(takeUntil(this.destroy$)),
    optionAll: { productGroupID: this.allGroupID, productGroupName: 'common.all' },
  });

  /** handle product category selection */
  productCategorySelection = new SsrSelection<IProductCategory>({
    getDataFn: this.getProductCategoryFn,
    optionAll: { productCategoryID: this.allCategoryID, productCategoryName: 'common.all' },
  });

  filterChange$ = new Subject<void>();

  get getProductCategoryFn() {
    return (query: IPagination) =>
      this.productGroupService
        .getItemsByProductGroupID({
          ...query,
          productGroupID: this.filterObject.productGroupID ?? '',
        })
        .pipe(
          takeUntil(this.destroy$),
          map((res) => {
            const data = res?.result?.data || [];
            res.result.data = data.reduce((acc: IProductCategory[], cur) => {
              return [...acc, cur, ...(cur?.subCategories?.map((item) => ({ ...item, parentCategory: cur })) ?? [])];
            }, []);
            return res;
          }),
        );
  }

  constructor(
    private requestingProduct$: RequestingProductService,
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router,
    private productGroupService: ProductGroupService,
    private translate: TranslateService,
  ) {
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
        this.getItems();
      }
    });

    this.filterChange$.pipe(takeUntil(this.destroy$), debounceTime(100)).subscribe(() => {
      this.onSubmitFilter();
    });
  }

  ngOnInit(): void {
    this.sortOptions = [
      {
        field: 'productPublishName',
        value: eProductSortTypes.OrderByNameAsc,
        label: `${this.translate.instant('common.product_name')} ${this.translate.instant('sort.asc').toLowerCase()}`,
      },
      {
        field: 'updateDate',
        value: eProductSortTypes.OrderByNewest,
        label: `${this.translate.instant('sort.newest')}`,
      },
    ];
  }

  onSubmitFilter() {
    this.getItems();
  }

  groupChange(): void {
    this.filterObject.productCategoryID = this.allCategoryID;
    this.productCategorySelection.reset();
    this.productCategorySelection.loadData();
    this.filterObject.pageIndex = 1;
    this.filterChange$.next();
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
    this.requestingProduct$
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
                  item.count = res.result.data.find((item) => item.status === eContentStatuses.AdminApproved)!.count;
                  return item;
                }
                case eContentStatuses.AdminPending.toString(): {
                  item.count = res.result.data.find((item) => item.status === eContentStatuses.AdminPending)!.count;
                  return item;
                }
                case eContentStatuses.AdminReviewing.toString(): {
                  item.count = res.result.data.find((item) => item.status === eContentStatuses.AdminReviewing)!.count;
                  return item;
                }
                case eContentStatuses.AdminRejected.toString(): {
                  item.count = res.result.data.find((item) => item.status === eContentStatuses.AdminRejected)!.count;
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
    this.getItems();
  }

  onPageIndexChange(pageIndex: number) {
    this.filterObject.pageIndex = pageIndex;
    this.getItems();
  }

  onSearchKeywordChange(keyword: string) {
    this.filterObject.search = keyword;
    this.filterObject.pageIndex = 1;
    this.getItems();
  }

  getItems() {
    const pagination: IGetSellerRequestingProfileListPayload = {
      offset: (this.filterObject.pageIndex - 1) * this.filterObject.pageSize,
      limit: this.filterObject.pageSize,
      contentStatus: this.filterObject.contentStatus as eContentStatuses,
      search: this.filterObject.search,
      productCategoryID: this.filterObject.productCategoryID?.startsWith(this.allCategoryID)
        ? undefined
        : this.filterObject.productCategoryID,
      productGroupID: this.filterObject.productGroupID?.startsWith(this.allGroupID)
        ? undefined
        : this.filterObject.productGroupID,
    };
    this.loading = true;
    this.getCounters();
    this.requestingProduct$
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

  setStatus(productID: string, productVersionID: string) {
    if (!this.data) return;
    this.store$.dispatch(startLoading());
    this.requestingProduct$
      .review({ productID, productVersionID })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.store$.dispatch(stopLoading());
          if (res.statusCode == 200) {
            this.router
              .navigate([RouteUtils.ProductsPage.Base, productID], {
                queryParams: {
                  version: productVersionID,
                },
              })
              .then();
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
