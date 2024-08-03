/** @format */

import { createAction } from "@reduxjs/toolkit"

// Action types
const REQUEST = "REQUEST"
const SUCCESS = "SUCCESS"
const FAILURE = "FAILURE"
const RESET = "RESET"

type RequestActions = {
  request: any // Define the types for your actions here
  success: any
  failure: any
  reset: any
  type: any
}

// Action creators
const makeRequesActions = (base: string): RequestActions => {
  return {
    request: createAction(`${base}_${REQUEST}`),
    success: createAction(`${base}_${SUCCESS}`),
    failure: createAction(`${base}_${FAILURE}`),
    reset: createAction(`${base}_${RESET}`),
    type: base,
  }
}

const makeAction = (base: string) => {
  const action = createAction(base)
  return action
}

export { REQUEST, SUCCESS, FAILURE, makeRequesActions, makeAction }
