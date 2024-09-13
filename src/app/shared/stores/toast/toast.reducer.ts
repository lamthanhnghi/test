import { Action, createReducer, on } from '@ngrx/store';
import { showToast, showToastSuccess } from '@shared/stores';
import { IToastState } from '@shared/toast.model';

export const TOAST_FEATURE_KEY = 'toast';

const initialState: IToastState = {
  status: '',
  title: '',
  message: '',
};

const reducer = createReducer(
  initialState,
  on(showToast, (state, { status, title, message, action, object }) => ({
    ...state,
    status,
    title,
    message,
    action,
    object,
  })),
  on(showToastSuccess, () => ({ ...initialState })),
);

export function toastReducer(state: IToastState | undefined, action: Action) {
  return reducer(state, action);
}
