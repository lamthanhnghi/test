import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ProductGroupsActions from './product-groups.actions';
import { IProductGroup } from '@shared/models';

export const PRODUCT_GROUPS_FEATURE_KEY = 'productGroups';

export interface ProductGroupsState extends EntityState<IProductGroup> {
  selectedId?: string | number; // which ProductFunctionalGroups record has been selected
  loaded: boolean; // has the ProductFunctionalGroups list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProductFunctionalGroupsPartialState {
  readonly [PRODUCT_GROUPS_FEATURE_KEY]: ProductGroupsState;
}

export const productGroupsAdapter: EntityAdapter<IProductGroup> = createEntityAdapter<IProductGroup>({
  selectId: (productGroups) => productGroups.productGroupID,
});

export const initialProductGroupsState: ProductGroupsState = productGroupsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialProductGroupsState,
  on(ProductGroupsActions.loadProductGroups, (state) => ({ ...state, loaded: false, error: null })),
  on(ProductGroupsActions.loadProductGroupsSuccess, (state, { productGroups }) =>
    productGroupsAdapter.setAll(productGroups, { ...state, loaded: true }),
  ),
  on(ProductGroupsActions.loadProductGroupsFailure, (state, { error }) => ({ ...state, error })),
);

export function productGroupsReducer(state: ProductGroupsState | undefined, action: Action) {
  return reducer(state, action);
}
