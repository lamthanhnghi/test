import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAddDistrictModal, IConfirmModal, IFilterBase, IMcBreadcrumb, IPagination } from '@shared/models';
import { RouteUtils } from '@shared/utils';
import { startLoading, stopLoading } from '@shared/stores';
import { skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IDistrict, IWard } from '@shared/area-tree.model';
import { AreaTreeService } from '@shared/area-trees.service';
import { AddDistrictWardModalComponent } from '@shared/add-district-ward-modal/add-district-ward-modal.component';
import { ConfirmModalComponent } from '@shared/components';
import { eConfirmModalTypes } from '@shared/enums';

@Component({
  selector: 'app-area-ward-detail',
  templateUrl: './area-ward-detail.component.html',
  styleUrl: './area-ward-detail.component.scss',
})
export class AreaWardDetailComponent implements OnInit, OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'menu.areas.district', link: ['/', RouteUtils.AreaTreePage.Base] },
    { title: 'Chi tiết', link: '', disabled: true },
  ];

  parentData: IDistrict;
  data: IWard[] = [];
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
      districtID: this.parentData?.districtID,
    };
    this.loading = true;
    this.apiService
      .getWardList(pagination)
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

  openModal(item?: IWard) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-add modal-add-district',
      nzCentered: true,
      nzContent: AddDistrictWardModalComponent,
      nzData: {
        title: item ? this.translate.instant('common.edit_ward') : this.translate.instant('common.add_ward'),
        label: this.translate.instant('common.ward_name'),
        data: item || undefined,
      } as IAddDistrictModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe(({ name }) => {
      this.store$.dispatch(startLoading());
      const api$ = item?.wardID
        ? this.apiService.updateWard({
            name,
            wardID: item?.wardID,
          })
        : this.apiService.createWard({ name, districtID: this.parentData.districtID! });
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

  deleteItem(item: IWard) {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        closeOnSubmit: true,
        hideCancel: true,
        message: `msg.confirm_delete_data`,
      } as IConfirmModal
    });

    modalRef.componentInstance?.okEvent$.subscribe(() => {
      this.store$.dispatch(startLoading());
      this.apiService.deleteWard(item.wardID!).subscribe({
        next: (res) => {
          if (res?.statusCode == 200) {
            this.resetFilter();
            this.getItems(this.filterObject);
            modalRef.close();
          }
          this.store$.dispatch(stopLoading());
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      })
    });
  }
}
