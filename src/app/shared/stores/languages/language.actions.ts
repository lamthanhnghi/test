import { createAction, props } from '@ngrx/store';
import { IMcLanguage } from '@shared/language.models';

export const loadLanguages = createAction('[Language/API] Load Languages');

export const loadLanguagesSuccess = createAction(
  '[Language/API] Load Languages Success',
  props<{ languages: IMcLanguage[] }>(),
);

export const loadLanguagesFailure = createAction('[Language/API] Load Languages Failure', props<{ error: any }>());
