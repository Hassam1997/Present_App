/** @format */

import { take, put, fork, call } from "redux-saga/effects";
import { Util } from "../../utils";
import { callRequest } from "../../utils/ApiSauce";
import {
  eventCreateEvents,
  eventDeleteEvent,
  eventDeleteProduct,
  eventEditDetail,
  eventGetAdmin,
  eventGetAll,
  eventGetCustom,
  eventGetGeneral,
  eventGetSpecific,
} from ".";
import {
  API_CREATE_EVENTS,
  API_DELETE_EVENT,
  API_DELETE_EVENT_PRODUCTS,
  API_EDIT_EVENTS,
  API_GET_EVENTS,
  API_GET_SPECIFIC_EVENTS,
} from "../../config/WebService";

function* watchCreateEvent(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(eventCreateEvents.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_CREATE_EVENTS, payloadApi);
      yield put(eventCreateEvents.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(eventCreateEvents.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchGetAllEventList(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(eventGetAll.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_EVENTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        eventGetAll.success({
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
      yield put(eventGetAll.failure({ errorMessage: error.message }));
    }
  }
}

function* watchGetGeneralEventList(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(eventGetGeneral.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_EVENTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        eventGetGeneral.success({
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
      yield put(eventGetGeneral.failure({ errorMessage: error.message }));
    }
  }
}

function* watchGetCustomEventList(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(eventGetCustom.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_EVENTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        eventGetCustom.success({
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
      yield put(eventGetCustom.failure({ errorMessage: error.message }));
    }
  }
}

function* watchGetAdminEventList(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(eventGetAdmin.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_EVENTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        eventGetAdmin.success({
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
      yield put(eventGetAdmin.failure({ errorMessage: error.message }));
    }
  }
}

function* watchGetSpecificEvent(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; identifier } } =
      yield take(eventGetSpecific.request.type);
    const { payloadApi, cb, identifier } = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_SPECIFIC_EVENTS,
        {},
        {},
        `${payloadApi.id}/`
      );
      yield put(
        eventGetSpecific.success({
          data: response?.data,
          identifier,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        eventGetSpecific.failure({ errorMessage: error.message, identifier })
      );
    }
  }
}

function* watchEditEvent(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
        eventId: number;
        identifier: any;
      };
    } = yield take(eventEditDetail.request.type);
    const { payloadApi, cb, eventId, identifier } = payload;
    try {
      const response = yield call(
        callRequest,
        API_EDIT_EVENTS,
        payloadApi,
        {},
        `${eventId}/`
      );
      yield put(
        eventEditDetail.success({ data: response?.data, eventId: eventId })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(eventEditDetail.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchDeleteEventProduct(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; arrayIndex: any } } =
      yield take(eventDeleteProduct.request.type);
    const { payloadApi, cb, arrayIndex } = payload;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_EVENT_PRODUCTS,
        payloadApi
      );
      yield put(
        eventDeleteProduct.success({
          data: response?.data,
          arrayIndex: arrayIndex,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        eventDeleteProduct.failure({ errorMessage: error.message, arrayIndex })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchDeleteEvent(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; arrayIndex: any } } =
      yield take(eventDeleteEvent.request.type);
    const { payloadApi, cb, arrayIndex } = payload;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_EVENT,
        {},
        {},
        `${payloadApi.id}/`
      );
      yield put(
        eventDeleteEvent.success({
          data: {
            id: payloadApi?.id,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        eventDeleteEvent.failure({ errorMessage: error.message, arrayIndex })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

export default function* root(): Generator<any, void, any> {
  yield fork(watchCreateEvent);
  yield fork(watchGetGeneralEventList);
  yield fork(watchGetCustomEventList);
  yield fork(watchGetAllEventList);
  yield fork(watchGetSpecificEvent);
  yield fork(watchEditEvent);
  yield fork(watchDeleteEventProduct);
  yield fork(watchGetAdminEventList);
  yield fork(watchDeleteEvent);
}
