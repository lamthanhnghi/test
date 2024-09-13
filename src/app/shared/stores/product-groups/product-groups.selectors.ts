import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCT_GROUPS_FEATURE_KEY, productGroupsAdapter, ProductGroupsState } from './product-groups.reducer';

// Lookup the 'ProductFunctionalGroups' feature state managed by NgRx
export const selectProductFunctionalGroupsState = createFeatureSelector<ProductGroupsState>(PRODUCT_GROUPS_FEATURE_KEY);

const { selectAll, selectEntities } = productGroupsAdapter.getSelectors();

export const selectProductFunctionalGroupsLoaded = createSelector(
  selectProductFunctionalGroupsState,
  (state: ProductGroupsState) => state.loaded,
);

export const selectProductFunctionalGroupsError = createSelector(
  selectProductFunctionalGroupsState,
  (state: ProductGroupsState) => state.error,
);

export const selectAllProductFunctionalGroups = createSelector(
  selectProductFunctionalGroupsState,
  (state: ProductGroupsState) => selectAll(state),
);

export const selectProductFunctionalGroupsEntities = createSelector(
  selectProductFunctionalGroupsState,
  (state: ProductGroupsState) => selectEntities(state),
);

export const selectSelectedProductFunctionalGroupId = createSelector(
  selectProductFunctionalGroupsState,
  (state: ProductGroupsState) => state.selectedId,
);

export const selectEntity = createSelector(
  selectProductFunctionalGroupsEntities,
  selectSelectedProductFunctionalGroupId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
