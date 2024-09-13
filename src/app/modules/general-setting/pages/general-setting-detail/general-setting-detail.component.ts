import { Component, OnInit } from '@angular/core';
import { IConfirmModal, ILoadingState, IMcBreadcrumb } from '@shared/models';
import { eConfirmModalTypes, eContentStatuses, ePageActions } from '@shared/enums';
import { eGeneralSettingAuthenticationFormKeys, IGeneralSettingDetail } from '@shared/general-setting.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATE_FORMAT } from '@shared/constants';
import { GeneralSettingService } from '@shared/general-setting.service';
import { CommonHelpers } from '@shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmModalComponent } from '@shared/components';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';
import dayjs from 'dayjs';

@Component({
  selector: 'app-general-setting-detail',
  templateUrl: './general-setting-detail.component.html',
  styleUrl: './general-setting-detail.component.scss',
})
export class GeneralSettingDetailComponent implements OnInit{
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'common.general_setting', link: ['../'] },
    // { title: 'common.authentication', link: ['../'] },
    { title: '', disabled: true, link: [] },
  ];
  protected readonly eContentStatuses = eContentStatuses;
  readonly eGeneralSettingAuthenticationFormKeys = eGeneralSettingAuthenticationFormKeys;
  readonly FORM_TIME_UNITS: Record<any, string> = {
    [eGeneralSettingAuthenticationFormKeys.intervalToExpireToken]: 'minute',
    [eGeneralSettingAuthenticationFormKeys.intervalToExpireOTP]: 'minute',
    [eGeneralSettingAuthenticationFormKeys.intervalToCountFreOTP]: 'minute',
    [eGeneralSettingAuthenticationFormKeys.intervalToUnlockOTPLimitation]: 'minute',
    [eGeneralSettingAuthenticationFormKeys.autoCancelOrderDuration]: 'minute',
    [eGeneralSettingAuthenticationFormKeys.intervalForCountingHotProducts]: 'minute',
    [eGeneralSettingAuthenticationFormKeys.autoCompleteOrder]: 'minute',
    [eGeneralSettingAuthenticationFormKeys.rangeTimeForRatingProduct]: 'minute',
  };
  form: FormGroup = new FormGroup({
    [eGeneralSettingAuthenticationFormKeys.version]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.updatedDescription]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.intervalToExpireToken]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.intervalToExpireOTP]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.numberOTPToExceedLimitation]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.intervalToCountFreOTP]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.intervalToUnlockOTPLimitation]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.applyDate]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.autoCancelOrderDuration]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.intervalForCountingHotProducts]: new FormControl(null, [
      Validators.required,
    ]),
    [eGeneralSettingAuthenticationFormKeys.autoCompleteOrder]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.rangeTimeForRatingProduct]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.maxProductHot]: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(300)]),
    [eGeneralSettingAuthenticationFormKeys.maxProductBestSeller]: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(300)]),
    [eGeneralSettingAuthenticationFormKeys.maxNewProducts]: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(300)]),
    [eGeneralSettingAuthenticationFormKeys.maxProductGoodPriceToday]: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(300)]),
    [eGeneralSettingAuthenticationFormKeys.maxFeaturedSeller]: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(300)]),
    [eGeneralSettingAuthenticationFormKeys.maxProgramShowing]: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(300)]),

    // [eGeneralSettingAuthenticationFormKeys.maxHotProductsShowing]: new FormControl(null, [Validators.required]),
    [eGeneralSettingAuthenticationFormKeys.contentStatus]: new FormControl(null, []),
  });
  mode: ePageActions | any = ePageActions.Create;
  data?: IGeneralSettingDetail;

  constructor(
    private apiService: GeneralSettingService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];
    if (this.data?.adSettingID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.data = this.payloadToFormValue(this.data);
      this.form.patchValue(this.data);
    }
  }

  ngOnInit(): void {
    if(this.mode === ePageActions.View) {
      this.breadcrumbs[1].title = 'common.general_detail'
      return
    }
    this.breadcrumbs[1].title = 'common.general_add'
  }
  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
  }

  cancel(): void {
    // this.mode = ePageActions.View;
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
      if (this.data?.adSettingID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete(this.data.adSettingID).subscribe({
          next: (res) => {
            console.log(res);
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
      Object.keys(this.form.controls).forEach((key) => {
        if (this.form.controls[key].invalid) {
          console.log(key, this.form.controls[key].errors);
        }
      });
      return;
    }
    this.store$.dispatch(startLoading());
    const payload = {
      ...this.formValueToPayload({ ...this.form.value }),
      applyDate: dayjs(new Date(this.form.value.applyDate)).startOf('day').toISOString(),
      adSettingID: this.data?.adSettingID,
    };
    const api$ = this.mode === ePageActions.Create ? this.apiService.create(payload) : this.apiService.update(payload);
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.adSettingID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.adSettingID], { relativeTo: this.route }).then();
          } else {
            if (res.result?.data) {
              this.data = this.payloadToFormValue(res.result.data);
              this.form.patchValue(this.data);
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

  /** helpers */

  /**
   * convert form value to payload
   */

  formValueToPayload(data: any): any {
    Object.keys(this.FORM_TIME_UNITS).forEach((key) => {
      if ((data as Record<any, any>)[key]) {
        (data as Record<any, any>)[key] = this.convertDuration(
          (data as Record<any, any>)[key],
          this.FORM_TIME_UNITS[key],
          'forSave',
        );
      }
    });
    return data;
  }

  /**
   * convert payload to form value
   */

  payloadToFormValue(data: IGeneralSettingDetail): IGeneralSettingDetail {
    Object.keys(this.FORM_TIME_UNITS).forEach((key) => {
      if ((data as Record<any, any>)[key]) {
        (data as Record<any, any>)[key] = this.convertDuration(
          (data as Record<any, any>)[key],
          this.FORM_TIME_UNITS[key],
          'forDisplay',
        );
      }
    });
    return data;
  }

  convertDuration(value: number, from: string, expected: 'forSave' | 'forDisplay'): number {
    if (expected === 'forSave') {
      switch (from) {
        case 'minute':
          return value * 60;
        case 'hour':
          return value * 3600;
        case 'day':
          return value * 86400;
        default:
          return value;
      }
    } else {
      switch (from) {
        case 'minute':
          return Math.round(value / 60);
        case 'hour':
          return Math.round(value / 3600);
        case 'day':
          return Math.round(value / 86400);
        default:
          return value;
      }
    }
  }
}
