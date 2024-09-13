import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAddCityModal, IFilterBase, IPagination } from '@shared/models';
import { skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { ICity } from '@shared/area-tree.model';
import { AreaTreeService } from '@shared/area-trees.service';
import { AddCityModalComponent } from '@shared/add-city-modal/add-city-modal.component';
import { CITIES_MENU_ITEMS } from '@shared/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-area-tree-list',
  templateUrl: './area-tree-list.component.html',
  styleUrl: './area-tree-list.component.scss',
})
export class AreaTreeListComponent implements OnInit, OnDestroy {
  menuItems = CITIES_MENU_ITEMS;
  data: ICity[] = [];
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
    private apiService: AreaTreeService,
    private translate: TranslateService,
  ) {
    this.tableQueryParamsChange$.pipe(takeUntil(this.destroy$), skip(1)).subscribe((params) => {
      this.onQueryParamsChange(params);
    });
  }

  ngOnInit() {
    this.getItems(this.filterObject);
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

  getItems(filter: IFilterBase) {
    const pagination: IPagination = {
      offset: (filter.pageIndex - 1) * filter.pageSize,
      limit: filter.pageSize,
      search: filter.search,
    };
    this.loading = true;
    this.apiService
      .getCityList(pagination)
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

  resetFilter(): void {
    this.filterObject.pageIndex = 1;
    this.filterObject.search = '';
  }

  openAddModal(item?: ICity) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-add modal-add-city',
      nzCentered: true,
      nzContent: AddCityModalComponent,
      nzData: {
        title: `${item ? this.translate.instant('common.edit') : this.translate.instant('common.add')} Thành phố/Tỉnh`,
        data: item,
      } as IAddCityModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      this.store$.dispatch(startLoading());
      const api$ = item
        ? this.apiService.updateCity({
            ...payload,
            // 👇 hard coded
            countryID: '1',
            cityID: item.cityID!,
          })
        : this.apiService.createCity({
            ...payload,
            // 👇 hard coded
            countryID: '1',
          });
      api$.subscribe({
        next: (res) => {
          if (res?.result?.data) {
            this.resetFilter();
            this.getItems(this.filterObject);
            modalRef.close();
          }
          this.store$.dispatch(stopLoading());
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
    });
  }
}
