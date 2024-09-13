import { Component } from '@angular/core';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import {
  eAgreementFormKeys,
  IAgreementItem,
  IAgreementPayload,
  IEnumOption,
  ILoadingState,
  IMcBreadcrumb,
} from '@shared/models';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { eAgreementTypes, eContentStatuses, ePageActions } from '@shared/enums';
import { DATE_FORMAT } from '@shared/constants';
import { AgreementsService } from '@shared/agreements.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-agreement-detail',
  templateUrl: './agreement-detail.component.html',
  styleUrl: './agreement-detail.component.scss',
})
export class AgreementDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'menu.agreements', link: ['/', RouteUtils.AgreementPage.Base] },
    { title: 'common.detail', disabled: true, link: [] },
  ];

  readonly agreementTypeOptions: IEnumOption[] = [
    {
      label: 'seller',
      value: eAgreementTypes.Seller,
    },
    {
      label: 'customer',
      value: eAgreementTypes.User,
    },
  ];

  protected readonly eContentStatuses = eContentStatuses;
  readonly eAgreementFormKeys = eAgreementFormKeys;
  form: FormGroup = new FormGroup({
    [eAgreementFormKeys.AgreementType]: new FormControl(null, [Validators.required]),
    [eAgreementFormKeys.AgreementName]: new FormControl(null, [Validators.required]),
    [eAgreementFormKeys.AgreementVersion]: new FormControl(null, [Validators.required]),
    [eAgreementFormKeys.AgreementContent]: new FormControl(null, [Validators.required]),
    [eAgreementFormKeys.AgreementAppliedDate]: new FormControl(null, [Validators.required]),
  });
  mode: ePageActions | any = ePageActions.Create;
  data?: IAgreementItem;

  constructor(
    private apiService: AgreementsService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];
    if (this.data) {
      this.form.patchValue({ [eAgreementFormKeys.AgreementType]: Number(this.data.agreementType) });
    }
    if (this.data?.agreementID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue(this.data);
    }
    this.form.get(eAgreementFormKeys.AgreementType)?.disable();
    this.updateBreadcrumb();
  }

  updateBreadcrumb(): void {
    if (this.mode === ePageActions.Create) {
      this.breadcrumbs[1].title = 'Thêm mới';
    } else if (this.mode === ePageActions.Edit) {
      this.breadcrumbs[1].title = 'Sửa';
    } else {
      this.breadcrumbs[1].title = 'Chi tiết';
    }
  }

  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
    this.updateBreadcrumb();
  }

  cancel(): void {
    this.mode = ePageActions.View;
    this.updateBreadcrumb();
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: IAgreementPayload = {
      ...this.form.value,
      agreementID: this.data?.agreementID,
      agreementType: this.data?.agreementID ? undefined : this.form.get(eAgreementFormKeys.AgreementType)?.value,
      applyDate: dayjs(this.form.get(eAgreementFormKeys.AgreementAppliedDate)?.value).startOf('day').toISOString(),
      agreementNotes: 'test note',
    };
    const api$ = this.mode === ePageActions.Create ? this.apiService.create(payload) : this.apiService.update(payload);
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.agreementID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.agreementID], { relativeTo: this.route }).then();
          } else {
            if (res.result?.data) {
              this.data = res.result.data;
              this.form.patchValue(this.data);
              this.mode = ePageActions.View;
            }
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.store$.dispatch(stopLoading());
      },
    });
  }

  protected readonly DATE_FORMAT = DATE_FORMAT;
  protected readonly ePageActions = ePageActions;
}
