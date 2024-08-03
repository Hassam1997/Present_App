/** @format */

import { take, put, fork, call } from "redux-saga/effects";
import {
  API_CHANGE_PASSWORD,
  API_CONTENT_PAGES,
  API_DEACTIVATE_ACCOUNT,
  API_FORGOT_PASSOWRD,
  API_GET_JUNIORS,
  API_GET_PROFILE,
  API_GET_REWARD,
  API_JUNIOR_PASSWORD_CONSENT,
  API_JUNIOR_SIGNUP,
  API_LOGOUT,
  API_RESEND_OTP,
  API_RESET_PASSOWRD,
  API_SIGNIN,
  API_SIGNUP,
  API_SOCIAL_LOGIN,
  API_UPDATE_PROFILE,
  API_VERIFY_OTP,
  API_VERIFY_PASSWORD,
  UPLOAD_MEDIA,
} from "../../config/WebService";
import { NotificationUtil, Util } from "../../utils";
import { callRequest } from "../../utils/ApiSauce";
import {
  authChangePassword,
  authContentPages,
  authDeactivate,
  authForgotPassword,
  authGetJuniors,
  authGetProfile,
  authGetReward,
  authJuniorPasswordConsent,
  authJuniorSignUp,
  authLogout,
  authResendOTP,
  authResetPassword,
  authSignIn,
  authSignUp,
  authSocialLogin,
  authUpdateProfile,
  authVerifyOTP,
  authVerifyPassword,
} from ".";

