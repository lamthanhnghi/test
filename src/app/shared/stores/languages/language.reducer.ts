import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as LanguageActions from './language.actions';
import { IMcLanguage } from '@shared/language.models';

export const LANGUAGE_FEATURE_KEY = 'languages';

export interface LanguageState extends EntityState<IMcLanguage> {
  selectedId?: string | number; // which Language record has been selected
  loaded: boolean; // has the Language list been loaded
  error?: string | undefined; // last known error (if any)
}

export interface LanguagePartialState {
  readonly [LANGUAGE_FEATURE_KEY]: LanguageState;
}

export const languageAdapter: EntityAdapter<IMcLanguage> = createEntityAdapter<IMcLanguage>({
  selectId: (language: IMcLanguage) => language.languageID,
});

export const initialLanguageState: LanguageState = languageAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialLanguageState,
  on(LanguageActions.loadLanguages, (state) => ({ ...state, loaded: false, error: undefined })),
  on(LanguageActions.loadLanguagesSuccess, (state, { languages }) =>
    languageAdapter.setAll(languages, { ...state, loaded: true }),
  ),
  on(LanguageActions.loadLanguagesFailure, (state, { error }) => ({ ...state, error })),
);

export function languageReducer(state: LanguageState | undefined, action: Action) {
  return reducer(state, action);
}
