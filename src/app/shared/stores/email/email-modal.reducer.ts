import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as EmailModalActions from './email-modal.actions';
import { EmailModalEntity } from './email-modal.models';

export const EMAIL_MODAL_FEATURE_KEY = 'emailModal';

export interface EmailModalState extends EntityState<EmailModalEntity> {
  selectedId?: string | number; // which EmailModal record has been selected
  loaded: boolean; // has the EmailModal list been loaded
  error?: string | null; // last known error (if any)
}

export interface EmailModalPartialState {
  readonly [EMAIL_MODAL_FEATURE_KEY]: EmailModalState;
}

export const emailModalAdapter: EntityAdapter<EmailModalEntity> = createEntityAdapter<EmailModalEntity>();

export const initialEmailModalState: EmailModalState = emailModalAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialEmailModalState,
  on(EmailModalActions.initEmailModal, (state) => ({ ...state, loaded: false, error: null })),
  on(EmailModalActions.loadEmailModalSuccess, (state, { emailModal }) =>
    emailModalAdapter.setAll(emailModal, { ...state, loaded: true }),
  ),
  on(EmailModalActions.loadEmailModalFailure, (state, { error }) => ({ ...state, error })),
);

export function emailModalReducer(state: EmailModalState | undefined, action: Action) {
  return reducer(state, action);
}
