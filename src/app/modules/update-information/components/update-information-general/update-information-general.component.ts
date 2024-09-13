import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroupDirective, UntypedFormGroup } from '@angular/forms';
import { UpdateInformationFormKeys } from '@shared/enums';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { IAddress, ICity, IDistrict, IProfile } from '@shared/models';
import { debounceTime, forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { AddressService, ProfileService } from '@shared/services';
import { PROFILE_COVER_SIZE } from '@shared/constants';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';

@Component({
  selector: 'app-update-information-general',
  templateUrl: './update-information-general.component.html',
  styleUrls: ['./update-information-general.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UpdateInformationGeneralComponent implements OnInit, OnDestroy {
  RouteUtils = RouteUtils;
  readonly destroy$ = new Subject<void>();
  protected readonly UpdateInformationFormKeys = UpdateInformationFormKeys;

  form!: UntypedFormGroup;
  isLoadingCity = false;
  isLoadingDistrict = false;

  cities: ICity[] = [];
  searchCitiesTerm = '';
  searchCities$ = new Subject<string>();
  districts: IDistrict[] = [];
  searchDistrictsTerm = '';
  searchDistricts$ = new Subject<string>();

  constructor(
    private rootFormGroup: FormGroupDirective,
    private addressService: AddressService,
    private imageCompress: NgxImageCompressService,
    private store$: Store<IProfile>,
    private profileService: ProfileService,
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
    this.form = this.rootFormGroup.control as UntypedFormGroup;
    /** Listen to city changes */
    this.form
      .get(UpdateInformationFormKeys.CityID)
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((cityID: string) => {
        if (cityID) {
          /** Reset district */
          this.form.get(UpdateInformationFormKeys.DistrictID)?.setValue(undefined);
          /** Reset districts */
          this.districts = [];
          this.getDistrictsByCityId(cityID);
        }
      });
  }

  get address(): IAddress | undefined {
    const address = this.form?.get(UpdateInformationFormKeys.Address)?.value;
    return Array.isArray(address) && address?.[0] ? address?.[0] : undefined;
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
        if (Array.isArray(citiesResponse?.results)) {
          this.cities = citiesResponse?.results;
        }

        if (Array.isArray(districtsResponse?.results)) {
          this.districts = districtsResponse?.results;
        }
      });
  }

  getDistrictsByCityId(cityID: string): void {
    this.addressService
      .getDistrictsByCityId({ cityID, offset: 0, limit: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        // if (Array.isArray(response?.results)) {
        //   this.districts = response?.results;
        // }
      });
  }

  updateCover(): void {
    this.imageCompress
      .uploadFile()
      .then(({ image, orientation }) => {
        this.store$.dispatch(startLoading());
        this.imageCompress
          .compressFile(
            image,
            orientation,
            100,
            PROFILE_COVER_SIZE.quality,
            PROFILE_COVER_SIZE.maxWidth,
            PROFILE_COVER_SIZE.maxHeight,
          )
          .then((result) => {
            // to file formData
            const imageBlob = CommonHelpers.dataURItoBlob(result);
            const imageFile = new File([imageBlob], 'profile_cover.jpg', { type: 'image/jpeg' });
            const formData = new FormData();
            formData.append('file_cover', imageFile);
            this.profileService.updateCover(formData).subscribe({
              next: (res) => {
                this.form.get(UpdateInformationFormKeys.SellerCover)?.setValue(res?.sellerCover || '');
                // this.store$.dispatch(
                //   showToast({
                //     status: eToastStatus.Success,
                //     title: 'msg.success',
                //     message: 'profile_page.update_cover_success',
                //   }),
                // );
                this.store$.dispatch(stopLoading());
              },
              error: () => {
                this.store$.dispatch(stopLoading());
              },
            });
          })
          .catch(() => {
            this.store$.dispatch(stopLoading());
          });
      })
      .catch(() => {
        this.store$.dispatch(stopLoading());
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
