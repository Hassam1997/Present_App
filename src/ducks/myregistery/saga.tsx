/** @format */

import { take, put, fork, call, takeEvery } from "redux-saga/effects";
import { callRequest } from "../../utils/ApiSauce";
import {
  registryAddGroupProducts,
  registryCreateGroup,
  registryDeleteGroup,
  registryEditGroup,
  registryFinalizeGroup,
  registryGiftingGroup,
  registryJuniorGifts,
  registryMarkPaid,
  registryMyGifts,
  registryPurchaseGifts,
  registryRemoveGifts,
  registryRemoveGroupProducts,
  registrySaveGroupDraft,
  registrySavedGifts,
  registrySpecificGiftingGroup,
  registrySpecificJuniorGifts,
  registryStarredGifts,
  registrySuggestedGroupProducts,
  registryProductsPriority,
} from ".";
import {
  API_ADD_GROUP,
  API_CREATE_GROUP,
  API_DELETE_GROUP,
  API_EDIT_GROUP,
  API_FINILIZE_GROUP,
  API_GET_MY_GIFTS,
  API_GIFTING_GROUP,
  API_JUNIOR_GIFT,
  API_MARK_PAID,
  API_PURCHASE_GIFTS,
  API_REGISTRY_PRODUCT_PRIORITY,
  API_REMOVE_GIFT,
  API_REMOVE_GROUP_PRODUCTS,
  API_SAVED_GIFT,
  API_SAVE_GROUP_DRAFT,
  API_SPECIFIC_GROUP,
  API_SPECIFIC_JUNIOR_GIFT,
  API_SPECIFIC_SENTA_JUNIOR_GIFT,
  API_STARRED_GIFTS,
  API_SUGGESTED_GROUP,
} from "../../config/WebService";
import { DataHandler, Util } from "../../utils";
import { getIsGuestUser } from "../auth";

function* watchMyGifts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(registryMyGifts.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_MY_GIFTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        registryMyGifts.success({
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
      yield put(registryMyGifts.failure({ errorMessage: error.message }));
    }
  }
}

function* watchPurchaseGifts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
        reset: any;
        identifier: any;
      };
    } = yield take(registryPurchaseGifts.request.type);
    const { payloadApi, cb, identifier } = payload;
    try {
      const response = yield call(
        callRequest,
        API_PURCHASE_GIFTS,
        payloadApi,
        {},
        `${payloadApi?.model_id}/mark_purchased/`
      );
      yield put(
        registryPurchaseGifts.success({
          data: payloadApi,

          id: identifier,
          identifier: identifier,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registryPurchaseGifts.failure({
          errorMessage: error.message,
          identifier: identifier,
        })
      );
    }
  }
}

function* watchStarredGifts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; identifier: any } } =
      yield take(registryStarredGifts.request.type);
    const { payloadApi, cb, identifier } = payload;
    try {
      const response = yield call(callRequest, API_STARRED_GIFTS, payloadApi);
      yield put(
        registryStarredGifts.success({
          data: payloadApi,
          id: identifier,
          identifier: identifier,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registryStarredGifts.failure({
          errorMessage: error.message,
          identifier: identifier,
        })
      );
    }
  }
}

