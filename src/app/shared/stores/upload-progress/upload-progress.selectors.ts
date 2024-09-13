import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UPLOAD_PROGRESS_FEATURE_KEY, uploadProgressAdapter, UploadProgressState } from './upload-progress.reducer';

// Lookup the 'UploadProgress' feature state managed by NgRx
export const selectUploadProgressState = createFeatureSelector<UploadProgressState>(UPLOAD_PROGRESS_FEATURE_KEY);

const { selectAll, selectEntities } = uploadProgressAdapter.getSelectors();

export const selectUploadProgressLoaded = createSelector(
  selectUploadProgressState,
  (state: UploadProgressState) => state.loaded,
);

export const selectUploadProgressError = createSelector(
  selectUploadProgressState,
  (state: UploadProgressState) => state.error,
);

export const selectAllUploadProgress = createSelector(selectUploadProgressState, (state: UploadProgressState) =>
  selectAll(state),
);

export const selectUploadProgressEntities = createSelector(selectUploadProgressState, (state: UploadProgressState) =>
  selectEntities(state),
);

export const selectSelectedUploadProgressId = createSelector(
  selectUploadProgressState,
  (state: UploadProgressState) => state.selectedId,
);

export const selectProgressEntity = createSelector(
  selectUploadProgressEntities,
  selectSelectedUploadProgressId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
