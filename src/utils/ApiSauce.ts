/** @format */

import { create, ApiResponse } from "apisauce"

import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  REQUEST_TYPE,
  BASE_URL_UPLOAD_MEDIA,
  S3_ACCESS_TOKEN,
  X_API_TOKEN,
} from "../config/WebService"

import { Util, DataHandler, NavigationService } from "."
import { authLogout, getUserToken } from "../ducks/auth"

const main_api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
})

const api_media = create({
  baseURL: BASE_URL_UPLOAD_MEDIA,
  timeout: API_TIMEOUT,
})

let api_media_upload: any = undefined

async function callRequest<T>(
  url: UrlInfo,
  payload: any,
  headers: Record<string, string> = {},
  parameter = ""
): Promise<any> {
  // get attributes from url

  const { type, access_token_required, meta_data, image_upload } = url
  if (image_upload) {
    api_media_upload = create({
      baseURL: image_upload,
      timeout: API_TIMEOUT,
    })
  }
  // set X-API-TOKEN
  if (access_token_required && meta_data) {
    headers[X_API_TOKEN] = S3_ACCESS_TOKEN
    /*  const storeRef = DataHandler.getStore().getState();
    headers[X_API_TOKEN] = token; */
  }

  if (access_token_required && !image_upload) {
    const token = getUserToken(DataHandler.getStore().getState())
    headers.Authorization = `Token ${token}`
  }

  const route =
    parameter && parameter !== "" ? url.route + "/" + parameter : url.route

  if (image_upload) {
    headers["Content-Type"] = "multipart/form-data"
  } else {
    headers["Content-Type"] = "application/json"
  }

  // init header object
  const headerObject = { headers }

  // init responseoc
  let response: ApiResponse<any>

  const api = image_upload ? api_media_upload : meta_data ? api_media : main_api

  // on type send request
  switch (type) {
    case REQUEST_TYPE.GET:
      response = await api.get(route, payload, headerObject)
      break
    case REQUEST_TYPE.POST:
      response = await api.post(route, payload, headerObject)
      break
    case REQUEST_TYPE.DELETE:
      response = await api.delete(route, {}, { data: payload, ...headerObject })
      //response = await api.delete(route, payload, headerObject);
      break
    case REQUEST_TYPE.PUT:
      response = await api.put(route, payload, headerObject)
      break
    case REQUEST_TYPE.PATCH:
      response = await api.patch(route, payload, headerObject)
      break
    default:
      response = await api.get(route, payload, headerObject)
  }

  // log web service response
  if (__DEV__ && API_LOG) {
    console.log("========== URL ========")
    console.log("url", url)
    console.log("========== Response ========")
    console.log("response", response)
    console.log("========== Payload ========")
    console.log("payload", payload)
    console.log("========== Headers ========")
    console.log("headers", headers)
    console.log("========== Route ========")
    console.log("route", route)
  }

  return handleResponse<T>(response, headers)
}

function handleResponse<T>(
  response: ApiResponse<any>,
  headers: Record<string, string>
): Promise<T> {
  return new Promise((resolve, reject) => {
    console.log("====== response.status ======")
    console.log(response.status)
    // network error  internet not working
    const isNetWorkError: boolean = response.problem === "NETWORK_ERROR"
    // network error  internet not working
    const isClientError: boolean = response.problem === "CLIENT_ERROR"
    // kick user from server
    const status: number = response?.status ?? 500
    const isKickUser: boolean = status === 401
    // if response is valid
    const isResponseValid: boolean = Util.successStatusCode(response?.status)
    // response?.status === 200 ? true : response?.status === 204 ? true : false
    //response.ok && Util.isNotEmpty(response.data) ? true : false;
    console.log(isResponseValid, "isResponseValid")

    if (isResponseValid) {
      resolve(response.data)
    } else if (isNetWorkError) {
      if (DataHandler.getIsInternetConnected()) {
        reject({
          message:
            "We are unable to connect to our server, please try again later.",
          statusCode: status,
        })
      } else {
        reject({
          message:
            "No internet connection. Make sure Wi-Fi or cellular data is turned on, then try again.",
          statusCode: status,
        })
      }
    } else if (isKickUser) {
      Util.showCustomMessage(
        "Your session has been expired! You are now a guest",
        "danger",
        10000
      )
      // reject({
      //   message:
      //     response.data &&
      //     response.data.message &&
      //     typeof response.data.message === "string"
      //       ? response.data.message ??
      //         "We are unable to connect to our server, please try again later."
      //       : "We are unable to connect to our server, please try again later.",
      //   statusCode: status,
      // })
      DataHandler.getStore().dispatch(authLogout.success({}))
      NavigationService.reset("GetStarted")
    } else if (isClientError) {
      reject({
        message:
          response.data &&
          response.data.message &&
          typeof response.data.message === "string"
            ? response.data.message ??
              "We are unable to connect to our server, please try again later."
            : "We are unable to connect to our server, please try again later.",
        statusCode: status,
      })
    } else {
      reject({
        message:
          response.data.message ??
          "We are unable to connect to our server, please try again later.",
        statusCode: status,
      })
    }
  })
}

export { callRequest }
