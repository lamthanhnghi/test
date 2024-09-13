import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EMAIL_MODAL_FEATURE_KEY, emailModalAdapter, EmailModalState } from './email-modal.reducer';

// Lookup the 'EmailModal' feature state managed by NgRx
export const selectEmailModalState = createFeatureSelector<EmailModalState>(EMAIL_MODAL_FEATURE_KEY);

const { selectAll, selectEntities } = emailModalAdapter.getSelectors();

export const selectEmailModalLoaded = createSelector(selectEmailModalState, (state: EmailModalState) => state.loaded);

export const selectEmailModalError = createSelector(selectEmailModalState, (state: EmailModalState) => state.error);

export const selectAllEmailModal = createSelector(selectEmailModalState, (state: EmailModalState) => selectAll(state));

export const selectEmailModalEntities = createSelector(selectEmailModalState, (state: EmailModalState) =>
  selectEntities(state),
);

export const selectSelectedEmailId = createSelector(
  selectEmailModalState,
  (state: EmailModalState) => state.selectedId,
);

export const selectEmailEntity = createSelector(
  selectEmailModalEntities,
  selectSelectedEmailId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
