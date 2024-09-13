import { Component, OnDestroy, OnInit } from '@angular/core';
import { PACKED_UNITS_MENU_ITEMS } from '@shared/constants/side-menu.constant';
import { IAddPackedUnitModal, IFilterBase, IPackedUnit, IPagination } from '@shared/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { AddPackedUnitModalComponent } from '@shared/add-packed-unit-modal/add-packed-unit-modal.component';
import { PackedUnitService } from '@shared/services';
import { skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { showToast, startLoading, stopLoading } from '@shared/stores';
import { eToastStatus } from '@shared/enums';

@Component({
  selector: 'app-packed-unit-list',
  templateUrl: './packed-unit-list.component.html',
  styleUrl: './packed-unit-list.component.scss',
})
export class PackedUnitListComponent implements OnInit, OnDestroy {
  menuItems = PACKED_UNITS_MENU_ITEMS;
  data: IPackedUnit[] = [];
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
    private packedUnitService: PackedUnitService,
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
    this.packedUnitService
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

  resetFilter(): void {
    this.filterObject.pageIndex = 1;
    this.filterObject.search = '';
  }

  toggleShowList(item: IPackedUnit): void {
    if (item.isShowList === 1) {
      return;
    }
    this.store$.dispatch(startLoading());
    this.packedUnitService
      .update({
        name: item.attributeName!,
        attributeID: item.attributeID,
        isShowList: 1,
      })
      .subscribe({
        next: (res) => {
          if (res?.result?.data) {
            this.resetFilter();
            this.getItems(this.filterObject);
          }
          this.store$.dispatch(stopLoading());
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
  }

  openAddModal(item?: IPackedUnit) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-add modal-add-packed-unit',
      nzCentered: true,
      nzContent: AddPackedUnitModalComponent,
      nzData: {
        title: item ? 'common.edit_packed_unit' : 'common.add_packed_unit',
        isPackUnit: true,
        editData: item,
      } as IAddPackedUnitModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      this.store$.dispatch(startLoading());
      const api$ = item
        ? this.packedUnitService.update({
            ...payload,
            attributeID: item.attributeID!,
          })
        : this.packedUnitService.add(payload);
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

  delete() {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang được cập nhật.',
      }),
    );
  }
}
