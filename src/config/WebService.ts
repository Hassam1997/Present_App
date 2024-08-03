/** @format */

// BASE URL
export const BASE_URL: string =
  "https://gift-registry-backend.tekstagearea.com";
export const BASE_URL_UPLOAD_MEDIA: string =
  "https://s3-presigned-svc.tekstagearea.com";
export const X_API_TOKEN: string = "X-Access-Token";

// REQUEST TYPES
export const REQUEST_TYPE = {
  GET: "get" as const,
  POST: "post" as const,
  DELETE: "delete" as const,
  PUT: "put" as const,
  PATCH: "patch" as const,
} as const;

// CONSTANTS
export const LIMIT: number = 20;
export const API_TIMEOUT: number = 30000;
export const API: string = "/api/v1/";
export const API_LOG: boolean = true;
export const S3_ACCESS_TOKEN: string = "62XfWGbfGlZ1SxgNsuhQ";

// API'S Auth
export const UPLOAD_MEDIA: UrlInfo = {
  route: `${API}files`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
  meta_data: true,
};

export const API_SIGNUP: UrlInfo = {
  route: `${API}auth/signup/`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_VERIFY_OTP: UrlInfo = {
  route: `${API}auth/otp/verify/`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_RESEND_OTP: UrlInfo = {
  route: `${API}auth/otp/resend/`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_PROFILE: UrlInfo = {
  route: `${API}auth/signup/update_me/`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_SIGNIN: UrlInfo = {
  route: `${API}auth/login/`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SOCIAL_LOGIN: UrlInfo = {
  route: `${API}auth/social-login/`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_GET_PROFILE: UrlInfo = {
  route: `${API}auth/signup/me/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_JUNIOR_PASSWORD_CONSENT: UrlInfo = {
  route: `${API}auth/verify/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_FORGOT_PASSOWRD: UrlInfo = {
  route: `${API}auth/forget-password/`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_RESET_PASSOWRD: UrlInfo = {
  route: `${API}auth/reset-password/`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_JUNIOR_SIGNUP: UrlInfo = {
  route: `${API}auth/juniors/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_JUNIORS: UrlInfo = {
  route: `${API}auth/juniors`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_VERIFY_PASSWORD: UrlInfo = {
  route: `${API}auth/verify/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_REWARD: UrlInfo = {
  route: `${API}rewards/list/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//home
export const API_CONTENT_PAGES: UrlInfo = {
  route: `${API}home/pages/`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_DEACTIVATE_LIST: UrlInfo = {
  route: `${API}deactivateReasons/reasons`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_DEACTIVATE_ACCOUNT: UrlInfo = {
  route: `${API}auth/signup/delete_me/`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_LOGOUT: UrlInfo = {
  route: `${API}auth/logout/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_NOTIFICATION_TOGGLE: UrlInfo = {
  route: `${API}users/pushNotification`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_CHANGE_PASSWORD: UrlInfo = {
  route: `${API}auth/change-password/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// Home
export const API_UPCOMING_EVENTS: UrlInfo = {
  route: `${API}events/event/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_PRESENT_SELECTED: UrlInfo = {
  route: `${API}products/all/present_selected`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CATEGORIES: UrlInfo = {
  route: `${API}categories/list`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_TOP_PRODUCTS: UrlInfo = {
  route: `${API}products/all/top/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GIFT_PRODUCTS: UrlInfo = {
  route: `${API}products/all/upcoming_gift_suggestions/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ALL_PRODUCTS: UrlInfo = {
  route: `${API}products/all`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GIFT_RECOMMENDATION_PRODUCTS: UrlInfo = {
  route: `${API}products/all/manual_gift_suggestion`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GIFT_RELEVANCY: UrlInfo = {
  route: `${API}events/mark/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SAVE_EVENTS: UrlInfo = {
  route: `${API}products/event/save/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SAVE_LATER: UrlInfo = {
  route: `${API}products/later/save/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SAVE_PRODUCTS_CONTACTS: UrlInfo = {
  route: `${API}products/contact/save/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GLOBAL_SEARCH: UrlInfo = {
  route: `${API}products/search`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_DELETE_SEARCH_HISTORY: UrlInfo = {
  route: `${API}products/history`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_GET_PRODUCT_DETAIL: UrlInfo = {
  route: `${API}products/specific/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SENT_PRODUCT_TO_SANTA: UrlInfo = {
  route: `${API}junior/save/sent_to_santa/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SENT_PRODUCT_TO_PARENT: UrlInfo = {
  route: `${API}junior/save/sent_to_parent/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_REGISTRY_PRODUCT_PRIORITY: UrlInfo = {
  route: `${API}junior/product/starred_unstarred/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// Notification Listing
export const API_GET_NOTIFICATIONS: UrlInfo = {
  route: `${API}notifications/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_NOTIFICATIONS_ALL_READ: UrlInfo = {
  route: `${API}Notifications/markAllRead`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_NOTIFICATIONS_AS_READ: UrlInfo = {
  route: `${API}Notifications/markAsRead`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_NOTIFICATIONS_UNREAD_COUNT: UrlInfo = {
  route: `${API}Notifications/getBatchCount`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

// Events
export const API_CREATE_EVENTS = {
  route: `${API}events/event/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_EVENTS = {
  route: `${API}events/event`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_SPECIFIC_EVENTS = {
  route: `${API}events/event`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_EDIT_EVENTS = {
  route: `${API}events/event`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_DELETE_EVENT_PRODUCTS = {
  route: `${API}products/event/remove/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_EVENT = {
  route: `${API}events/event`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

// Contacts
export const API_SAVE_CONTACTS = {
  route: `${API}contact/contacts/save_mobile_contacts/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_CONTACTS = {
  route: `${API}contact/contacts`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_GROUPS = {
  route: `${API}contact/groups`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_CONTACT_DETAIL = {
  route: `${API}contact/contacts`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_GROUP_DETAIL = {
  route: `${API}contact/groups`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_CONTACTS = {
  route: `${API}contact/contacts/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_INTERESTS = {
  route: `${API}other/interest`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_RELATIONS = {
  route: `${API}other/relation/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_EDIT_CONTACTS = {
  route: `${API}contact/contacts`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_ADD_TO_GROUPS = {
  route: `${API}contact/contacts/add_to_groups/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_CONTACT = {
  route: `${API}contact/contacts`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_EDIT_GROUP_DETAIL = {
  route: `${API}contact/groups`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const API_CREATE_GROUP_CONTACT = {
  route: `${API}contact/groups/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_GROUP_CONTACT = {
  route: `${API}contact/groups`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_ADD_GROUP_LINK = {
  route: `${API}gifting/group/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//My Registry
export const API_GET_MY_GIFTS = {
  route: `${API}gifting/mygifts`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_PURCHASE_GIFTS = {
  route: `${API}gifting/product`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_STARRED_GIFTS = {
  route: `${API}products/starred/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GIFTING_GROUP = {
  route: `${API}gifting/group`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_JUNIOR_GIFT = {
  route: `${API}auth/juniors`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SPECIFIC_JUNIOR_GIFT = {
  route: `${API}junior/get`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SPECIFIC_SENTA_JUNIOR_GIFT = {
  route: `${API}junior/registry`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_REMOVE_GIFT = {
  route: `${API}junior/remove/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SAVED_GIFT = {
  route: `${API}products/saved_for_later/`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CREATE_GROUP = {
  route: `${API}gifting/group/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SPECIFIC_GROUP = {
  route: `${API}gifting/group`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_FINILIZE_GROUP = {
  route: `${API}gifting/group`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SUGGESTED_GROUP = {
  route: `${API}products/all`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_GROUP = {
  route: `${API}gifting/group/add_product/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SAVE_GROUP_DRAFT = {
  route: `${API}gifting/group`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_GROUP = {
  route: `${API}gifting/group`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_EDIT_GROUP = {
  route: `${API}gifting/group`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const API_MARK_PAID = {
  route: `${API}gifting/member`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_REMOVE_GROUP_PRODUCTS = {
  route: `${API}gifting/group/remove_product/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
