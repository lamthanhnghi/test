import { createAction, props } from '@ngrx/store';
import { eToastStatus } from '@shared/enums';

export const showToast = createAction(
  '[Toast] Show',
  props<{
    status: eToastStatus;
    title: string;
    message: string;
    action?: string;
    object?: string;
  }>(),
);

export const showToastSuccess = createAction('[Toast] Show Success');
