import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { AttributesEntity } from './attributes.models';
import { AttributesActions } from './attributes.actions';

export const ATTRIBUTES_FEATURE_KEY = 'attributes';

export interface AttributesState extends EntityState<AttributesEntity> {
  selectedId?: string | number; // which Attributes record has been selected
  loaded: boolean; // has the Attributes list been loaded
  error?: string | null; // last known error (if any)
  appTitle?: string;
}

export interface AttributesPartialState {
  readonly [ATTRIBUTES_FEATURE_KEY]: AttributesState;
}

export const attributesAdapter: EntityAdapter<AttributesEntity> = createEntityAdapter<AttributesEntity>({
  selectId: (attributes: AttributesEntity) => attributes.attributeID,
  sortComparer: false,
});

export const initialAttributesState: AttributesState = attributesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  appTitle: '',
});

const reducer = createReducer(
  initialAttributesState,
  on(AttributesActions.loadAttributes, (state) => ({ ...state, loaded: false, error: null })),
  on(AttributesActions.loadAttributesSuccess, (state, { attributes }) =>
    attributesAdapter.setAll(attributes, { ...state, loaded: true }),
  ),
  on(AttributesActions.setTitle, (state, { title }) => {
    console.log(title);
    return {
      ...state,
      appTitle: title,
    };
  }),
);

export function attributesReducer(state: AttributesState | undefined, action: Action) {
  return reducer(state, action);
}
