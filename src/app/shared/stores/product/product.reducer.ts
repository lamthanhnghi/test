import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ProductActions from './product.actions';
import { IProduct } from '@shared/models';

export const PRODUCT_FEATURE_KEY = 'product';

export interface ProductState extends EntityState<IProduct> {
  productDetail?: IProduct;
  selectedId?: string | number; // which Product record has been selected
  saveClicked: boolean;
  loaded: boolean; // has the Product list been loaded
  loading?: boolean; // are the Products loading
  error?: string | null; // last known error (if any)
  router?: {
    pageAction: string;
    id: string;
  };
  total?: number;
  oldProductData?: string;
  newProductData?: string;
}

export interface ProductPartialState {
  readonly [PRODUCT_FEATURE_KEY]: ProductState;
}

export const productAdapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: (product: IProduct) => product.productID,
});

export const initialProductState: ProductState = productAdapter.getInitialState({
  // set initial required properties
  saveClicked: false,
  loaded: false,
  total: 0,
});

const reducer = createReducer(
  initialProductState,
  on(ProductActions.loadProduct, (state) => ({ ...state, loaded: false, error: null })),
  on(ProductActions.loadProductSuccess, (state, { product }) => ({ ...state, productDetail: product, loaded: true })),
  on(ProductActions.loadProductFailure, (state, { error }) => ({ ...state, error })),
  on(ProductActions.clearProductDetail, (state) => ({ ...state, productDetail: undefined })),
  on(ProductActions.saveClicked, (state) => ({ ...state, saveClicked: true })),
  on(ProductActions.saveClickedSuccess, (state) => ({ ...state, saveClicked: false })),
  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { products, total }) =>
    productAdapter.setAll(products, { ...state, loading: false, total }),
  ),
  on(ProductActions.storeOldProductData, (state, { data }) => ({ ...state, oldProductData: data })),
  on(ProductActions.storeNewProductData, (state, { data }) => ({ ...state, newProductData: data })),
  on(ProductActions.clearUnsavedProductData, (state) => ({ ...state, oldProductData: '', newProductData: '' })),
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return reducer(state, action);
}
