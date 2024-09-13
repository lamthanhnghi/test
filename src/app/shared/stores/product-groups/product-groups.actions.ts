import { createAction, props } from '@ngrx/store';
import { IProductGroup } from '@shared/models';

export const loadProductGroups = createAction('[ProductFunctionalGroups/API] Load Product Groups');

export const loadProductGroupsSuccess = createAction(
  '[ProductGroups/API] Load Product Groups Success',
  props<{ productGroups: IProductGroup[] }>(),
);

export const loadProductGroupsFailure = createAction(
  '[ProductGroups/API] Load Product Groups Failure',
  props<{ error: any }>(),
);
