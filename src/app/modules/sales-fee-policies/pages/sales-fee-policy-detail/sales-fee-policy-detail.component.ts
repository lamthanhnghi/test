import { Component, OnDestroy } from '@angular/core';
import { IConfirmModal, IEnumOption, ILoadingState, IMcBreadcrumb } from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ConfirmModalComponent } from '@shared/components';
import { eConfirmModalTypes, eContentStatuses, ePageActions, eProductTypes } from '@shared/enums';
import { startLoading, stopLoading } from '@shared/stores';
import { DATE_FORMAT } from '@shared/constants';
import { Subject, takeUntil } from 'rxjs';
import { eSalesFeePolicyFormKeys, ISalesFeePolicyItem, ISalesFeePolicyPayload } from '@shared/sales-fee-policy.model';
import { SalesFeePolicyService } from '@shared/services';

@Component({
  selector: 'app-sales-fee-policy-detail',
  templateUrl: './sales-fee-policy-detail.component.html',
  styleUrl: './sales-fee-policy-detail.component.scss',
})
export class SalesFeePolicyDetailComponent implements OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'common.sales_fee_policies', link: ['/', RouteUtils.SalesFeePoliciesPage.Base] },
    { title: 'common.detail', link: '#', disabled: true },
  ];
  data?: ISalesFeePolicyItem;
  readonly eSalesFeePolicyFormKeys = eSalesFeePolicyFormKeys;
  mode: ePageActions | any = ePageActions.Create;
  destroy$: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({
    [eSalesFeePolicyFormKeys.Title]: new FormControl(null, [Validators.required]),
    [eSalesFeePolicyFormKeys.Version]: new FormControl(null, [Validators.required]),
    [eSalesFeePolicyFormKeys.ProductType]: new FormControl(null, [Validators.required]),
    [eSalesFeePolicyFormKeys.Content]: new FormControl(null, [Validators.required]),
    [eSalesFeePolicyFormKeys.SaleFee]: new FormControl(null, [Validators.required]),
    [eSalesFeePolicyFormKeys.ApplyDate]: new FormControl(null, [Validators.required]),
    [eSalesFeePolicyFormKeys.ContentStatus]: new FormControl(null, []),
  });

  readonly productTypeOptions: IEnumOption[] = [
    {
      label: 'Thuốc',
      value: eProductTypes.Drug,
    },
    {
      label: 'Chức năng',
      value: eProductTypes.Functional,
    },
    {
      label: 'Bổ sung',
      value: eProductTypes.Supplement,
    },
    {
      label: 'Thiết bị y tế',
      value: eProductTypes.MedicalEquipment,
    },
    {
      label: 'Khác',
      value: eProductTypes.Other,
    },
  ];

  constructor(
    private apiService: SalesFeePolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
      if (this.data?.saleFeePolicyID) {
        this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
        this.form.patchValue(this.data);
      }
    });
  }

  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
  }

  cancel(): void {
    this.mode = ePageActions.View;
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
      if (this.data?.saleFeePolicyID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete(this.data.saleFeePolicyID).subscribe({
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
    const payload: ISalesFeePolicyPayload = {
      ...this.form.value,
    };
    delete (payload as Record<any, any>)[eSalesFeePolicyFormKeys.ContentStatus];
    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({ ...payload, saleFeePolicyID: this.data?.saleFeePolicyID || '' });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.saleFeePolicyID) {
          if (this.mode === ePageActions.Create) {
            this.mode = ePageActions.View;
            this.router
              .navigate(['../', res.result.data.saleFeePolicyID], {
                relativeTo: this.route,
              })
              .then();
          } else {
            this.data = res.result.data;
            this.form.patchValue({ ...this.data });
            this.mode = ePageActions.View;
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.store$.dispatch(stopLoading());
      },
    });
  }

  percentFormatter = (value: number) => `${value} %`;

  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly DATE_FORMAT = DATE_FORMAT;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
