/** @format */

import { take, put, fork, call } from "redux-saga/effects"
import { callRequest } from "../../utils/ApiSauce"
import { notificationListing } from "."
import { API_GET_NOTIFICATIONS } from "../../config/WebService"

function* watchNotifications(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(notificationListing.request.type)
    const { payloadApi, cb, reset } = payload
    try {
      const response = yield call(
        callRequest,
        API_GET_NOTIFICATIONS,
        payloadApi
      )
      yield put(
        notificationListing.success({
          data: response?.data,
          reset,
          page: {
            totalRecords: response?.meta?.total || 0,
            nextPage: payloadApi.page,
          },
        })
      )
      cb?.(response?.data)
    } catch (error: any) {
      yield put(notificationListing.failure({ errorMessage: error.message }))
    }
  }
}

export default function* root(): Generator<any, void, any> {
  yield fork(watchNotifications)
}
