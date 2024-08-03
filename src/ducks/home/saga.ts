/** @format */

import { take, put, fork, call } from "redux-saga/effects";
import { callRequest } from "../../utils/ApiSauce";
import {
  homeAllProducts,
  homeCategories,
  homeDeleteSearchHistory,
  homeGetSpecificProduct,
  homeGiftProducts,
  homeGiftRecommendation,
  homeGiftRelevancy,
  homeGlobalSearch,
  homePresentSelected,
  homeProductSaveForContacts,
  homeProductSaveForEvents,
  homeProductSaveForLater,
  homeSentProductToParent,
  homeSentProductToSanta,
  homeTopProducts,
  homeUpcomingEvents,
} from ".";
import {
  API_ALL_PRODUCTS,
  API_CATEGORIES,
  API_DELETE_SEARCH_HISTORY,
  API_GET_PRODUCT_DETAIL,
  API_GIFT_PRODUCTS,
  API_GIFT_RECOMMENDATION_PRODUCTS,
  API_GIFT_RELEVANCY,
  API_GLOBAL_SEARCH,
  API_PRESENT_SELECTED,
  API_SAVE_EVENTS,
  API_SAVE_LATER,
  API_SAVE_PRODUCTS_CONTACTS,
  API_SENT_PRODUCT_TO_PARENT,
  API_SENT_PRODUCT_TO_SANTA,
  API_TOP_PRODUCTS,
  API_UPCOMING_EVENTS,
} from "../../config/WebService";
import { Util } from "../../utils";

function* watchUpcomingEvents(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(homeUpcomingEvents.request.type);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(callRequest, API_UPCOMING_EVENTS, payloadApi);
      yield put(
        homeUpcomingEvents.success({
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
      yield put(homeUpcomingEvents.failure({ errorMessage: error.message }));
    }
  }
}

function* watchPresentSelected(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(homePresentSelected.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_PRESENT_SELECTED,
        {},
        {},
        `?${query}`
      );
      yield put(
        homePresentSelected.success({
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
      yield put(homePresentSelected.failure({ errorMessage: error.message }));
    }
  }
}

function* watchCategories(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(homeCategories.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_CATEGORIES,
        {},
        {},
        `?${query}`
      );
      yield put(
        homeCategories.success({
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
      yield put(homeCategories.failure({ errorMessage: error.message }));
    }
  }
}

function* watchTopProducts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(homeTopProducts.request.type);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(callRequest, API_TOP_PRODUCTS, payloadApi);
      yield put(
        homeTopProducts.success({
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
      yield put(homeTopProducts.failure({ errorMessage: error.message }));
    }
  }
}

function* watchGiftProducts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(homeGiftProducts.request.type);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(callRequest, API_GIFT_PRODUCTS, {}, {});
      yield put(
        homeGiftProducts.success({
          eventObj: {
            event_date: response?.event_date ?? "",
            event_id: response?.event_id ?? "",
          },
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
      yield put(homeGiftProducts.failure({ errorMessage: error.message }));
    }
  }
}

function* watchAllProducts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(homeAllProducts.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_ALL_PRODUCTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        homeAllProducts.success({
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
      yield put(homeAllProducts.failure({ errorMessage: error.message }));
    }
  }
}

function* watchGiftRecommendationProducts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(homeGiftRecommendation.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GIFT_RECOMMENDATION_PRODUCTS,
        {},
        {},
        `?${query}`
      );
      yield put(
        homeGiftRecommendation.success({
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
        homeGiftRecommendation.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchEventRelevancy(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(homeGiftRelevancy.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_GIFT_RELEVANCY, payloadApi);
      yield put(
        homeGiftRelevancy.success({
          data: {
            status: payloadApi?.status,
            id: payloadApi?.event_id,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(homeGiftRelevancy.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSaveEvents(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; updateKey?: string };
    } = yield take(homeProductSaveForEvents.request.type);
    const { payloadApi, cb, updateKey } = payload;
    try {
      const response = yield call(callRequest, API_SAVE_EVENTS, payloadApi);
      yield put(
        homeProductSaveForEvents.success({
          data: payloadApi,
          updateKey: updateKey,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        homeProductSaveForEvents.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSaveLater(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; updateKey?: string };
    } = yield take(homeProductSaveForLater.request.type);
    const { payloadApi, cb, updateKey } = payload;
    try {
      const response = yield call(callRequest, API_SAVE_LATER, payloadApi);
      yield put(
        homeProductSaveForLater.success({
          data: payloadApi,
          updateKey: updateKey,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        homeProductSaveForLater.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSaveContacts(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; updateKey?: string };
    } = yield take(homeProductSaveForContacts.request);
    const { payloadApi, cb, updateKey } = payload;
    try {
      const response = yield call(
        callRequest,
        API_SAVE_PRODUCTS_CONTACTS,
        payloadApi
      );
      yield put(
        homeProductSaveForContacts.success({
          data: payloadApi,
          updateKey: updateKey,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        homeProductSaveForContacts.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchGlobalSearch(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(homeGlobalSearch.request);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GLOBAL_SEARCH,
        {},
        {},
        `?${query}`
      );
      yield put(
        homeGlobalSearch.success({
          history: response?.data?.history,
          products: response?.data?.products,
          events: response?.data?.events,
          reset,
          page: {
            totalRecords: response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(homeGlobalSearch.failure({ errorMessage: error.message }));
    }
  }
}

function* watchDeleteSearchHistory(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(homeDeleteSearchHistory.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_SEARCH_HISTORY,
        {},
        {},
        `${payloadApi.id}/`
      );
      yield put(
        homeDeleteSearchHistory.success({
          data: payloadApi,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        homeDeleteSearchHistory.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchGetProductDetail(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; identifier?: any };
    } = yield take(homeGetSpecificProduct.request);
    const { payloadApi, cb, identifier } = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_PRODUCT_DETAIL,
        payloadApi
      );
      yield put(
        homeGetSpecificProduct.success({
          data: response?.data,
          identifier,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        homeGetSpecificProduct.failure({
          errorMessage: error.message,
          identifier,
        })
      );
    }
  }
}

function* watchSentProductToSanta(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction };
    } = yield take(homeSentProductToSanta.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_SENT_PRODUCT_TO_SANTA,
        payloadApi
      );
      yield put(
        homeSentProductToSanta.success({
          data: response?.data,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        homeSentProductToSanta.failure({
          errorMessage: error.message,
        })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSentProductToParent(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction };
    } = yield take(homeSentProductToParent.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_SENT_PRODUCT_TO_PARENT,
        payloadApi
      );
      yield put(
        homeSentProductToParent.success({
          data: response?.data,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        homeSentProductToParent.failure({
          errorMessage: error.message,
        })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

export default function* root(): Generator<any, void, any> {
  yield fork(watchUpcomingEvents);
  yield fork(watchPresentSelected);
  yield fork(watchCategories);
  yield fork(watchTopProducts);
  yield fork(watchGiftProducts);
  yield fork(watchAllProducts);
  yield fork(watchEventRelevancy);
  yield fork(watchSaveEvents);
  yield fork(watchSaveLater);
  yield fork(watchSaveContacts);
  yield fork(watchGlobalSearch);
  yield fork(watchDeleteSearchHistory);
  yield fork(watchGetProductDetail);
  yield fork(watchSentProductToSanta);
  yield fork(watchSentProductToParent);
  yield fork(watchGiftRecommendationProducts);
}
