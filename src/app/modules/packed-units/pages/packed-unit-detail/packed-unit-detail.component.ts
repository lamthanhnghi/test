import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteUtils } from '@shared/utils';
import { IAddPackedUnitModal, IFilterBase, IMcBreadcrumb, IPackedUnitValue, IPagination } from '@shared/models';
import { Store } from '@ngrx/store';
import { IAttribute, showToast, startLoading, stopLoading } from '@shared/stores';
import { skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PackedUnitService } from '@shared/services';
import { AddPackedUnitModalComponent } from '@shared/add-packed-unit-modal/add-packed-unit-modal.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { eToastStatus } from '@shared/enums';

@Component({
  selector: 'app-packed-unit-detail',
  templateUrl: './packed-unit-detail.component.html',
  styleUrl: './packed-unit-detail.component.scss',
})
export class PackedUnitDetailComponent implements OnInit, OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'menu.categories.base', link: ['/', RouteUtils.CategoriesPage.Base] },
    { title: 'menu.packed_unit', link: ['/', RouteUtils.PackedUnitsPage.Base] },
    { title: '', disabled: true, link: [] },
  ];

  parentData: IAttribute;
  data: IPackedUnitValue[] = [];
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
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.parentData = this.route.snapshot.data['dataResolved'];
    this.breadcrumbs[2].title = this.parentData?.attributeName || '';
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
      attributeID: this.parentData?.attributeID,
    };
    this.loading = true;
    this.packedUnitService
      .getListValues(pagination)
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

  delete() {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Chức năng đang cập nhật.',
      }),
    );
  }

  openAddModal(item?: IPackedUnitValue) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-add modal-add-packed-unit',
      nzCentered: true,
      nzContent: AddPackedUnitModalComponent,
      nzData: {
        title: `${ item ? this.translate.instant('common.edit') : this.translate.instant('common.add')} ${this.parentData.attributeName?.toLowerCase()}`,
        editData: item || undefined,
      } as IAddPackedUnitModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe(({ name }) => {
      this.store$.dispatch(startLoading());
      const api$ = item?.attributeValueID
        ? this.packedUnitService.updateValue({
            name,
            attributeID: this.parentData.attributeID!,
            attributeValueID: item?.attributeValueID,
          })
        : this.packedUnitService.addValue({ name, attributeID: this.parentData.attributeID! });
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
