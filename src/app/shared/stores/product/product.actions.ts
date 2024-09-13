import { createAction, props } from '@ngrx/store';
import {
  IProduct,
  IProductCheckUpdatePayload,
  IProductCreatePayload,
  IProductCreateResponse,
  IProductPagination,
  IProductUpdatePayload,
} from '@shared/models';
import { ePageActions } from '@shared/enums';

export const loadProduct = createAction(
  '[Product Page] Load Product',
  props<{ id: string; productVersionID: string }>(),
);

export const loadProductSuccess = createAction('[Product/API] Load Product Success', props<{ product: IProduct }>());

export const loadProductFailure = createAction('[Product/API] Load Product Failure', props<{ error: any }>());

export const clearProductDetail = createAction('[Product/API] Clear Product Detail');

export const saveClicked = createAction('[Product Page] Save Clicked');

export const saveClickedSuccess = createAction('[Product/API] Save Clicked Success');

export const addProduct = createAction('[Product/API] Save Product', props<{ payload: IProductCreatePayload }>());

export const addProductSuccess = createAction(
  '[Product/API] Save Product Success',
  props<{ product: IProductCreateResponse }>(),
);
export const addProductFailure = createAction('[Product/API] Save Product Failure', props<{ error: any }>());

export const updateProduct = createAction('[Product/API] Update Product', props<{ payload: IProductUpdatePayload }>());

export const updateProductSuccess = createAction(
  '[Product/API] Update Product Success',
  props<{ product: IProductCreateResponse }>(),
);

export const changeProductRouter = createAction(
  '[Product/API] Change Product Router',
  props<{ pageAction: ePageActions; id: string; versionID: string }>(),
);

export const changeProductRouterSuccess = createAction('[Product/API] Change Product Router Success');

export const loadProducts = createAction('[Product Page] Load Products', props<{ pagination: IProductPagination }>());

export const loadProductsSuccess = createAction(
  '[Product/API] Load Products Success',
  props<{ products: IProduct[]; total: number }>(),
);

export const loadProductsFailure = createAction('[Product/API] Load Products Failure', props<{ error: any }>());

/** user click on edit button */
export const checkUpdateProduct = createAction(
  '[Product Page] Check Update Product',
  props<{ payload: IProductCheckUpdatePayload }>(),
);

export const checkUpdateProductSuccess = createAction(
  '[Product/API] Check Update Product Success',
  props<{ product: IProduct }>(),
);

export const storeOldProductData = createAction('[Product/API] Store Old Product Data', props<{ data: string }>());

export const storeNewProductData = createAction('[Product/API] Store New Product Data', props<{ data: string }>());

export const clearUnsavedProductData = createAction('[Product/API] Clear Unsaved Product Data');
