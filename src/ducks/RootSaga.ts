/** @format */

import { fork } from "redux-saga/effects";
import testPost from "./testPost/saga";
import auth from "./auth/saga";
import home from "./home/saga";
import notification from "./notification/saga";
import events from "./events/saga";
import contacts from "./contacts/saga";
import myregistery from "./myregistery/saga";

export default function* root() {
  yield fork(testPost);
  yield fork(auth);
  yield fork(home);
  yield fork(notification);
  yield fork(events);
  yield fork(contacts);
  yield fork(myregistery);
}
