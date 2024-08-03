/** @format */

import { createReducer } from "@reduxjs/toolkit"
import { makeRequesActions } from "../ActionTypes"
import { Util } from "../../utils"

// Action creators
export const notificationListing = makeRequesActions("NOTIFICATION_LIST")
// Note: You can access other action creators like request, failure, reset as well.

// Initial state
interface NotificationState {
  notifications: Array<any>
}

const initialState: NotificationState = {
  notifications: [],
}

// Reducer
export default createReducer(initialState, (builder) => {
  builder.addCase(notificationListing.success, (state, action) => {
    Util.concatDataArray(state, action, "notifications")
  })
})

// Selector
export const getNotifications = (state: { notification: NotificationState }) =>
  state?.notification?.notifications ?? []
