/** @format */

import { createReducer } from "@reduxjs/toolkit";
import { makeRequesActions, makeAction } from "../ActionTypes";
import { Util } from "../../utils";

// Action creators
export const authProfileData = makeAction("AUTH_PROFILE_DATA");
export const authSignUp = makeRequesActions("AUTH_SIGN_UP");
export const authVerifyOTP = makeRequesActions("AUTH_VERIFY_OTP");
export const authResendOTP = makeRequesActions("AUTH_RESEND_OTP");
export const authUpdateProfile = makeRequesActions("AUTH_UPDATE_PROFILE");
export const authGetProfile = makeRequesActions("AUTH_GET_PROFILE");
export const authSignIn = makeRequesActions("AUTH_SIGN_IN");
export const authSocialLogin = makeRequesActions("AUTH_SOCIAL_LOGIN");
export const authJuniorPasswordConsent = makeRequesActions(
  "AUTH_JUNIOR_PASSWORD_CONSENT"
);
export const authSkipJuniorProfile = makeAction("AUTH_SKIP_JUNIOR_PROFILE");
export const authForgotPassword = makeRequesActions("AUTH_FORGOT_PASSWORD");
export const authResetPassword = makeRequesActions("AUTH_RESET_PASSWORD");
export const authVerifyPassword = makeRequesActions("AUTH_VERIFY_PASSWORD");
export const authJuniorSignUp = makeRequesActions("AUTH_JUNIOR_SIGN_UP");
export const authGetJuniors = makeRequesActions("AUTH_GET_JUNIORS");
export const authContentPages = makeRequesActions("AUTH_CONTENT_PAGES");
export const authLogout = makeRequesActions("AUTH_LOGOUT");
export const authGetReward = makeRequesActions("AUTH_GET_REWARD");
export const authChangePassword = makeRequesActions("AUTH_CHANGE_PASSWORD");
export const authDeactivate = makeRequesActions("AUTH_DELETE_ACCOUNT");

// Note: You can access other action creators like request, failure, reset as well.

// Initial state
interface AuthState {
  data: Record<string, any>;
  userData: Record<string, any>;
  token: string;
  isSkipJuniorProfile: boolean;
  juniorProfile: Array<any>;
  contentPages: Record<string, any>;
  isGuest: boolean;
}

const initialState: AuthState = {
  data: {},
  userData: {},
  token: "",
  isSkipJuniorProfile: false,
  juniorProfile: [],
  contentPages: {},
  isGuest: false,
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder.addCase(authProfileData, (state, action) => {
    const { data }: any = action.payload;
    state.data = data ?? {};
    if (Util.isEmpty(data)) {
      state.isGuest = false;
    } else {
      state.isGuest = true;
    }
  });
  builder.addCase(authVerifyOTP.success, (state, action) => {
    const { data, token }: any = action.payload;
    state.userData = data;
    state.token = token;
  });
  builder.addCase(authUpdateProfile.success, (state, action) => {
    const { data }: any = action.payload;
    state.userData = {
      ...state.userData,
      ...data,
    };
  });
  builder.addCase(authSignIn.success, (state, action) => {
    const { data, token }: any = action.payload;
    state.userData = data.is_verified ? data : {};
    state.token = token;
  });
  builder.addCase(authGetProfile.success, (state, action) => {
    const { data }: any = action.payload;
    // state.token = token
    state.userData = { ...state.userData, ...data };
  });

  builder.addCase(authSocialLogin.success, (state, action) => {
    const { data, token }: any = action.payload;
    state.userData = data;
    state.token = token;
  });
  builder.addCase(authSkipJuniorProfile, (state, action) => {
    const { data }: any = action.payload;
    state.isSkipJuniorProfile = data;
  });
  builder.addCase(authGetJuniors.success, (state, action) => {
    Util.concatDataArray(state, action, "juniorProfile");
  });
  builder.addCase(authContentPages.success, (state, action) => {
    const { data }: any = action.payload;
    state.contentPages = data;
  });
  builder.addCase(authVerifyPassword.success, (state, action) => {
    const { data, token }: any = action.payload;
    state.token = token;
  });
  builder.addCase(authGetReward.success, (state, action) => {
    const { identifier }: any = action.payload;
    Util.concatDataArray(state, action, identifier);
  });
  builder.addCase(authLogout.success, (state, action) => {
    // state = initialState
    state.data = {};
    state.userData = {};
    state.token = "";
    state.isSkipJuniorProfile = false;
    state.juniorProfile = [];
    state.contentPages = {};
  });
  builder.addCase(authChangePassword.success, (state, action) => {
    const { data }: any = action.payload;
    state.token = data.token;
  });
});

// Selector
export const getUserData = (state: { auth: AuthState }) =>
  state?.auth?.userData ?? {};
export const getUserToken = (state: { auth: AuthState }) =>
  state?.auth?.token ?? "";
export const getProfileData = (state: { auth: AuthState }) =>
  state?.auth?.data ?? {};
export const getJuniorProfile = (state: { auth: AuthState }) =>
  state?.auth?.juniorProfile ?? [];
export const getContentPages = (state: { auth: AuthState }) =>
  state?.auth?.contentPages ?? {};
export const getIsGuestUser = (state: { auth: AuthState }) =>
  state?.auth?.isGuest ?? false;
export const getNotification = (state: { auth: AuthState }) =>
  state?.auth?.userData?.notification_enabled ?? false;
export const getIdentifierListData =
  (identifier: any) => (state: { auth: AuthState }) =>
    state?.auth?.[identifier] ?? [];