function* watchSignUp(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; file?: any } } =
      yield take(authSignUp.request.type);
    const { payloadApi, cb, file } = payload;
    try {
      if (Util.isNotEmpty(file)) {
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
      const response = yield call(callRequest, API_SIGNUP, payloadApi);
      yield put(authSignUp.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authSignUp.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchVerifyOTP(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(authVerifyOTP.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_VERIFY_OTP, payloadApi);
      yield put(
        authVerifyOTP.success({
          data: response?.data?.user,
          token: response?.data?.token,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authVerifyOTP.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchResendOTP(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(authResendOTP.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_RESEND_OTP, payloadApi);
      yield put(authResendOTP.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authResendOTP.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchUpdateProfile(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; file: any } } =
      yield take(authUpdateProfile.request);
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
        const response = yield call(
          callRequest,
          API_UPDATE_PROFILE,
          payloadApi
        );
        yield put(authUpdateProfile.success({ data: response?.data }));
        cb?.(response?.data);
      } else {
        const response = yield call(
          callRequest,
          API_UPDATE_PROFILE,
          payloadApi
        );
        yield put(authUpdateProfile.success({ data: response?.data }));
        cb?.(response?.data);
      }
    } catch (error: any) {
      yield put(authUpdateProfile.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSignIn(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(authSignIn.request.type);
    const { payloadApi, cb } = payload;
    // payloadApi.device_token = yield NotificationUtil.getTokenPromise()
    try {
      const response = yield call(callRequest, API_SIGNIN, payloadApi);
      yield put(
        authSignIn.success({
          data: response?.data?.user,
          token: response?.data?.token,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authSignIn.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchSocialLogin(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(authSocialLogin.request);
    const { payloadApi, cb } = payload;
    // payloadApi.device_token = yield NotificationUtil.getTokenPromise()
    try {
      const response = yield call(callRequest, API_SOCIAL_LOGIN, payloadApi);
      yield put(
        authSocialLogin.success({
          data: response?.data?.user,
          token: response?.data?.token,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authSocialLogin.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchJuniorPasswordConsent(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(authJuniorPasswordConsent.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_JUNIOR_PASSWORD_CONSENT,
        payloadApi
      );
      yield put(authJuniorPasswordConsent.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(
        authJuniorPasswordConsent.failure({ errorMessage: error.message })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchForgotPassword(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(authForgotPassword.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_FORGOT_PASSOWRD, payloadApi);
      yield put(authForgotPassword.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authForgotPassword.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchResetPassword(): Generator<any, void, any> {
  while (true) {
    const { payload }: { payload: { payloadApi: any; cb: CallbackFunction } } =
      yield take(authResetPassword.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_RESET_PASSOWRD, payloadApi);
      yield put(authResetPassword.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authResetPassword.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchJuniorSignUp(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; file?: any } } =
      yield take(authJuniorSignUp.request.type);
    const { payloadApi, cb, file } = payload;
    try {
      if (Util.isNotEmpty(file)) {
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
      const response = yield call(callRequest, API_JUNIOR_SIGNUP, payloadApi);
      yield put(authJuniorSignUp.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authJuniorSignUp.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchGetJuniors(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; reset: any } } =
      yield take(authGetJuniors.request.type);
    const { payloadApi, cb, reset } = payload;
    const query = Util.objectToQueryString(payloadApi);
    try {
      const response = yield call(
        callRequest,
        API_GET_JUNIORS,
        {},
        {},
        `?${query}`
      );
      yield put(
        authGetJuniors.success({
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
      yield put(authGetJuniors.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchContentPages(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: { payloadApi: any; cb: CallbackFunction; parameter: string };
    } = yield take(authContentPages.request.type);
    const { payloadApi, cb, parameter } = payload;
    try {
      const response = yield call(
        callRequest,
        API_CONTENT_PAGES,
        {},
        {},
        parameter
      );
      yield put(
        authContentPages.success({
          data: response?.data,
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authContentPages.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchGetProfile(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: { payload: { payloadApi: any; cb: CallbackFunction; file?: any } } =
      yield take(authGetProfile.request);
    const { payloadApi, cb, file } = payload;
    try {
      const response = yield call(callRequest, API_GET_PROFILE, payloadApi);
      yield put(authGetProfile.success({ data: response.data }));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authGetProfile.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchGetReward(): Generator<any, void, any> {
  while (true) {
    const {
      payload,
    }: {
      payload: {
        payloadApi: any;
        cb: CallbackFunction;
        identifier?: any;
        reset: boolean;
      };
    } = yield take(authGetReward.request);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(callRequest, API_GET_REWARD, payloadApi);
      yield put(
        authGetReward.success({
          data: response.data,
          identifier,
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
        authGetReward.failure({ errorMessage: error.message, identifier })
      );
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchLogout(): Generator<any, void, any> {
  while (true) {
    const { payload } = yield take(authLogout.request);
    const { cb } = payload;
    try {
      const response = yield call(callRequest, API_LOGOUT, {}, {});
      yield put(authLogout.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authLogout.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchChangePassword(): Generator<any, void, any> {
  while (true) {
    const { payload } = yield take(authChangePassword.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_CHANGE_PASSWORD, payloadApi);
      yield put(authChangePassword.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authChangePassword.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchVerifyPassword(): Generator<any, void, any> {
  while (true) {
    const { payload } = yield take(authVerifyPassword.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_VERIFY_PASSWORD, payloadApi);
      yield put(
        authVerifyPassword.success({
          data: response?.data?.user_obj ?? {},
          token: response?.data?.token ?? {},
        })
      );
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authVerifyPassword.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

function* watchDeactivateAccount() {
  while (true) {
    const { payload } = yield take(authDeactivate.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_DEACTIVATE_ACCOUNT,
        payloadApi
      );
      yield put(authDeactivate.success({}));
      cb?.(response?.data);
    } catch (error: any) {
      yield put(authDeactivate.failure({ errorMessage: error.message }));
      Util.showCustomMessage(error.message);
    }
  }
}

export default function* root(): Generator<any, void, any> {
  yield fork(watchSignUp);
  yield fork(watchVerifyOTP);
  yield fork(watchResendOTP);
  yield fork(watchUpdateProfile);
  yield fork(watchSignIn);
  yield fork(watchSocialLogin);
  yield fork(watchJuniorPasswordConsent);
  yield fork(watchForgotPassword);
  yield fork(watchResetPassword);
  yield fork(watchJuniorSignUp);
  yield fork(watchGetJuniors);
  yield fork(watchContentPages);
  yield fork(watchGetProfile);
  yield fork(watchGetReward);
  yield fork(watchLogout);
  yield fork(watchVerifyPassword);
  yield fork(watchChangePassword);
  yield fork(watchDeactivateAccount);
  // yield fork(watchNotificationToggle);
}
