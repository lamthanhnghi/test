import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, withLatestFrom } from 'rxjs';
import * as LanguageActions from './language.actions';
import { Store } from '@ngrx/store';
import { selectAllLanguage } from '@shared/stores';
import { McLanguageService } from '@shared/services';

@Injectable()
export class LanguageEffects {
  private actions$ = inject(Actions);
  constructor(
    private mcLanguageService: McLanguageService,
    private store$: Store<any>,
  ) {}

  loadLanguages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.loadLanguages),
      withLatestFrom(this.store$.select(selectAllLanguage)),
      switchMap((res) => {
        if (res[1]?.length) {
          return of(res[1]);
        } else {
          return this.mcLanguageService.getLanguages();
        }
      }),
      switchMap((data) => of(LanguageActions.loadLanguagesSuccess({ languages: data }))),
      catchError((error) => {
        console.error('Error', error);
        return of(LanguageActions.loadLanguagesFailure({ error }));
      }),
    ),
  );
}
