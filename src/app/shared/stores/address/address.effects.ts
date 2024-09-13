import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import * as AddressActions from './address.actions';
import { Store } from '@ngrx/store';
import { AddressService } from '@shared/services';

@Injectable()
export class AddressEffects {
  private actions$ = inject(Actions);

  constructor(
    private addressService: AddressService,
    private store$: Store,
  ) {}

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.loadCities),
      switchMap((action) => this.addressService.getCities(action.payload).pipe()),
      switchMap((data) => of(AddressActions.loadCitiesSuccess({ data }))),
      catchError((error) => {
        return of(AddressActions.loadCitiesFailure({ error }));
      }),
    ),
  );

  loadDistricts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.loadDistricts),
      switchMap((action) => this.addressService.getDistrictsByCityId(action.payload).pipe()),
      switchMap((data) => of(AddressActions.loadDistrictsSuccess({ data }))),
      catchError((error) => {
        return of(AddressActions.loadDistrictsFailure({ error }));
      }),
    ),
  );
}
