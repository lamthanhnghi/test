import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IAddress, IAddressModal, ICity, IDistrict, ISelectedAddress } from '@shared/models';
import { Store } from '@ngrx/store';
import { clearAll } from '@shared/stores';
import { debounceTime, forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ADDRESS_LABELS_OPTIONS } from '@shared/constants';
import { eDefaultStatus, ePageActions } from '@shared/enums';
import { CommonHelpers } from '@shared/utils';
import { AddressService } from '@shared/services';
import { eGeneralSettingAuthenticationFormKeys } from '@shared/general-setting.model';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddressModalComponent implements OnInit, OnDestroy {
  readonly addressLabelsOptions = ADDRESS_LABELS_OPTIONS;
  readonly eDefaultStatus = eDefaultStatus;
  readonly formKeys = {
    city: 'city',
    district: 'district',
    addressLabel: 'addressLabel',
    addressString: 'addressString',
    isDefault: 'isDefault',
    longitude: 'longitude',
    latitude: 'latitude',
    addressUrl: 'addressUrl',
  };
  readonly addressUrlPlaceholder = `<iframe src="https://www.google.com/maps/embed...`;

  okEvent$ = new Subject<ISelectedAddress>();

  isLoadingCity = false;
  isLoadingDistrict = false;

  cities: ICity[] = [];
  searchCitiesTerm = '';
  searchCities$ = new Subject<string>();
  districts: IDistrict[] = [];
  searchDistrictsTerm = '';
  searchDistricts$ = new Subject<string>();

  form: FormGroup = new FormGroup({
    [this.formKeys.city]: new FormControl(undefined, Validators.required),
    [this.formKeys.district]: new FormControl(undefined, Validators.required),
    [this.formKeys.addressLabel]: new FormControl(undefined, Validators.required),
    [this.formKeys.addressString]: new FormControl(undefined, Validators.required),
    [this.formKeys.isDefault]: new FormControl(false),
    [this.formKeys.longitude]: new FormControl(undefined, Validators.required),
    [this.formKeys.latitude]: new FormControl(undefined, Validators.required),
    [this.formKeys.addressUrl]: new FormControl(undefined, Validators.required),
  });

  get address(): IAddress | undefined {
    return this.data?.data || undefined;
  }

  get selectedCity(): ICity | undefined {
    return this.form.value[this.formKeys.city];
  }

  get selectedAddressLabel(): string | undefined {
    return this.form.value[this.formKeys.addressLabel];
  }

  get selectedDistrict(): IDistrict | undefined {
    return this.form.value[this.formKeys.district];
  }

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private store$: Store,
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IAddressModal,
    private addressService: AddressService,
  ) {
    this.searchCities$
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe((term) => (this.searchCitiesTerm = term));

    this.searchDistricts$
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe((term) => (this.searchDistrictsTerm = term));
  }

  ngOnInit() {
    this.preloadData();
    this.form
      .get(this.formKeys.city)
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((city: ICity) => {
        if (city?.cityID) {
          /** Reset district */
          this.form.get(this.formKeys.district)?.setValue(undefined);
          /** Reset districts */
          this.districts = [];
          this.getDistrictsByCityId(city.cityID);
        }
      });
  }

  preloadData(): void {
    const observables: Observable<any>[] = [this.addressService.getCities({ offset: 0, limit: 100 })];
    if (this.address?.cityID) {
      observables.push(
        this.addressService.getDistrictsByCityId({ cityID: this.address?.cityID, offset: 0, limit: 100 }),
      );
    }
    forkJoin(observables)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([citiesResponse, districtsResponse]) => {
        this.cities = citiesResponse?.result?.data || [];
        this.districts = districtsResponse?.result?.data || [];

        if (this.address?.cityID) {
          this.form.patchValue({
            [this.formKeys.city]: this.cities.find((city) => city.cityID === this.address?.cityID),
            [this.formKeys.district]: this.districts.find(
              (district) => district.districtID === this.address?.districtID,
            ),
            [this.formKeys.addressLabel]: this.addressLabelsOptions.find(
              (label) => label.value === this.address?.addressLabel,
            ),
            [this.formKeys.addressString]: this.address?.addressString,
            [this.formKeys.isDefault]: this.address?.isDefault === 1,
            [this.formKeys.longitude]: this.address?.longitude,
            [this.formKeys.latitude]: this.address?.latitude,
            [this.formKeys.addressUrl]: this.address?.addressUrl,
          });
        }
      });
  }

  getDistrictsByCityId(cityID: string): void {
    this.addressService
      .getDistrictsByCityId({ cityID, offset: 0, limit: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.districts = response?.result?.data || [];
      });
  }

  onSearchCity($event: string): void {
    this.searchCities$.next($event);
  }

  trackByCityId(index: number, city: ICity): string {
    return city.cityID;
  }

  onSearchDistrict($event: string): void {
    this.searchDistricts$.next($event);
  }

  trackByDistrictId(index: number, district: IDistrict): string {
    return district.districtID;
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    const data: ISelectedAddress = {
      addressID: this.data?.data?.addressID,
      cityID: this.form.value.city.cityID,
      districtID: this.form.value.district.districtID,
      addressLabel: this.form.value.addressLabel.value,
      addressString: this.form.value.addressString,
      isDefault: CommonHelpers.boolToNumber(this.form.value[this.formKeys.isDefault]), // convert true/false to 1/0
      longitude: this.form.value?.longitude + '',
      latitude: this.form.value?.latitude + '',
      addressUrl: this.form.value?.addressUrl,
    };
    if (this.data.closeOnSubmit) {
      this.okEvent$.next(data);
      this.modalRef.close();
    } else {
      this.okEvent$.next(data);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.store$.dispatch(clearAll());
  }

  protected readonly eGeneralSettingAuthenticationFormKeys = eGeneralSettingAuthenticationFormKeys;
  protected readonly ePageActions = ePageActions;
}
