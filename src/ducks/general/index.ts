/** @format */

import { createReducer } from "@reduxjs/toolkit"
import { makeAction } from "../ActionTypes"

// Action creators
export const authOnBoarding = makeAction("AUTH_ONBOARDING")
// Note: You can access other action creators like request, failure, reset as well.

// Initial state
interface GeneralState {
  isOnBoarding: boolean
}

const initialState: GeneralState = {
  isOnBoarding: false,
}

// Reducer
export default createReducer(initialState, (builder) => {
  builder.addCase(authOnBoarding, (state, action) => {
    const { data }: any = action.payload
    state.isOnBoarding = data
  })
})

// Selector
export const getOnBoard = (state: { general: GeneralState }) =>
  state?.general?.isOnBoarding ?? false
