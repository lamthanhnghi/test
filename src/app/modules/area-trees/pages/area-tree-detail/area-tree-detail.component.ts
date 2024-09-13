import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAddDistrictModal, IFilterBase, IMcBreadcrumb, IPagination } from '@shared/models';
import { RouteUtils } from '@shared/utils';
import { startLoading, stopLoading } from '@shared/stores';
import { skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICity, IDistrict } from '@shared/area-tree.model';
import { AreaTreeService } from '@shared/area-trees.service';
import { AddDistrictWardModalComponent } from '@shared/add-district-ward-modal/add-district-ward-modal.component';

@Component({
  selector: 'app-area-tree-detail',
  templateUrl: './area-tree-detail.component.html',
  styleUrl: './area-tree-detail.component.scss',
})
export class AreaTreeDetailComponent implements OnInit, OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'menu.areas.tree', link: ['/', RouteUtils.AreaTreePage.Base] },
    { title: 'Chi tiết', link: '', disabled: true },
  ];

  parentData: ICity;
  data: IDistrict[] = [];
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
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.parentData = this.route.snapshot.data['dataResolved'];
    this.breadcrumbs[1].title = this.parentData?.name || '';
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
      cityID: this.parentData?.cityID,
    };
    this.loading = true;
    this.apiService
      .getDistrictList(pagination)
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

  openModal(item?: IDistrict) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-add modal-add-district',
      nzCentered: true,
      nzContent: AddDistrictWardModalComponent,
      nzData: {
        title: item ? this.translate.instant('common.edit_district') : this.translate.instant('common.add_district'),
        data: item || undefined,
        label: this.translate.instant('common.district_name'),
      } as IAddDistrictModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe(({ name }) => {
      this.store$.dispatch(startLoading());
      const api$ = item?.districtID
        ? this.apiService.updateDistrict({
            name,
            districtID: item?.districtID,
          })
        : this.apiService.createDistrict({ name, cityID: this.parentData.cityID! });
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
