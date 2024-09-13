import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, withLatestFrom } from 'rxjs';
import * as ProductGroupsActions from './product-groups.actions';
import { Store } from '@ngrx/store';
import { ProductGroupsState, selectAllProductFunctionalGroups } from '@shared/stores';
import { ProductGroupService } from '@shared/services';

@Injectable()
export class ProductGroupsEffects {
  private actions$ = inject(Actions);

  constructor(
    private productFunctionalGroupService: ProductGroupService,
    private store$: Store<ProductGroupsState>,
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductGroupsActions.loadProductGroups),
      withLatestFrom(this.store$.select(selectAllProductFunctionalGroups)),
      switchMap(([_, cacheData]) => {
        if (cacheData?.length) {
          return of(ProductGroupsActions.loadProductGroupsSuccess({ productGroups: cacheData }));
        } else {
          return this.productFunctionalGroupService.getList().pipe(
            switchMap(({ results }) => {
              return of(ProductGroupsActions.loadProductGroupsSuccess({ productGroups: results }));
            }),
          );
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ProductGroupsActions.loadProductGroupsFailure({ error }));
      }),
    ),
  );
}
