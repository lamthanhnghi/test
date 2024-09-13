import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IFilterBase } from '@shared/common.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

export abstract class BaseListModel {
  isReviewer = false;
  filterObject: IFilterBase = {
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    search: '',
  };
  tableQueryParamsChange$ = new Subject<NzTableQueryParams>();
  destroy$: Subject<void> = new Subject();
  loading = false;

  protected constructor(options?: { router: Router }) {
    this.isReviewer = !!options?.router?.url?.startsWith('/approval');
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

  resetPagination(): void {
    this.filterObject.pageIndex = 1;
    this.filterObject.pageSize = 10;
  }

  abstract getItems(filterObject: IFilterBase): void;

  abstract getCounters(): void;

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.tableQueryParamsChange$.complete();
  }
}
