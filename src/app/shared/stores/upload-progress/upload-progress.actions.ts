import { createAction, props } from '@ngrx/store';
import { UploadProgressEntity } from './upload-progress.models';

export const upsertProgress = createAction(
  '[UploadProgress/API] Upsert File',
  props<{ progress: UploadProgressEntity }>(),
);

export const uploadFile = createAction('[UploadProgress/API] Upload File', props<{ payload: UploadProgressEntity }>());
export const uploadFileSuccess = createAction('[UploadProgress/API] Upload File Success');

export const uploadError = createAction('[UploadProgress/API] Upload Error', props<{ error: any }>());
