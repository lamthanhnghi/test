import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, withLatestFrom } from 'rxjs';
import { CountriesActions, selectAllCountries } from '@shared/stores';
import { Store } from '@ngrx/store';
import { CountriesService } from '@shared/services';

@Injectable()
export class CountriesEffects {
  loadCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountriesActions.loadCountries),
      withLatestFrom(this.store$.select(selectAllCountries)),
      switchMap((res) => {
        if (res[1]?.length) {
          return of({ results: res[1] });
        } else {
          return this.countriesService.getList().pipe();
        }
      }),
      switchMap(({ results }) => {
        return of(CountriesActions.loadCountriesSuccess({ countries: results }));
      }),
      catchError(() => of(CountriesActions.loadCountriesFailure())),
    );
  });

  constructor(
    private actions$: Actions,
    private countriesService: CountriesService,
    private store$: Store<any>,
  ) {}
}
