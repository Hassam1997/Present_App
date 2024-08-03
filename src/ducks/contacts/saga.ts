/** @format */

import { take, put, fork, call } from "redux-saga/effects";
import { Util } from "../../utils";
import { callRequest } from "../../utils/ApiSauce";
import {
  addContact,
  addGroupLink,
  contactAddToGroup,
  contactGetDetail,
  contactsGetList,
  createGroup,
  deleteContact,
  deleteGroup,
  editContact,
  editGroupDetail,
  getInterests,
  getRelations,
  groupGetDetail,
  groupsGetList,
  saveContactsList,
} from ".";
import {
  API_ADD_CONTACTS,
  API_ADD_GROUP_LINK,
  API_ADD_TO_GROUPS,
  API_CREATE_GROUP,
  API_CREATE_GROUP_CONTACT,
  API_DELETE_CONTACT,
  API_DELETE_GROUP_CONTACT,
  API_EDIT_CONTACTS,
  API_EDIT_GROUP_DETAIL,
  API_GET_CONTACTS,
  API_GET_CONTACT_DETAIL,
  API_GET_GROUPS,
  API_GET_GROUP_DETAIL,
  API_GET_INTERESTS,
  API_GET_RELATIONS,
  API_SAVE_CONTACTS,
  UPLOAD_MEDIA,
} from "../../config/WebService";

