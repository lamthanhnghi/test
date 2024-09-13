import { Action, createReducer, on } from '@ngrx/store';
import {
  startLoading,
  startLoadingCount,
  startLoadingFrom,
  stopLoading,
  stopLoadingCount,
  stopLoadingFrom,
} from './loading.actions';
import { ILoadingState } from '@shared/models';

export const LOADING_FEATURE_KEY = 'loading';

export const initialLoadingState: ILoadingState = {
  isLoading: false,
  loadingCount: 0,
  from: new Map<string, boolean>(),
};

const _loadingReducer = createReducer(
  initialLoadingState,
  on(startLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({ ...state, isLoading: false })),
  on(startLoadingCount, (state) => ({ ...state, loadingCount: state.loadingCount + 1 })),
  on(stopLoadingCount, (state) => ({ ...state, loadingCount: Math.max(state.loadingCount - 1, 0) })),
  on(startLoadingFrom, (state, { key }) => ({ ...state, from: state.from.set(key, true) })),
  on(stopLoadingFrom, (state, { key }) => ({ ...state, from: state.from.set(key, false) })),
);

export function loadingReducer(state: ILoadingState | undefined, action: Action) {
  return _loadingReducer(state, action);
}