function* watchGiftingGroups(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(registryGiftingGroup.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GIFTING_GROUP,
        {},
        {},
        `?${query}`
      );
      yield put(
        registryGiftingGroup.success({
          data: response?.data,
          reset,
          page: {
            totalRecords: response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(registryGiftingGroup.failure({ errorMessage: error.message }));
    }
  }
}

function* watchJuniorGifts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(registryJuniorGifts.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_JUNIOR_GIFT,
        {},
        {},
        `?${query}`
      );
      yield put(
        registryJuniorGifts.success({
          data: response?.data,
          reset,
          page: {
            totalRecords: response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(registryJuniorGifts.failure({ errorMessage: error.message }));
    }
  }
}

function* watchSpecificJuniorGifts(action): Generator<any, void, any> {
  const { payloadApi, cb, reset, identifier } = action.payload;
  const payloadObj = Util.omit("id", payloadApi);
  const query = Util.objectToQueryString(payloadObj);
  const isGuest = getIsGuestUser(DataHandler.getStoreState());
  try {
    const response = yield call(
      callRequest,
      isGuest ? API_SPECIFIC_SENTA_JUNIOR_GIFT : API_SPECIFIC_JUNIOR_GIFT,
      {},
      {},
      isGuest ? `?${query}` : `${payloadApi?.id}/junior_products?${query}`
    );
    yield put(
      registrySpecificJuniorGifts.success({
        data: response?.data,
        identifier,
        reset,
        page: {
          totalRecords: response?.meta?.total || 0,
          nextPage: payloadApi?.page,
        },
      })
    );
    cb?.(response?.data);
  } catch (error: any) {
    yield put(
      registrySpecificJuniorGifts.failure({
        errorMessage: error.message,
        identifier,
      })
    );
  }
}

function* watchRemoveGifts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
        identifier: any;
      };
    } = yield take(registryRemoveGifts.request.type);
    const { payloadApi, cb, identifier } = payload;

    try {
      const response = yield call(callRequest, API_REMOVE_GIFT, payloadApi);
      yield put(
        registryRemoveGifts.success({
          id: identifier,
          data: payloadApi.model_ids,
          identifier: identifier,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registryRemoveGifts.failure({
          errorMessage: error.message,
          identifier: identifier,
        })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSavedGifts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(registrySavedGifts.request.type);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(callRequest, API_SAVED_GIFT, {}, {}, ``);
      yield put(
        registrySavedGifts.success({
          data: response?.data,
          reset,
          page: {
            totalRecords: response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(registrySavedGifts.failure({ errorMessage: error.message }));
    }
  }
}

function* watchCreateGroup(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; identifier: any } } =
      yield take(registryCreateGroup.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_CREATE_GROUP, payloadApi);
      yield put(registryCreateGroup.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(registryCreateGroup.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSpecificGroup(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
        reset: any;
        identifier: any;
      };
    } = yield take(registrySpecificGiftingGroup.request.type);
    const { payloadApi, cb, reset, identifier } = payload;
    try {
      const response = yield call(
        callRequest,
        API_SPECIFIC_GROUP,
        {},
        {},
        `${payloadApi.id}/`
      );
      yield put(
        registrySpecificGiftingGroup.success({
          data: response?.data,
          reset,
          identifier,
          page: {
            totalRecords: response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registrySpecificGiftingGroup.failure({
          errorMessage: error.message,
          identifier,
        })
      );
    }
  }
}

function* watchFinalizeGroup(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
      };
    } = yield take(registryFinalizeGroup.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_FINILIZE_GROUP,
        {},
        {},
        `${payloadApi.id}/finalize/`
      );
      yield put(registryFinalizeGroup.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registryFinalizeGroup.failure({
          errorMessage: error.message,
        })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSuggestedGroupProducts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
        reset: any;
      };
    } = yield take(registrySuggestedGroupProducts.request.type);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(
        callRequest,
        API_SUGGESTED_GROUP,
        {},
        {},
        `${payloadApi.id}/gifitng_group_suggestions/`
      );
      yield put(
        registrySuggestedGroupProducts.success({
          data: response?.data,
          reset,
          page: {
            totalRecords: response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registrySuggestedGroupProducts.failure({
          errorMessage: error.message,
        })
      );
    }
  }
}

function* watchAddGroupProducts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; identifier: any } } =
      yield take(registryAddGroupProducts.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_ADD_GROUP, payloadApi);
      yield put(registryAddGroupProducts.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registryAddGroupProducts.failure({ errorMessage: error.message })
      );
      // Util.showCustomMessage(error.message);
    }
  }
}

function* watchSaveGroupDraft(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; id: any } } =
      yield take(registrySaveGroupDraft.request.type);
    const { payloadApi, cb, id } = payload;
    try {
      const response = yield call(
        callRequest,
        API_SAVE_GROUP_DRAFT,
        payloadApi,
        {},
        `${id}/update_members/`
      );
      yield put(registrySaveGroupDraft.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registrySaveGroupDraft.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchDeleteGroup(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; id: any } } =
      yield take(registryDeleteGroup.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_GROUP,
        {},
        {},
        `${payloadApi.id}/`
      );
      yield put(registryDeleteGroup.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(registryDeleteGroup.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchEditGroup(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; id: any } } =
      yield take(registryEditGroup.request.type);
    const { payloadApi, cb, id } = payload;
    try {
      const response = yield call(
        callRequest,
        API_EDIT_GROUP,
        payloadApi,
        {},
        `${id}/`
      );
      yield put(registryEditGroup.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(registryEditGroup.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchMarkPaid(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; id: any } } =
      yield take(registryMarkPaid.request.type);
    const { payloadApi, cb, id } = payload;
    try {
      const response = yield call(
        callRequest,
        API_MARK_PAID,
        {},
        {},
        `${payloadApi.id}/mark_paid/`
      );
      yield put(registryMarkPaid.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(registryMarkPaid.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchRemoveProduct(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; id: any } } =
      yield take(registryRemoveGroupProducts.request.type);
    const { payloadApi, cb, id } = payload;
    try {
      const response = yield call(
        callRequest,
        API_REMOVE_GROUP_PRODUCTS,
        payloadApi
      );
      yield put(registryRemoveGroupProducts.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registryRemoveGroupProducts.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchRegistryProductPriority(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; key: any; id: String };
    } = yield take(registryProductsPriority.request);
    const { payloadApi, cb, key, id } = payload;
    try {
      const response = yield call(
        callRequest,
        API_REGISTRY_PRODUCT_PRIORITY,
        payloadApi
      );
      yield put(
        registryProductsPriority.success({ data: payloadApi, key: key, id: id })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        registryProductsPriority.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

export default function* root(): Generator<any, void, any> {
  yield fork(watchMyGifts);
  yield fork(watchPurchaseGifts);
  yield fork(watchStarredGifts);
  yield fork(watchGiftingGroups);
  yield fork(watchJuniorGifts);
  yield takeEvery(
    registrySpecificJuniorGifts.request,
    watchSpecificJuniorGifts
  );
  yield fork(watchRemoveGifts);
  yield fork(watchSavedGifts);
  yield fork(watchCreateGroup);
  yield fork(watchSpecificGroup);
  yield fork(watchFinalizeGroup);
  yield fork(watchSuggestedGroupProducts);
  yield fork(watchAddGroupProducts);
  yield fork(watchSaveGroupDraft);
  yield fork(watchDeleteGroup);
  yield fork(watchEditGroup);
  yield fork(watchMarkPaid);
  yield fork(watchRemoveProduct);
  yield fork(watchRegistryProductPriority);
}
