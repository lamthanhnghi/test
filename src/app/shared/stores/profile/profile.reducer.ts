import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { ICountDocument, IProfile, IProfileDocument } from '@shared/models';

export const PROFILE_FEATURE_KEY = 'profile';

export interface ProfileState {
  data?: IProfile;
  documents?: IProfileDocument[];
  count?: ICountDocument;
  loaded: boolean; // has the Profile list been loaded
}
export const initialProfileState: ProfileState = {
  data: undefined,
  documents: undefined,
  count: undefined,
  loaded: false,
};

const reducer = createReducer(
  initialProfileState,
  on(ProfileActions.loadProfileSuccess, (state, { profile }) => ({ ...state, data: profile, loaded: true })),
  on(ProfileActions.loadProfileFailure, (state, { error }) => ({ ...state, error })),
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  on(ProfileActions.setProfilePartial, (state, { profile }) => ({ ...state, data: { ...state.data!, ...profile } })),
  // for documents
  on(ProfileActions.loadDocumentsSuccess, (state, { documents }) => ({ ...state, documents })),
  on(ProfileActions.countDocumentsSuccess, (state, { data }) => ({ ...state, count: data })),
  on(ProfileActions.clearDocuments, (state) => ({ ...state, documents: undefined })),
  on(ProfileActions.clearDocumentAndCount, (state) => ({ ...state, documents: undefined, count: undefined })),
  on(ProfileActions.clearAll, () => ({ ...initialProfileState })),
);

export function profileReducer(state: ProfileState | undefined, action: Action) {
  return reducer(state, action);
}
