/** @format */

import { createReducer } from "@reduxjs/toolkit";
import { makeRequesActions, makeAction } from "../ActionTypes";
import { Util } from "../../utils";
import { EVENT_TYPES } from "../../config/Constants";
import { homeGiftRelevancy } from "../home";

// Action creators
export const eventCreateEvents = makeRequesActions("EVENT_CREATE_EVENTS");
export const eventGetGeneral = makeRequesActions("EVENT_GET_GENERAL");
export const eventGetCustom = makeRequesActions("EVENT_GET_CUSTOM");
export const eventGetAll = makeRequesActions("EVENT_GET_ALL");
export const eventGetAdmin = makeRequesActions("EVENT_GET_ADMIN");
export const eventGetSpecific = makeRequesActions("EVENT_GET_SPECIFIC");
export const eventEditDetail = makeRequesActions("EVENT_EDIT_DETAIL");
export const eventDeleteProduct = makeRequesActions("EVENT_DELETE_PRODUCT");
export const eventDeleteEvent = makeRequesActions("EVENT_DELETE_EVENT");
// Note: You can access other action creators like request, failure, reset as well.

// Initial state
interface EventState {
  generalEvent: Array<any>;
  customEvent: Array<any>;
  allEvents: Array<any>;
  adminEvents: Array<any>;
  eventDetail: Record<any, any>;
}

const initialState: EventState = {
  generalEvent: [],
  customEvent: [],
  allEvents: [],
  eventDetail: {},
  adminEvents: [],
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder.addCase(eventGetGeneral.success, (state, action) => {
    Util.concatDataArray(state, action, "generalEvent");
  });
  builder.addCase(eventGetCustom.success, (state, action) => {
    Util.concatDataArray(state, action, "customEvent");
  });
  builder.addCase(eventGetAll.success, (state, action) => {
    Util.concatDataArray(state, action, "allEvents");
  });
  builder.addCase(eventGetAdmin.success, (state, action) => {
    Util.concatDataArray(state, action, "adminEvents");
  });
  builder.addCase(eventGetSpecific.success, (state, action) => {
    // const { data }: any = action.payload;
    // state.eventDetail = data;
    const { data, identifier } = action.payload;
    if (state.eventDetail?.[identifier]) {
      state.eventDetail[identifier] = {
        ...state.eventDetail[identifier],
        ...data,
      };
    } else {
      state.eventDetail[identifier] = data;
    }
  });
  builder.addCase(eventCreateEvents.success, (state, action) => {
    const { data }: any = action.payload;
    if (data?.event_type == EVENT_TYPES.GENERAL) {
      state.allEvents.unshift(data);
      state.generalEvent.unshift(data);
      state.allEvents.sort((a: number, b: number) => {
        return new Date(a.date) - new Date(b.date);
      });
      state.generalEvent.sort((a, b: number) => {
        return new Date(a.date) - new Date(b.date);
      });
    } else {
      state.allEvents.unshift(data[0]);
      state.customEvent.unshift(data[0]);
      state.allEvents.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      state.customEvent.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
  });
  builder.addCase(eventEditDetail.success, (state, action) => {
    const { data, eventId } = action.payload;
    if (state.eventDetail?.[eventId]) {
      state.eventDetail[eventId] = {
        ...state.eventDetail[eventId],
        ...data,
      };
    } else {
      state.eventDetail[eventId] = data;
    }
  });
  builder.addCase(homeGiftRelevancy.success, (state, action) => {
    const { data } = action.payload;
    if (data?.status == "Irrelevant") {
      let filteredAllEvent = state.allEvents;
      let filteredGeneralEvent = state.generalEvent;
      let filteredCustomEvent = state.customEvent;

      filteredAllEvent = filteredAllEvent.filter(({ id }) => id != data.id);
      state.allEvents = filteredAllEvent;

      filteredGeneralEvent = filteredGeneralEvent.filter(
        ({ id }) => id != data.id
      );
      state.generalEvent = filteredGeneralEvent;

      filteredCustomEvent = filteredCustomEvent.filter(
        ({ id }) => id != data.id
      );
      state.customEvent = filteredCustomEvent;
    }
  });
  builder.addCase(eventDeleteEvent.success, (state, action) => {
    const { data }: any = action.payload;
    let filteredAllEvent = state.allEvents;
    let filteredGeneralEvent = state.generalEvent;
    let filteredCustomEvent = state.customEvent;

    filteredAllEvent = filteredAllEvent.filter(({ id }) => id != data.id);
    state.allEvents = filteredAllEvent;

    filteredGeneralEvent = filteredGeneralEvent.filter(
      ({ id }) => id != data.id
    );
    state.generalEvent = filteredGeneralEvent;

    filteredCustomEvent = filteredCustomEvent.filter(({ id }) => id != data.id);
    state.customEvent = filteredCustomEvent;
  });
});

// Selector
export const getGeneralEventList = (state: { events: EventState }) =>
  state?.events?.generalEvent ?? [];
export const getCustomEventList = (state: { events: EventState }) =>
  state?.events?.customEvent ?? [];
export const getAllEventList = (state: { events: EventState }) =>
  state?.events?.allEvents ?? [];
export const getAdminEventList = (state: { events: EventState }) =>
  state?.events?.adminEvents ?? [];
export const getSpecificEventDetail =
  (identifier) => (state: { events: EventState }) =>
    state?.events?.eventDetail?.[identifier] ?? {};
