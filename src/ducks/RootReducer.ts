/** @format */

import { combineReducers } from "redux";

import requestFlags from "./requestFlags";
import network from "./network";
import testPost from "./testPost";
import auth from "./auth";
import general from "./general";
import home from "./home";
import notification from "./notification";
import events from "./events";
import contacts from "./contacts";
import myregistery from "./myregistery";

const appReducer = combineReducers({
  requestFlags,
  network,
  testPost,
  auth,
  general,
  home,
  notification,
  events,
  contacts,
  myregistery,
});

export default appReducer;
