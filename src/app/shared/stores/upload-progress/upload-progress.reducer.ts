import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as UploadProgressActions from './upload-progress.actions';
import { UploadProgressEntity } from './upload-progress.models';

export const UPLOAD_PROGRESS_FEATURE_KEY = 'uploadProgress';

export interface UploadProgressState extends EntityState<UploadProgressEntity> {
  selectedId?: string | number; // which UploadProgress record has been selected
  loaded: boolean; // has the UploadProgress list been loaded
  error?: string | null; // last known error (if any)
}

export interface UploadProgressPartialState {
  readonly [UPLOAD_PROGRESS_FEATURE_KEY]: UploadProgressState;
}

export const uploadProgressAdapter: EntityAdapter<UploadProgressEntity> = createEntityAdapter<UploadProgressEntity>({
  selectId: (uploadProgress) => uploadProgress.uid,
});

export const initialUploadProgressState: UploadProgressState = uploadProgressAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialUploadProgressState,
  on(UploadProgressActions.upsertProgress, (state, { progress }) => {
    return uploadProgressAdapter.upsertOne(progress, state);
  }),
);

export function uploadProgressReducer(state: UploadProgressState | undefined, action: Action) {
  return reducer(state, action);
}
