import { createAction, props } from '@ngrx/store';
import { EmailModalEntity } from './email-modal.models';

export const initEmailModal = createAction('[EmailModal Page] Init');

export const loadEmailModalSuccess = createAction(
  '[EmailModal/API] Load EmailModal Success',
  props<{ emailModal: EmailModalEntity[] }>(),
);

export const loadEmailModalFailure = createAction('[EmailModal/API] Load EmailModal Failure', props<{ error: any }>());
