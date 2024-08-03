/** @format */

import { createReducer } from "@reduxjs/toolkit";
import { makeRequesActions, makeAction } from "../ActionTypes";
import { Util } from "../../utils";

// Action creators
export const saveContactsList = makeRequesActions("SAVE_CONTACTS_LIST");
export const contactsGetList = makeRequesActions("CONTACTS_GET_LIST");
export const groupsGetList = makeRequesActions("GROUPS_GET_LIST");
export const contactGetDetail = makeRequesActions("CONTACT_GET_DETAIL");
export const groupGetDetail = makeRequesActions("GROUP_GET_DETAIL");
export const addContact = makeRequesActions("ADD_CONTACT");
export const getInterests = makeRequesActions("GET_INTERESTS");
export const getRelations = makeRequesActions("GET_RELATIONS");
export const editContact = makeRequesActions("EDIT_CONTACT");
export const contactAddToGroup = makeRequesActions("CONTACT_ADD_TO_GROUP");
export const deleteContact = makeRequesActions("DELETE_CONTACT");
export const editGroupDetail = makeRequesActions("EDIT_GROUP_DETAIL");
export const createGroup = makeRequesActions("CREATE_GROUP");
export const deleteGroup = makeRequesActions("DELETE_GROUP");
export const addGroupLink = makeRequesActions("ADD_GROUP_LINK");
// Note: You can access other action creators like request, failure, reset as well.

// Initial state
interface ContactState {
  contactList: Array<any>;
  groupList: Array<any>;
  contact_detail: Record<any, any>;
  group_detail: Record<any, any>;
  interests: Array<any>;
  relations: Array<any>;
}

const initialState: ContactState = {
  contactList: [],
  groupList: [],
  contact_detail: {},
  group_detail: {},
  interests: [],
  relations: [],
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder.addCase(contactsGetList.success, (state, action) => {
    Util.concatDataArray(state, action, "contactList");
  });
  builder.addCase(groupsGetList.success, (state, action) => {
    Util.concatDataArray(state, action, "groupList");
  });
  builder.addCase(contactGetDetail.success, (state, action) => {
    const { data, identifier } = action.payload;
    if (state.contact_detail?.[identifier]) {
      state.contact_detail[identifier] = {
        ...state.contact_detail[identifier],
        ...data,
      };
    } else {
      state.contact_detail[identifier] = data;
    }
  });
  builder.addCase(groupGetDetail.success, (state, action) => {
    const { data, identifier } = action.payload;
    if (state.group_detail?.[identifier]) {
      state.group_detail[identifier] = {
        ...state.group_detail[identifier],
        ...data,
      };
    } else {
      state.group_detail[identifier] = data;
    }
  });
  builder.addCase(addContact.success, (state, action) => {
    const { data } = action.payload;
    let updatedArray = state["contactList"];
    updatedArray.unshift(data);
    state["contactList"] = updatedArray;
  });
  builder.addCase(getInterests.success, (state, action) => {
    Util.concatDataArray(state, action, "interests");
  });
  builder.addCase(getRelations.success, (state, action) => {
    Util.concatDataArray(state, action, "relations");
  });
  builder.addCase(editContact.success, (state, action) => {
    const { data, payload_id } = action.payload;
    if (state.contact_detail?.[payload_id]) {
      state.contact_detail[payload_id] = {
        ...state.contact_detail[payload_id],
        ...data,
      };
    } else {
      state.contact_detail[payload_id] = data;
    }
  });
  builder.addCase(editGroupDetail.success, (state, action) => {
    const { data, payload_id } = action.payload;
    if (state.group_detail?.[payload_id]) {
      state.group_detail[payload_id] = {
        ...state.group_detail[payload_id],
        ...data,
      };
    } else {
      state.group_detail[payload_id] = data;
    }
  });
  builder.addCase(createGroup.success, (state, action) => {
    const { data } = action.payload;
    let updatedArray = state["groupList"];
    updatedArray.unshift(data);
    state["groupList"] = updatedArray;
  });
  builder.addCase(deleteContact.success, (state, action) => {
    const { data }: any = action.payload;
    let filteredContacts = state.contactList;
    filteredContacts = filteredContacts.filter(({ id }) => id != data.id);
    state.contactList = filteredContacts;
  });
  builder.addCase(deleteGroup.success, (state, action) => {
    const { data }: any = action.payload;
    let filteredGroups = state.groupList;
    filteredGroups = filteredGroups.filter(({ id }) => id != data.id);
    state.groupList = filteredGroups;
  });
});

// Selector
export const getContactList = (state: { contacts: ContactState }) =>
  state?.contacts?.contactList ?? [];
export const getGroupList = (state: { contacts: ContactState }) =>
  state?.contacts?.groupList ?? [];
export const getSpecificContactDetail =
  (identifier) => (state: { contacts: ContactState }) =>
    state?.contacts?.contact_detail?.[identifier] ?? {};
export const getSpecificGroupDetail =
  (identifier) => (state: { contacts: ContactState }) =>
    state?.contacts?.group_detail?.[identifier] ?? {};
export const getInterestsList = (state: { contacts: ContactState }) =>
  state?.contacts?.interests ?? [];
export const getRelationList = (state: { contacts: ContactState }) =>
  state?.contacts?.relations ?? [];
