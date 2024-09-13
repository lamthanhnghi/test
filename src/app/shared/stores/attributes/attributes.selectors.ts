import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ATTRIBUTES_FEATURE_KEY, attributesAdapter, AttributesState } from '@shared/stores';

// Lookup the 'Attributes' feature state managed by NgRx
export const selectAttributesState = createFeatureSelector<AttributesState>(ATTRIBUTES_FEATURE_KEY);

const { selectAll, selectEntities } = attributesAdapter.getSelectors();

export const selectAttributesLoaded = createSelector(selectAttributesState, (state: AttributesState) => state.loaded);

export const selectAttributesError = createSelector(selectAttributesState, (state: AttributesState) => state.error);

export const selectAllAttributes = createSelector(selectAttributesState, (state: AttributesState) => selectAll(state));

export const selectAttributeAppTitle = createSelector(selectAttributesState, (state) => state?.appTitle || '');

export const selectAttributesEntities = createSelector(selectAttributesState, (state: AttributesState) =>
  selectEntities(state),
);

export const selectSelectedAttributeId = createSelector(
  selectAttributesState,
  (state: AttributesState) => state.selectedId,
);

export const selectAttributeEntity = createSelector(
  selectAttributesEntities,
  selectSelectedAttributeId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
