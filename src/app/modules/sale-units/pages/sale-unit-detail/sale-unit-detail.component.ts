import { Component } from '@angular/core';
import {
  eSaleUnitFormKey, IConfirmModal,
  ILoadingState,
  IMcBreadcrumb,
  ISaleUnit, ISaleUnitPayload
} from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { showToast, startLoading, stopLoading } from '@shared/stores';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { eConfirmModalTypes, eContentStatuses, ePageActions, eToastStatus } from '@shared/enums';
import { SaleUnitService } from '@shared/sale-unit.service';
import { ConfirmModalComponent } from '@shared/components';

@Component({
  selector: 'app-sale-unit-detail',
  templateUrl: './sale-unit-detail.component.html',
  styleUrl: './sale-unit-detail.component.scss'
})
export class SaleUnitDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Danh mục', link: ['/', RouteUtils.SaleUnitsPage.Base] },
    { title: 'Đơn vị bán', link: ['/', RouteUtils.SaleUnitsPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true }
  ];
  data?: ISaleUnit;
  private sub: any;
  mode: ePageActions | any = ePageActions.Create;
  form: FormGroup = new FormGroup({
    [eSaleUnitFormKey.Name]: new FormControl(null, [Validators.required])
  });


  constructor(
    private apiService: SaleUnitService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];

    if (this.data?.saleUnitID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue(this.data);
    }
    this.updateBreadcrumb();
  }

  updateBreadcrumb(): void {

    if (this.mode === ePageActions.Create) {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Thêm mới';
    } else if (this.mode === ePageActions.Edit) {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Sửa';
    } else {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Chi tiết';
    }
  }

  sendApproval(): void {
  }

  edit(): void {
    this.mode = ePageActions.Edit;
    this.updateBreadcrumb();
  }

  cancel(): void {
    switch(this.mode) {
      case ePageActions.Create:
        this.router.navigate(['../'], { relativeTo: this.route }).then();
        break;
      case ePageActions.Edit:
        this.mode = ePageActions.View;
        this.updateBreadcrumb();
        break;
    }
  }

  restore() {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang được cập nhật.',
      }),
    );
  }

  archive() {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang được cập nhật.',
      }),
    );
  }

  delete(): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        message: `msg.confirm_delete_data`,
      } as IConfirmModal,
    });

    modalRef.componentInstance?.okEvent$.subscribe(() => {
      if (this.data?.saleUnitID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete({ saleUnitID: this.data.saleUnitID }).subscribe({
          next: () => {
            this.store$.dispatch(stopLoading());
            modalRef.close();
            this.router.navigate(['../'], { relativeTo: this.route }).then();
          },
          error: (err) => {
            this.store$.dispatch(stopLoading());
            console.error(err);
          },
        });
      } else {
        this.router.navigate(['../'], { relativeTo: this.route }).then();
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: ISaleUnitPayload = {
      baseSaleUnitName: this.form.get(eSaleUnitFormKey.Name)?.value,
      baseDescription: ''
    };

    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({
          saleUnitID: this.data?.saleUnitID || '',
          ...payload
        });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.saleUnitID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.saleUnitID], { relativeTo: this.route }).then();
          } else {
            if (!res.result?.data) {
              this.data = res.result.data;
              this.form.patchValue({ ...this.data });
              this.mode = ePageActions.View;
            }
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.store$.dispatch(stopLoading());
      }
    });
  }

  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly eSaleUnitFormKey = eSaleUnitFormKey;
}
