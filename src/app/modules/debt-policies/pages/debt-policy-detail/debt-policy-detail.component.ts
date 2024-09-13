import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  eDebtPolicyFormKeys,
  eDeliveryFeePolicyFormKeys,
  IConfirmModal,
  IDebtPolicyItem,
  IDeliveryFeePolicyPayload,
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
  eDebtCyclePeriods,
  ePageActions,
  eSizeUnits,
  eWeekDays,
  eWeightUnits,
} from '@shared/enums';
import { startLoading, stopLoading } from '@shared/stores';
import { DATE_FORMAT } from '@shared/constants';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { DebtPolicyService } from '@shared/services';

@Component({
  selector: 'app-debt-policy-detail',
  templateUrl: './debt-policy-detail.component.html',
  styleUrl: './debt-policy-detail.component.scss',
})
export class DebtPolicyDetailComponent implements OnDestroy, OnInit {
  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly DATE_FORMAT = DATE_FORMAT;
  protected readonly eDebtPolicyFormKeys = eDebtPolicyFormKeys;
  protected readonly eSizeUnits = eSizeUnits;
  readonly currencyPipe = new CurrencyPipe('vi-VN');
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'common.debt_policies', link: ['/', RouteUtils.DeptPoliciesPage.Base] },
    { title: 'common.detail', link: '#', disabled: true },
  ];
  data?: IDebtPolicyItem;
  mode: ePageActions | any = ePageActions.Create;
  destroy$: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({
    [eDebtPolicyFormKeys.Title]: new FormControl(null, [Validators.required]),
    [eDebtPolicyFormKeys.Version]: new FormControl(null, [Validators.required]),
    [eDebtPolicyFormKeys.Content]: new FormControl(null, [Validators.required]),
    // -----------------------------------------------------------------------------------------------------------------
    [eDebtPolicyFormKeys.DebtCycle]: new FormControl(null, [Validators.required]),
    [eDebtPolicyFormKeys.DebtCyclePeriod]: new FormControl(null, [Validators.required]),
    [eDebtPolicyFormKeys.FirstDayOfPeriod]: new FormControl(null, [Validators.required]),
    [eDebtPolicyFormKeys.ReconciliationTime]: new FormControl(null, [Validators.required]),
    [eDebtPolicyFormKeys.PaymentDueDate]: new FormControl(null, [Validators.required]),
    [eDebtPolicyFormKeys.ApplyDate]: new FormControl(null, [Validators.required]),
    [eDebtPolicyFormKeys.ContentStatus]: new FormControl(null, []),
  });

  readonly options: eDebtCyclePeriods[] = [eDebtCyclePeriods.Weekly, eDebtCyclePeriods.Monthly];
  readonly firstDayOfPeriodMonthOptions: number[] = Array.from({ length: 26 }, (_, i) => i + 1);
  readonly firstDayOfPeriodWeekOptions: eWeekDays[] = [eWeekDays.Sunday, eWeekDays.Monday];

  get firstDayOfPeriodOptions(): number[] {
    return this.form.get(eDebtPolicyFormKeys.DebtCyclePeriod)?.value === eDebtCyclePeriods.Monthly
      ? this.firstDayOfPeriodMonthOptions
      : this.firstDayOfPeriodWeekOptions;
  }

  constructor(
    private apiService: DebtPolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
      if (this.data?.debtPolicyID) {
        this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
        this.form.patchValue(this.data);
      }
    });
  }

  ngOnInit() {
    this.form
      .get(eDebtPolicyFormKeys.DebtCyclePeriod)
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.get(eDebtPolicyFormKeys.FirstDayOfPeriod)?.setValue(null);
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
      if (this.data?.debtPolicyID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete(this.data.debtPolicyID).subscribe({
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
        : this.apiService.update({ ...payload, debtPolicyID: this.data?.debtPolicyID || '' });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.debtPolicyID) {
          if (this.mode === ePageActions.Create) {
            this.mode = ePageActions.View;
            this.router
              .navigate(['../', res.result.data.debtPolicyID], {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly eWeightUnits = eWeightUnits;
  protected readonly eDebtCyclePeriods = eDebtCyclePeriods;
}
