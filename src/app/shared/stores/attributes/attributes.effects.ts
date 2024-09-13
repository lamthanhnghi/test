import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AttributesActions, selectAllAttributes } from '@shared/stores';
import { AttributesService } from '@shared/services';

@Injectable()
export class AttributesEffects {
  private actions$ = inject(Actions);

  constructor(
    private attributeService: AttributesService,
    private store$: Store<any>,
  ) {}

  loadAttributes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttributesActions.loadAttributes),
      withLatestFrom(this.store$.select(selectAllAttributes)),
      switchMap((res) => {
        if (res[1]?.length) {
          return of(AttributesActions.loadAttributesSuccess({ attributes: res[1] }));
        } else {
          return this.attributeService.getList().pipe(
            switchMap(({ results }) => {
              return forkJoin([
                ...results.map((attribute: any) =>
                  this.attributeService.getValuesList({ attributeID: attribute.attributeID }),
                ),
              ]).pipe(
                switchMap((values) => {
                  // map values to attributes
                  results.forEach((attribute: any, index: any) => {
                    attribute.values = values[index].results;
                  });
                  return of(AttributesActions.loadAttributesSuccess({ attributes: results }));
                }),
              );
            }),
          );
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(AttributesActions.loadAttributesFailure());
      }),
    ),
  );
}
