/** @format */

import { createReducer } from "@reduxjs/toolkit";
import { makeRequesActions, makeAction } from "../ActionTypes";
import { Util } from "../../utils";

// Action creators
export const registryMyGifts = makeRequesActions("REGISTRY_MY_GIFTS");
export const registryPurchaseGifts = makeRequesActions(
  "REGISTRY_PURCHASE_GIFTS"
);
export const registryStarredGifts = makeRequesActions("REGISTRY_STARRED_GIFTS");
export const registryGiftingGroup = makeRequesActions("REGISTRY_GIFTING_GROUP");
export const registryJuniorGifts = makeRequesActions("REGISTRY_JUNIOR_GIFT");
export const registrySpecificJuniorGifts = makeRequesActions(
  "REGISTRY_SPECIFIC_JUNIOR_GIFT"
);
export const registryRemoveGifts = makeRequesActions("REGISTRY_REMOVE_GIFT");
export const registrySavedGifts = makeRequesActions("REGISTRY_SAVED_GIFT");
export const registryCreateGroup = makeRequesActions("REGISTRY_CREATE_GROUP");
export const registrySpecificGiftingGroup = makeRequesActions(
  "REGISTRY_SPECIFIC_GIFTING_GROUP"
);
export const registryFinalizeGroup = makeRequesActions(
  "REGISTRY_FINALIZE_GROUP"
);
export const registrySuggestedGroupProducts = makeRequesActions(
  "REGISTRY_SUGGESTED_GROUP_PRODUCTS"
);
export const registryAddGroupProducts = makeRequesActions(
  "REGISTRY_ADD_GROUP_PRODUCTS"
);
export const registrySaveGroupDraft = makeRequesActions(
  "REGISTRY_SAVE_GROUP_DRAFT"
);
export const registryDeleteGroup = makeRequesActions("REGISTRY_DELETE_GROUP");
export const registryEditGroup = makeRequesActions("REGISTRY_EDIT_GROUP");
export const registryMarkPaid = makeRequesActions("REGISTRY_MARK_PAID");
export const registryRemoveGroupProducts = makeRequesActions(
  "REGISTRY_REMOVE_GROUP_PRODUCTS"
);
export const registryProductsPriority = makeRequesActions(
  "REGISTRY_PRODUCTS_PRIORITY"
);
// Note: You can access other action creators like request, failure, reset as well.

// Initial state
interface RegistryState {
  mygifts: Array<any>;
  gifting_groups: Array<any>;
  junior_gifts: Array<any>;
  saved_gifts: Array<any>;
  specific_group: Record<any, any>;
  suggested_products: Array<any>;
}

const initialState: RegistryState = {
  mygifts: [],
  gifting_groups: [],
  junior_gifts: [],
  saved_gifts: [],
  specific_group: {},
  suggested_products: [],
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder.addCase(registryMyGifts.success, (state, action) => {
    Util.concatDataArray(state, action, "mygifts");
  });
  builder.addCase(registryPurchaseGifts.success, (state, action) => {
    const { data, id }: any = action.payload;
    const arrayVal = `${id}` ?? "mygifts";
    let updateArray = state[arrayVal];
    updateArray = updateArray?.map((item) => {
      if (item.model_id == data.model_id) {
        return {
          ...item,
          purchased: true,
        };
      }
      return item;
    });
    state[arrayVal] = updateArray;
  });
  builder.addCase(registryStarredGifts.success, (state, action) => {
    const { data, id }: any = action.payload;
    const arrayVal = `${id}` ?? "mygifts";
    let updateArray = state[arrayVal];
    updateArray = updateArray.map((item) => {
      if (item.model_id == data.model_id) {
        return {
          ...item,
          starred: true,
        };
      }
      return item;
    });
    state[arrayVal] = updateArray;
  });
  builder.addCase(registryGiftingGroup.success, (state, action) => {
    Util.concatDataArray(state, action, "gifting_groups");
  });
  builder.addCase(registryJuniorGifts.success, (state, action) => {
    Util.concatDataArray(state, action, "junior_gifts");
  });
  builder.addCase(registrySpecificJuniorGifts.success, (state, action) => {
    const { data, identifier } = action.payload;
    Util.concatDataArray(state, action, identifier);
  });
  builder.addCase(registryRemoveGifts.success, (state, action) => {
    const { data, id } = action.payload;
    const arrayVal = `${id}`;
    let filtered = state[arrayVal];
    filtered = filtered.filter((item) => !data.includes(item.model_id));
    state[arrayVal] = filtered;
  });
  builder.addCase(registrySavedGifts.success, (state, action) => {
    Util.concatDataArray(state, action, "saved_gifts");
  });
  builder.addCase(registrySpecificGiftingGroup.success, (state, action) => {
    const { data, identifier } = action.payload;
    if (state.specific_group?.[identifier]) {
      state.specific_group[identifier] = {
        ...state.specific_group[identifier],
        ...data,
      };
    } else {
      state.specific_group[identifier] = data;
    }
  });
  builder.addCase(registrySuggestedGroupProducts.success, (state, action) => {
    Util.concatDataArray(state, action, "suggested_products");
  });
  builder.addCase(registryProductsPriority.success, (state, action) => {
    // Util.concatDataArray(state, action, "suggested_products");
    const { key, id, data } = action.payload;
    if (state[key]) {
      const index = state[key].findIndex((val: any) => val.id === id);
      if (index >= 0) {
        state[key][index] = {
          ...state[key][index],
          junior_starred: data.enum,
        };
      }
    }
  });
});

// Selector
export const getMyGifts = (state: { myregistery: RegistryState }) =>
  state?.myregistery?.mygifts ?? [];
export const getGiftingGroups = (state: { myregistery: RegistryState }) =>
  state?.myregistery?.gifting_groups ?? [];
export const getJuniorGift = (state: { myregistery: RegistryState }) =>
  state?.myregistery?.junior_gifts ?? [];
export const getSpecificJuniorGift =
  (identifier) => (state: { myregistery: RegistryState }) =>
    state?.myregistery?.[identifier] ?? [];
export const getSavedGift = (state: { myregistery: RegistryState }) =>
  state?.myregistery?.saved_gifts ?? [];
export const getSpecificGroup =
  (identifier) => (state: { myregistery: RegistryState }) =>
    state?.myregistery?.specific_group?.[identifier] ?? {};
export const getSuggestedGroupProducts = (state: {
  myregistery: RegistryState;
}) => state?.myregistery?.suggested_products ?? [];
