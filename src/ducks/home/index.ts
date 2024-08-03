/** @format */

import { createReducer } from "@reduxjs/toolkit";
import { makeRequesActions, makeAction } from "../ActionTypes";
import { Util } from "../../utils";
import { authLogout } from "../auth";

// Action creators
export const homeUpcomingEvents = makeRequesActions("HOME_UPCOMING_EVENTS");
export const homePresentSelected = makeRequesActions("HOME_PRESENT_SELECTED");
export const homeCategories = makeRequesActions("HOME_CATEGORIES");
export const homeTopProducts = makeRequesActions("HOME_TOP_PRODUCTS");
export const homeGiftProducts = makeRequesActions("HOME_GIFTS_PRODUCTS");
export const homeAllProducts = makeRequesActions("HOME_ALL_PRODUCTS");
export const homeGiftRecommendation = makeRequesActions(
  "HOME_GIFT_RECOMMENDATION"
);
export const homeGiftRelevancy = makeRequesActions("HOME_GIFT_RELEVANCY");
export const homeProductSaveForEvents = makeRequesActions(
  "HOME_PRODUCT_SAVE_EVENTS"
);
export const homeProductSaveForLater = makeRequesActions(
  "HOME_PRODUCT_SAVE_LATER"
);
export const homeProductSaveForContacts = makeRequesActions(
  "HOME_PRODUCT_SAVE_CONTACTS"
);
export const homeGlobalSearch = makeRequesActions("HOME_GLOBAL_SEARCH");
export const homeDeleteSearchHistory = makeRequesActions(
  "HOME_DELETE_SEARCH_HISTORY"
);
export const homeGetSpecificProduct = makeRequesActions(
  "HOME_GET_SPECIFIC_PRODUCT"
);
export const homeSentProductToSanta = makeRequesActions(
  "HOME_SENT_PRODUCT_TO_SANTA"
);
export const homeSentProductToParent = makeRequesActions(
  "HOME_SENT_PRODUCT_TO_PARENT"
);
// Note: You can access other action creators like request, failure, reset as well.

// Initial state
interface HomeState {
  upcomingEvents: Array<any>;
  presentSelected: Array<any>;
  categories: Array<any>;
  topProducts: Array<any>;
  allProducts: Array<any>;
  giftProducts: Array<any>;
  giftObj: Record<any, string>;
  searchHistory: Array<any>;
  searchProducts: Array<any>;
  searchEvents: Array<any>;
  productDetail: any;
  gift_recommendation: Array<any>;
}

const initialState: HomeState = {
  upcomingEvents: [],
  presentSelected: [],
  categories: [],
  topProducts: [],
  allProducts: [],
  giftProducts: [],
  giftObj: {},
  searchHistory: [],
  searchProducts: [],
  searchEvents: [],
  productDetail: {},
  gift_recommendation: [],
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder.addCase(homeUpcomingEvents.success, (state, action) => {
    Util.concatDataArray(state, action, "upcomingEvents");
  });
  builder.addCase(homePresentSelected.success, (state, action) => {
    Util.concatDataArray(state, action, "presentSelected");
  });
  builder.addCase(homeCategories.success, (state, action) => {
    Util.concatDataArray(state, action, "categories");
  });
  builder.addCase(homeTopProducts.success, (state, action) => {
    Util.concatDataArray(state, action, "topProducts");
  });
  builder.addCase(homeGiftProducts.success, (state, action) => {
    const { data, eventObj }: any = action.payload;
    state.giftObj = eventObj;
    Util.concatDataArray(state, action, "giftProducts");
  });
  builder.addCase(homeAllProducts.success, (state, action) => {
    Util.concatDataArray(state, action, "allProducts");
  });
  builder.addCase(authLogout.success, (state, action) => {
    Object.keys(state).forEach((key) => {
      state[key] = initialState[key];
    });
  });
  builder.addCase(homeProductSaveForEvents.success, (state, action) => {
    const { data, updateKey }: any = action.payload;
    if (updateKey) {
      let updateArray = state[`${updateKey}`];
      updateArray = updateArray.map((item) => {
        if (item.id == data.product_id) {
          return {
            ...item,
            is_saved: true,
          };
        }
        return item;
      });
      state[`${updateKey}`] = updateArray;
    }
  });
  builder.addCase(homeProductSaveForLater.success, (state, action) => {
    const { data, updateKey }: any = action.payload;
    if (updateKey) {
      let updateArray = state[`${updateKey}`];
      updateArray = updateArray.map((item) => {
        if (item.id == data.product_id) {
          return {
            ...item,
            is_saved: true,
            SFL: true,
          };
        }
        return item;
      });
      state[`${updateKey}`] = updateArray;
    }
  });
  builder.addCase(homeProductSaveForContacts.success, (state, action) => {
    const { data, updateKey }: any = action.payload;
    if (updateKey) {
      let updateArray = state[`${updateKey}`];
      updateArray = updateArray.map((item) => {
        if (item.id == data.product_id) {
          return {
            ...item,
            is_saved: true,
          };
        }
        return item;
      });
      state[`${updateKey}`] = updateArray;
    }
  });
  builder.addCase(homeGlobalSearch.success, (state, action) => {
    Util.concatDataMultipleArray(state, action, "searchHistory", "history");
    Util.concatDataMultipleArray(state, action, "searchProducts", "products");
    Util.concatDataMultipleArray(state, action, "searchEvents", "events");
  });
  builder.addCase(homeDeleteSearchHistory.success, (state, action) => {
    const { data }: any = action.payload;
    let filteredHistory = state.searchHistory;
    filteredHistory = filteredHistory.filter(({ id }) => id != data.id);
    state.searchHistory = filteredHistory;
  });
  builder.addCase(homeGetSpecificProduct.success, (state, action) => {
    const { data, identifier } = action.payload;
    if (state.productDetail?.[identifier]) {
      state.productDetail[identifier] = {
        ...state.productDetail[identifier],
        ...data,
      };
    } else {
      state.productDetail[identifier] = data;
    }
  });
  builder.addCase(homeGiftRecommendation.success, (state, action) => {
    Util.concatDataArray(state, action, "gift_recommendation");
  });
});

// Selector
export const getUpcomingEvents = (state: { home: HomeState }) =>
  state?.home?.upcomingEvents ?? [];
export const getPresentSelected = (state: { home: HomeState }) =>
  state?.home?.presentSelected ?? [];
export const getCategories = (state: { home: HomeState }) =>
  state?.home?.categories ?? [];
export const getTopProducts = (state: { home: HomeState }) =>
  state?.home?.topProducts ?? [];
export const getGiftProducts = (state: { home: HomeState }) =>
  state?.home?.giftProducts ?? [];
export const getGiftEvent = (state: { home: HomeState }) =>
  state?.home?.giftObj ?? {};
export const getAllProducts = (state: { home: HomeState }) =>
  state?.home?.allProducts ?? [];
export const getGiftRecommendationProducts = (state: { home: HomeState }) =>
  state?.home?.gift_recommendation ?? [];
export const getSearchHistory = (state: { home: HomeState }) =>
  state?.home?.searchHistory ?? [];
export const getSearchProducts = (state: { home: HomeState }) =>
  state?.home?.searchProducts ?? [];
export const getSearchEvents = (state: { home: HomeState }) =>
  state?.home?.searchEvents ?? [];
export const getSpecificProductDetail =
  (identifier) => (state: { home: HomeState }) =>
    state?.home?.productDetail?.[identifier] ?? {};
