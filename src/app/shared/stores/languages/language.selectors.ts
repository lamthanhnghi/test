import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LANGUAGE_FEATURE_KEY, languageAdapter, LanguageState } from './language.reducer';

// Lookup the 'Language' feature state managed by NgRx
export const selectLanguageState = createFeatureSelector<LanguageState>(LANGUAGE_FEATURE_KEY);

const { selectAll, selectEntities } = languageAdapter.getSelectors();

export const selectLanguageLoaded = createSelector(selectLanguageState, (state: LanguageState) => state.loaded);

export const selectLanguageError = createSelector(selectLanguageState, (state: LanguageState) => state.error);

export const selectAllLanguage = createSelector(selectLanguageState, (state: LanguageState) => selectAll(state));

export const selectLanguageEntities = createSelector(selectLanguageState, (state: LanguageState) =>
  selectEntities(state),
);

export const selectSelectedLanguageId = createSelector(selectLanguageState, (state: LanguageState) => state.selectedId);

export const selectLanguageEntity = createSelector(
  selectLanguageEntities,
  selectSelectedLanguageId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
