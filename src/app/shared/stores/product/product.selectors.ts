import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCT_FEATURE_KEY, productAdapter, ProductState } from './product.reducer';

// Lookup the 'Product' feature state managed by NgRx
export const selectProductState = createFeatureSelector<ProductState>(PRODUCT_FEATURE_KEY);

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const selectProductLoaded = createSelector(selectProductState, (state: ProductState) => state.loaded);

export const selectProductError = createSelector(selectProductState, (state: ProductState) => state.error);

export const selectAllProduct = createSelector(selectProductState, (state: ProductState) => selectAll(state));

export const selectTotalProduct = createSelector(selectProductState, (state: ProductState) => state.total);

export const selectProductEntities = createSelector(selectProductState, (state: ProductState) => selectEntities(state));

export const selectSelectedId = createSelector(selectProductState, (state: ProductState) => state.selectedId);

export const selectSaveClicked = createSelector(selectProductState, (state: ProductState) => state.saveClicked);

export const selectChangeProductRouter = createSelector(selectProductState, (state: ProductState) => state.router);

export const selectProductLoading = createSelector(selectProductState, (state: ProductState) => state.loading);
// select product by id
export const selectProductById = (id: string) =>
  createSelector(selectProductState, (state) => selectEntities(state)[id]);

export const selectProductDetail = createSelector(selectProductState, (state) => state.productDetail);

export const selectProductHasUnsavedChange = createSelector(
  selectProductState,
  (state) => state.oldProductData !== state.newProductData,
);

export const selectEntity = createSelector(selectProductEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined,
);
