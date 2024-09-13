import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, repeat, switchMap, tap } from 'rxjs';
import * as ProductActions from './product.actions';
import { checkUpdateProduct, loadProducts } from './product.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductState } from './product.reducer';
import { ProductService } from '@shared/services';
import { RouteUtils } from '@shared/utils';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  constructor(
    private productService: ProductService,
    private router: Router,
    private store$: Store<ProductState>,
  ) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      switchMap(({ id, productVersionID }) => {
        return this.productService.getProduct(id, productVersionID).pipe(
          switchMap((product) => {
            return of(ProductActions.loadProductSuccess({ product }));
          }),
        );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ProductActions.loadProductFailure({ error }));
      }),
    ),
  );

  saveClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.saveClicked),
      switchMap(() => of(ProductActions.saveClickedSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(ProductActions.loadProductFailure({ error }));
      }),
    ),
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      switchMap(({ payload }) => {
        return this.productService.addProduct(payload).pipe(
          switchMap((response) => {
            console.log(' =>(product.effects.ts:41) product', response.result); // todo: remove this
            return of(ProductActions.addProductSuccess({ product: response.result }));
          }),
        );
      }),
      repeat(),
    ),
  );

  addProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.addProductSuccess),
        tap(({ product }) => {
          this.store$.dispatch(ProductActions.clearUnsavedProductData());
          this.router
            .navigate(
              ['/', RouteUtils.ProductsPage.Base, RouteUtils.ProductsPage.View, RouteUtils.ProductsPage.GeneralInfo],
              {
                queryParamsHandling: '',
                queryParams: { id: product.productID, v: product.productVersionID },
              },
            )
            .then();
        }),
        switchMap(({ product }) => {
          return of(product);
        }),
      ),
    { dispatch: false },
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap(({ payload }) => {
        return this.productService.updateProduct(payload).pipe(
          switchMap((response) => {
            return of(ProductActions.updateProductSuccess({ product: response.result }));
          }),
        );
      }),
      repeat(),
    ),
  );

  updateProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateProductSuccess),
        tap(({ product }) => {
          this.router
            .navigate(
              ['/', RouteUtils.ProductsPage.Base, RouteUtils.ProductsPage.View, RouteUtils.ProductsPage.GeneralInfo],
              {
                queryParamsHandling: '',
                queryParams: { id: product.productID, v: product.productVersionID },
              },
            )
            .then();
        }),
        switchMap(({ product }) => {
          return of(product);
        }),
      ),
    { dispatch: false },
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(({ pagination }) => {
        return this.productService.getProducts(pagination).pipe(
          switchMap((response) => {
            return of(
              ProductActions.loadProductsSuccess({
                products: response.results || response.result || [],
                total: response.total,
              }),
            );
          }),
        );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ProductActions.loadProductsFailure({ error }));
      }),
      repeat(),
    ),
  );

  checkUpdateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkUpdateProduct),
      switchMap(({ payload }) => {
        return this.productService.checkUpdateProduct(payload).pipe(
          tap((product) => {
            this.router
              .navigate(
                ['/', RouteUtils.ProductsPage.Base, RouteUtils.ProductsPage.Edit, RouteUtils.ProductsPage.GeneralInfo],
                {
                  queryParamsHandling: 'preserve',
                  state: { product },
                },
              )
              .then();
          }),
          switchMap((product) => {
            return of(ProductActions.checkUpdateProductSuccess({ product }));
          }),
        );
      }),
    ),
  );
}