function* watchSaveContacts(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(saveContactsList.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_SAVE_CONTACTS, payloadApi);
      yield put(saveContactsList.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(saveContactsList.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchGetContactList(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(contactsGetList.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_CONTACTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        contactsGetList.success({
          data: response?.data,
          reset,
          page: {
            totalRecords:
              response?.data?.length == 0 ? 0 : response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(contactsGetList.failure({ errorMessage: error.message }));
    }
  }
}

function* watchGetGroupList(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(groupsGetList.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_GROUPS,
        {},
        {},
        `?${query}`
      );
      yield put(
        groupsGetList.success({
          data: response?.data,
          reset,
          page: {
            totalRecords:
              response?.data?.length == 0 ? 0 : response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(groupsGetList.failure({ errorMessage: error.message }));
    }
  }
}

function* watchGetContactDetail(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; identifier?: any };
    } = yield take(contactGetDetail.request.type);
    const { payloadApi, cb, identifier } = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_CONTACT_DETAIL,
        {},
        {},
        `${payloadApi?.id}/`
      );
      yield put(
        contactGetDetail.success({
          data: response?.data,
          identifier,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        contactGetDetail.failure({
          errorMessage: error.message,
          identifier,
        })
      );
    }
  }
}

function* watchGetGroupDetail(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; identifier?: any };
    } = yield take(groupGetDetail.request.type);
    const { payloadApi, cb, identifier } = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_GROUP_DETAIL,
        {},
        {},
        `${payloadApi?.id}/`
      );
      yield put(
        groupGetDetail.success({
          data: response?.data,
          identifier,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        groupGetDetail.failure({
          errorMessage: error.message,
          identifier,
        })
      );
    }
  }
}

function* watchAddContacts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; file?: any } } =
      yield take(addContact.request.type);
    const { payloadApi, cb, file } = payload;
    try {
      if (file) {
        const upload_media = yield call(callRequest, UPLOAD_MEDIA, {
          contentType: file.type,
        });
        const image_url = yield call(
          callRequest,
          {
            route: "",
            access_token_required: true,
            type: "post",
            image_upload: upload_media?.data?.result?.url,
          },
          Util.ObjectToFormData(upload_media?.data?.result?.fields, file)
        );
        payloadApi.image = upload_media?.data?.url;
      }
      const response = yield call(callRequest, API_ADD_CONTACTS, payloadApi);
      yield put(
        addContact.success({
          data: response?.data,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(addContact.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchGetInterests(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; reset?: any };
    } = yield take(getInterests.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_INTERESTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        getInterests.success({
          data: response?.data,
          reset,
          page: {
            totalRecords:
              response?.data?.length == 0 ? 0 : response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        getInterests.failure({
          errorMessage: error.message,
        })
      );
    }
  }
}

function* watchGetRelations(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; reset?: any };
    } = yield take(getRelations.request.type);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(callRequest, API_GET_RELATIONS, {});
      yield put(
        getRelations.success({
          data: response?.data,
          reset,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        getRelations.failure({
          errorMessage: error.message,
        })
      );
    }
  }
}

function* watchEditContacts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
        file?: any;
        payload_id?: number;
      };
    } = yield take(editContact.request.type);
    const { payloadApi, cb, file, payload_id } = payload;
    try {
      if (file) {
        const upload_media = yield call(callRequest, UPLOAD_MEDIA, {
          contentType: file.type,
        });
        const image_url = yield call(
          callRequest,
          {
            route: "",
            access_token_required: true,
            type: "post",
            image_upload: upload_media?.data?.result?.url,
          },
          Util.ObjectToFormData(upload_media?.data?.result?.fields, file)
        );
        payloadApi.image = upload_media?.data?.url;
      }
      const response = yield call(
        callRequest,
        API_EDIT_CONTACTS,
        payloadApi,
        {},
        `${payload_id}/`
      );
      yield put(
        editContact.success({
          data: response?.data,
          payload_id: payload_id,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        editContact.failure({
          errorMessage: error.message,
        })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchAddToGroups(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(contactAddToGroup.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_ADD_TO_GROUPS, payloadApi);
      yield put(contactAddToGroup.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(contactAddToGroup.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchDeleteContact(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(deleteContact.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_CONTACT,
        {},
        {},
        `${payloadApi.id}/`
      );
      yield put(
        deleteContact.success({
          data: {
            id: payloadApi.id,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(deleteContact.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchEditGroup(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
        file?: any;
        payload_id?: number;
      };
    } = yield take(editGroupDetail.request.type);
    const { payloadApi, cb, file, payload_id } = payload;
    try {
      if (file) {
        const upload_media = yield call(callRequest, UPLOAD_MEDIA, {
          contentType: file.type,
        });
        const image_url = yield call(
          callRequest,
          {
            route: "",
            access_token_required: true,
            type: "post",
            image_upload: upload_media?.data?.result?.url,
          },
          Util.ObjectToFormData(upload_media?.data?.result?.fields, file)
        );
        payloadApi.image = upload_media?.data?.url;
      }
      const response = yield call(
        callRequest,
        API_EDIT_GROUP_DETAIL,
        payloadApi,
        {},
        `${payload_id}/`
      );
      yield put(
        editGroupDetail.success({
          data: response?.data,
          payload_id: payload_id,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        editGroupDetail.failure({
          errorMessage: error.message,
        })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchCreateGroup(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; file?: any } } =
      yield take(createGroup.request.type);
    const { payloadApi, cb, file } = payload;
    try {
      if (file) {
        const upload_media = yield call(callRequest, UPLOAD_MEDIA, {
          contentType: file.type,
        });
        const image_url = yield call(
          callRequest,
          {
            route: "",
            access_token_required: true,
            type: "post",
            image_upload: upload_media?.data?.result?.url,
          },
          Util.ObjectToFormData(upload_media?.data?.result?.fields, file)
        );
        payloadApi.image = upload_media?.data?.url;
      }
      const response = yield call(
        callRequest,
        API_CREATE_GROUP_CONTACT,
        payloadApi
      );
      yield put(
        createGroup.success({
          data: response?.data,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(createGroup.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchDeleteGroup(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(deleteGroup.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_GROUP_CONTACT,
        {},
        {},
        `${payloadApi.id}/`
      );
      yield put(
        deleteGroup.success({
          data: {
            id: payloadApi.id,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(deleteGroup.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchAddGroupLink(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(addGroupLink.request);

    const { payloadApi, cb } = payload;

    try {
      const response = yield call(
        callRequest,
        API_ADD_GROUP_LINK,
        {},
        {},
        `${payloadApi.id}/join/`
      );
      yield put(addGroupLink.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(addGroupLink.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

export default function* root(): Generator<any, void, any> {
  yield fork(watchSaveContacts);
  yield fork(watchGetContactList);
  yield fork(watchGetGroupList);
  yield fork(watchGetContactDetail);
  yield fork(watchGetGroupDetail);
  yield fork(watchAddContacts);
  yield fork(watchGetInterests);
  yield fork(watchGetRelations);
  yield fork(watchEditContacts);
  yield fork(watchAddToGroups);
  yield fork(watchDeleteContact);
  yield fork(watchEditGroup);
  yield fork(watchCreateGroup);
  yield fork(watchDeleteGroup);
  yield fork(watchAddGroupLink);
}
