import { createAction, props } from '@ngrx/store';
import {
  IAddress,
  IChangeContentStatusPayload,
  IContactInfoPayload,
  ICountDocument,
  IDeleteAddressPayload,
  IDeleteEmailPayload,
  IDeletePhonePayload,
  IDeleteUrlPayload,
  IEmail,
  IGetProfileDocumentParams,
  IPhone,
  IProfile,
  IProfileDocument,
  IUrl,
} from '@shared/models';
import { eContentStatuses } from '@shared/enums';

export const loadProfile = createAction('[Profile Page] Init');

export const loadProfileSuccess = createAction('[Profile/API] Load Profile Success', props<{ profile: IProfile }>());

export const setProfilePartial = createAction(
  '[Profile/API] Set Profile Partial',
  props<{ profile: Partial<IProfile> }>(),
);

export const loadProfileFailure = createAction('[Profile/API] Load Profile Failure', props<{ error: any }>());

export const updateAvatar = createAction('[Profile/API] Update Avatar', props<{ payload: FormData }>());

export const updateCover = createAction('[Profile/API] Update Cover', props<{ payload: FormData }>());

export const showAddAddressModal = createAction('[Profile/API] Show Add Address Modal');

export const showUpdateAddressModal = createAction(
  '[Profile/API] Show Edit Address Modal',
  props<{ address: IAddress }>(),
);

export const deleteAddress = createAction('[Profile/API] Delete Address', props<{ payload: IDeleteAddressPayload }>());

// Email
export const showAddEmailModal = createAction('[Profile/API] Show Add Email Modal');

export const showUpdateEmailModal = createAction('[Profile/API] Show Edit Email Modal', props<{ email: IEmail }>());

export const deleteEmail = createAction('[Profile/API] Delete Email', props<{ payload: IDeleteEmailPayload }>());

// phone
export const showAddPhoneModal = createAction('[Profile/API] Show Add Phone Modal');

export const showUpdatePhoneModal = createAction('[Profile/API] Show Edit Phone Modal', props<{ phone: IPhone }>());

export const deletePhone = createAction('[Profile/API] Delete Phone', props<{ payload: IDeletePhonePayload }>());

export const showAddUrlModal = createAction('[Profile/API] Show Add Url Modal');

export const showUpdateUrlModal = createAction('[Profile/API] Show Edit Url Modal', props<{ url: IUrl }>());

export const deleteUrl = createAction('[Profile/API] Delete Url', props<{ payload: IDeleteUrlPayload }>());

export const showManageContactInfoModal = createAction(
  '[Profile/API] Show Manage Contact Info Modal',
  props<{ contactInfo: IContactInfoPayload }>(),
);

export const showManageSellerLoginIDModal = createAction(
  '[Profile/API] Show Manage Seller Login ID Modal',
  props<{ sellerLoginID: string }>(),
);

export const countDocuments = createAction('[Profile/API] Count Documents');

export const countDocumentsSuccess = createAction(
  '[Profile/API] Count Documents Success',
  props<{ data: ICountDocument }>(),
);

export const countDocumentsFailure = createAction('[Profile/API] Count Documents Failure', props<{ error: any }>());

export const saveDocuments = createAction('[Profile/API] Save Documents', props<{ payload: FormData }>());

export const updateDocuments = createAction('[Profile/API] Update Documents', props<{ payload: FormData }>());

export const loadDocuments = createAction(
  '[Profile/API] Get Documents',
  props<{ params: IGetProfileDocumentParams }>(),
);

export const loadDocumentsSuccess = createAction(
  '[Profile/API] Load Documents Success',
  props<{ documents: IProfileDocument[] }>(),
);

export const loadDocumentsFailure = createAction('[Profile/API] Load Documents Failure', props<{ error: any }>());

export const clearDocuments = createAction('[Profile/API] Clear Documents');

export const changeContentStatus = createAction(
  '[Profile/API] Change Content Status',
  props<{ payload: IChangeContentStatusPayload; confirm: boolean; redirect: string[] }>(),
);

export const deleteDocument = createAction(
  '[Profile/API] Delete Document',
  props<{ payload: { mediaHistoryID: string }; contentStatus: eContentStatuses }>(),
);

export const clearDocumentAndCount = createAction('[Profile/API] Clear Document And Count');

export const clearAll = createAction('[Profile/API] Clear All');
