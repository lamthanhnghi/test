import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonHelpers, FormValidators, RouteUtils } from '@shared/utils';
import { filter, Subject, takeUntil } from 'rxjs';
import { IAccountState, IUpdateInfo } from '@shared/models';
import {
  authUpdateInfoStep,
  logout,
  selectAuthUpdateInfoStep,
  showToast,
  startLoading,
  stopLoading,
} from '@shared/stores';
import { eToastStatus, eUpdateInfoStep, UpdateInformationFormKeys } from '@shared/enums';
import { AuthService } from '@shared/services';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UpdateInformationComponent implements OnDestroy {
  readonly RouteUtils = RouteUtils;
  protected readonly eUpdateInfoStep = eUpdateInfoStep;
  step = 1;
  formBusiness = new UntypedFormGroup({
    [UpdateInformationFormKeys.SellerCover]: new FormControl('', { nonNullable: true, validators: [] }),
    [UpdateInformationFormKeys.SellerAvatar]: new FormControl('', { nonNullable: true, validators: [] }),
    [UpdateInformationFormKeys.BusinessCode]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    [UpdateInformationFormKeys.BusinessName]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    [UpdateInformationFormKeys.Email]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, FormValidators.MustBeEmail('emailPattern')],
    }),
    [UpdateInformationFormKeys.Phone]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, FormValidators.MustBePhone('phonePattern')],
    }),
    [UpdateInformationFormKeys.Address]: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    [UpdateInformationFormKeys.CityID]: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    [UpdateInformationFormKeys.DistrictID]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    [UpdateInformationFormKeys.Website]: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    [UpdateInformationFormKeys.Duns]: new FormControl('', { nonNullable: true, validators: [] }),
    [UpdateInformationFormKeys.PostalCode]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, FormValidators.MustBePostalCode('postalCodePattern')],
    }),
    [UpdateInformationFormKeys.ContactFullName]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    [UpdateInformationFormKeys.ContactEmail]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, FormValidators.MustBeEmail('emailPattern')],
    }),
    [UpdateInformationFormKeys.ContactPhone]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, FormValidators.MustBePhone('phonePattern')],
    }),
  });
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private store$: Store<IAccountState>,
    private router: Router,
    private authService: AuthService,
  ) {
    this.store$
      .select(selectAuthUpdateInfoStep)
      .pipe(
        takeUntil(this.destroy$),
        filter((step) => !!step),
      )
      .subscribe((step) => {
        this.step = step;
      });
    this.router.events.pipe(takeUntil(this.destroy$), CommonHelpers.isNavigationEndObs).subscribe(() => {
      /** Get { sellerLogin } from token and fill the form */
      const decodedToken = this.authService.retrieveDecodedToken();
      if (decodedToken) {
        const { sellerLogin } = decodedToken;
        if (CommonHelpers.getUserLoginTypes(sellerLogin) === 'email') {
          this.formBusiness.patchValue({ email: sellerLogin });
          this.formBusiness.get('email')?.disable();
        } else if (CommonHelpers.getUserLoginTypes(sellerLogin) === 'phone') {
          this.formBusiness.patchValue({ phone: sellerLogin });
          this.formBusiness.get('phone')?.disable();
        }
      } else {
        this.router
          .navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login], { replaceUrl: true })
          .then();
      }
    });
  }

  ngOnDestroy() {
    this.authService.removeSessionToken();
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearSession(): void {
    this.store$.dispatch(logout({ isCallApi: true }));
    this.router.navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login], { replaceUrl: true }).then();
  }

  submit() {
    if (this.formBusiness.valid) {
      const payload = this.formBusiness.getRawValue() as IUpdateInfo;
      this.store$.dispatch(startLoading());
      this.authService
        .updateInfo(payload)
        .pipe()
        .subscribe({
          next: () => {
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'account_page.update_info_success',
              }),
            );
            this.store$.dispatch(authUpdateInfoStep({ step: eUpdateInfoStep.Document }));
            this.store$.dispatch(stopLoading());
          },
          error: () => {
            this.store$.dispatch(stopLoading());
          },
        });
    }
  }
}
