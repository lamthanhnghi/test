import { Component, OnDestroy } from '@angular/core';
import {
  eDeliveryFeePolicyFormKeys,
  IConfirmModal,
  IDeliveryFeePolicyItem,
  IDeliveryFeePolicyPayload,
  IEnumOption,
  ILoadingState,
  IMcBreadcrumb,
} from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ConfirmModalComponent } from '@shared/components';
import {
  eConfirmModalTypes,
  eContentStatuses,
  ePageActions,
  eProductTypes,
  eSizeUnits,
  eWeightUnits,
} from '@shared/enums';
import { startLoading, stopLoading } from '@shared/stores';
import { DATE_FORMAT } from '@shared/constants';
import { Subject, takeUntil } from 'rxjs';
import { DeliveryFeePolicyService } from '@shared/delivery-fee-policy.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-delivery-fee-policy-detail',
  templateUrl: './delivery-fee-policy-detail.component.html',
  styleUrl: './delivery-fee-policy-detail.component.scss',
})
export class DeliveryFeePolicyDetailComponent implements OnDestroy {
  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly DATE_FORMAT = DATE_FORMAT;
  protected readonly eDeliveryFeePolicyFormKeys = eDeliveryFeePolicyFormKeys;
  protected readonly eSizeUnits = eSizeUnits;
  readonly currencyPipe = new CurrencyPipe('vi-VN');
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'common.delivery_fee_policies', link: ['/', RouteUtils.DeliveryFeePoliciesPage.Base] },
    { title: 'common.detail', link: '#', disabled: true },
  ];
  data?: IDeliveryFeePolicyItem;
  mode: ePageActions | any = ePageActions.Create;
  destroy$: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({
    [eDeliveryFeePolicyFormKeys.Title]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.Version]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.Content]: new FormControl(null, [Validators.required]),
    // -----------------------------------------------------------------------------------------------------------------
    [eDeliveryFeePolicyFormKeys.MaxLength]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.MaxWidth]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.MaxHeight]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.MaxWeight]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.ExpressPercent]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.FastPercent]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.SavingPercent]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.ExpressMinPrice]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.FastMinPrice]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.SavingMinPrice]: new FormControl(null, [Validators.required]),
    // -----------------------------------------------------------------------------------------------------------------
    [eDeliveryFeePolicyFormKeys.AdditionalSizeFee]: new FormControl(null, []),
    [eDeliveryFeePolicyFormKeys.AdditionalWeightFee]: new FormControl(null, []),
    [eDeliveryFeePolicyFormKeys.ApplyDate]: new FormControl(null, [Validators.required]),
    [eDeliveryFeePolicyFormKeys.ContentStatus]: new FormControl(null, []),
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
    private apiService: DeliveryFeePolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
      if (this.data?.deliveryPricePolicyID) {
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
      if (this.data?.deliveryPricePolicyID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete(this.data.deliveryPricePolicyID).subscribe({
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
    const payload: IDeliveryFeePolicyPayload = {
      ...this.form.value,
    };
    delete (payload as Record<any, any>)[eDeliveryFeePolicyFormKeys.ContentStatus];
    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({ ...payload, deliveryPricePolicyID: this.data?.deliveryPricePolicyID || '' });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.deliveryPricePolicyID) {
          if (this.mode === ePageActions.Create) {
            this.mode = ePageActions.View;
            this.router
              .navigate(['../', res.result.data.deliveryPricePolicyID], {
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

  priceFormatter = (value: number) => (value ? (this.currencyPipe.transform(value, 'VND') as string) : '');
  percentFormatter = (value: number) => (value ? `${value}%` : '');

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly eWeightUnits = eWeightUnits;
}
