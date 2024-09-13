import { debounceTime, Observable, Subject } from 'rxjs';
import { ICommonResponse, IPagination } from '@shared/pagination.model';
import { DEFAULT_DROPDOWN_LIMIT } from '@shared/constants';

export class SsrSelection<T> {
  optionAll?: T;
  data: T[] = [];
  searchDebounce$ = new Subject<string>();
  paging: IPagination & { total: number } = {
    offset: 0,
    limit: DEFAULT_DROPDOWN_LIMIT,
    search: '',
    total: 0,
  };
  isLoading = false;

  constructor(options?: {
    getDataFn: (query: IPagination) => Observable<ICommonResponse<T[]>>;
    createFn?: (payload: any) => Observable<ICommonResponse<T>>;
    optionAll?: T;
  }) {
    this.getDataFn = options?.getDataFn;
    this.createFn = options?.createFn;
    this.optionAll = options?.optionAll;
    if (this.optionAll) {
      this.data = [this.optionAll];
    }
    /** listen to brand search */
    this.searchDebounce$.pipe(debounceTime(500)).subscribe((search) => {
      this.onSearch(search);
    });
  }

  getDataFn?: (query: IPagination) => Observable<ICommonResponse<T[]>>;
  createFn?: (payload: any) => Observable<ICommonResponse<T>>;

  onSearch(search: string): void {
    this.paging.search = search;
    this.paging.offset = 0;
    this.loadData();
  }

  onLoadMore(): void {
    if (this.isLoading) {
      return;
    }
    if (this.paging.offset >= this.paging.total - 1) {
      return;
    }
    this.paging.offset += DEFAULT_DROPDOWN_LIMIT;
    this.loadData(true);
  }

  loadData(isAppend = false, callback?: () => any): void {
    this.isLoading = true;
    this.getDataFn?.(this.paging)?.subscribe({
      next: (res) => {
        if (!isAppend) {
          if (this.optionAll) {
            this.data = [this.optionAll];
          } else {
            this.data = [];
          }
        }
        this.data = [...this.data, ...(res?.result?.data ?? [])];
        this.paging.total = res?.result?.total ?? 0;
        this.isLoading = false;
        callback?.();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  addNew(): void {
    if (!this.paging.search || this.data?.length || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.createFn?.({ brandName: this.paging.search, brandDescription: this.paging.search }).subscribe({
      next: () => {
        this.onSearch(this.paging.search ?? '');
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  reset(): void {
    this.data = [];
    if (this.optionAll) {
      this.data = [this.optionAll];
    }
    this.paging = {
      offset: 0,
      limit: DEFAULT_DROPDOWN_LIMIT,
      search: '',
      total: 0,
    };
  }

  destroy(): void {
    this.searchDebounce$.complete();
  }
}
