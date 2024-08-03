/** @format */

import { showMessage as flashMessageShow } from "react-native-flash-message";
import { Platform, StatusBar, Alert, Share, Appearance } from "react-native";
import moment from "moment";
import _ from "lodash";
import checkVersion from "react-native-store-version";
import VersionInfo from "react-native-version-info";
import { ANDROID_STORE_URL, IOS_STORE_URL } from "../config/Constants";
import DataHandler from "./DataHandler";
import Clipboard from "@react-native-clipboard/clipboard";
import { getModel } from "react-native-device-info";
import { notificationUnreadCount } from "../ducks/notification";
import { getUserData } from "../ducks/auth";
import { parsePhoneNumber } from "libphonenumber-js";
import { Colors, Metrics } from "../theme";

function isPlatformAndroid() {
  return Platform.OS === "android";
}

function isPlatformIOS() {
  return Platform.OS === "ios";
}

function getPlatform() {
  return Platform.OS;
}

function convert24HrTo12(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

function getFormattedTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return `${minutes > 9 ? minutes : `0${minutes}`}:${
    seconds > 9 ? seconds : `0${seconds}`
  }`;
}

function translucentApp() {
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("light-content");
}

function setStatusBarLight() {
  StatusBar.setBarStyle("light-content", true);
}

function setStatusBarDark() {
  StatusBar.setBarStyle("dark-content", true);
}

function isNotEmpty(data) {
  return !_.isEmpty(data, true);
}

function isEmpty(data) {
  return _.isEmpty(data, true);
}

function clone(data) {
  return _.clone(data);
}

function cloneDeep(data) {
  return _.cloneDeep(data);
}

function isArray(data) {
  return _.isArray(data);
}

function getTimeDiffInMinutes(timeStamp) {
  return (Number(new Date()) - Number(new Date(timeStamp))) / (1000 * 60);
}

function compareDeep(previous, next) {
  return !_.isEqual(previous, next);
}

function getDateFromNow(date) {
  return date ? moment(date).fromNow() : "";
}

function formatDate(dateString, formattedDateFormat) {
  return dateString ? moment(dateString).format(formattedDateFormat) : "";
}

function formatDateUTC(dateString, formattedDateFormat) {
  return dateString
    ? moment(new Date(dateString)).format(formattedDateFormat)
    : "";
}

function formatDate2(dateString, currentDateFormat, formattedDateFormat) {
  return dateString
    ? moment(dateString, currentDateFormat).format(formattedDateFormat)
    : "";
}

function compareDates(date1, date2) {
  if (date1 && date2) {
    return moment(date1).isSame(date2, "day");
  }
  return false;
}

function setStatusBarStyle(barStyle) {
  StatusBar.setBarStyle(barStyle, true);
}

function showAlertConfirm(
  title,
  message,
  doneText,
  onDonePress,
  cancelText = "cancel"
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        onPress: () => {},
        style: "cancel",
      },
      { text: doneText, onPress: () => onDonePress() },
    ],
    { cancelable: true }
  );
}

function removeFormatLocalNumber(x) {
  return x.toString().replace(/[^\d.-]/g, "");
}

function toFixedIfNecessary(value, dp = 1) {
  return +parseFloat(value).toFixed(dp);
}

/*
type : 'danger' , 'success' , 'info'
*/
function showMessage(message, type = "danger", duration = 2000) {
  flashMessageShow({
    message,
    type,
    duration,
  });
}

function showCustomMessage(message, type = "danger", duration = 2000) {
  setTimeout(() => {
    DataHandler.getFlashAlertModalRef().show({
      title: message,
      type: type,
      callback: () => {},
    });
  }, 300);
  setTimeout(() => {
    DataHandler.getFlashAlertModalRef().hide();
  }, duration);
}

function concatDataArray(state, action, dataKey = "data") {
  const { data, reset } = action.payload;
  const newData = reset ? data : _.concat(state?.[dataKey] ?? [], data);

  state[dataKey] = newData;
}

function concatDataMultipleArray(state, action, dataKey = "data", key) {
  const { reset } = action.payload;
  const extractedData = extractKey(action.payload, key);

  const newData = reset
    ? extractedData
    : _.concat(state?.[dataKey] ?? [], extractedData);

  state[dataKey] = newData;
}

function extractKey(object, key) {
  if (object.hasOwnProperty(key)) {
    const extractedData = object[key];
    return extractedData;
  } else {
    return null; // Key not found in the object
  }
}

function stringToDateObject(date, format) {
  if (date) {
    return moment(date, format).toDate();
  }
  return moment().toDate();
}

function makeRandomString(length = 20) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function showDateNotification(index, notificationList, keyName) {
  if (index === 0) {
    return true;
  }
  const currentNotificationDate = notificationList[index][keyName];
  const previousNotificationDate = notificationList[index - 1][keyName];
  if (currentNotificationDate && previousNotificationDate) {
    return !moment(currentNotificationDate).isSame(
      previousNotificationDate,
      "day"
    );
  }
  return false;
}

function dayFromNow(time) {
  moment.updateLocale("en", {
    calendar: {
      lastDay: "[Older]",
      sameDay: "[Latest]",
      nextDay: "[Tomorrow]",
      lastWeek: "L",
      nextWeek: "[Next]",
      sameElse: "MM/DD/YYYY",
    },
  });
  return moment(time).calendar();
}

function dateFromNow(time) {
  moment.updateLocale("en", {
    calendar: {
      lastDay: "ddd, MMM DD, YYYY",
      sameDay: "ddd, MMM DD, YYYY",
      nextDay: "ddd, MMM DD, YYYY",
      lastWeek: "ddd, MMM DD, YYYY",
      nextWeek: "ddd, MMM DD, YYYY",
      sameElse: "ddd, MMM DD, YYYY",
    },
  });
  return moment(time).calendar();
}

function isEqual(param1, param2) {
  return _.isEqual(param1, param2);
}

function copyTextToClipBoard(text) {
  return Clipboard.setString(text);
}

function checkAppStoreVersion() {
  const init = async () => {
    try {
      const check = await checkVersion({
        version: VersionInfo.appVersion, // app local version
        androidStoreURL: ANDROID_STORE_URL,
        iosStoreURL: IOS_STORE_URL,
        country: "jp", // default value is 'jp'
      });

      console.log("=========== Check App Version =======");
      console.log("=========== Platform ==================");
      console.log(getPlatform());

      console.log(check);
      if (check.result === "new") {
        // if app store version is new
        Alert.alert("Update App", "New version available on store");
      }

      // setAndroidVersion(check.result);
    } catch (e) {
      console.log(e);
    }
  };

  init();
}

function isDevice14Pro() {
  let device = getModel();
  if (
    device.includes("14") &&
    (device.includes("Pro") || device.includes("Plus"))
  ) {
    return true;
  } else {
    return false;
  }
}

function objectToQueryString(obj) {
  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keyValuePairs.push(
        encodeURIComponent(key) +
          "=" +
          (_.isArray(obj[key]) ? `[${obj[key]}]` : encodeURIComponent(obj[key]))
      );
    }
  }
  return keyValuePairs.join("&");
}

function omit(key, obj) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

function excludeCountryCode(code, number) {
  // if (code?.cca2 == "CA" || code?.cca2 == "US" || code?.cca2 == undefined) {
  //   return number;
  // } else {
  return `+` + `${code?.callingCode[0] ?? 1}` + `${number}`;
  // }
}

function showDateNotificationFromLast(index, notificationList) {
  const isLastItem = index === notificationList.length - 1;
  if (notificationList.length - 1 === -1) {
    return false;
  }
  if (isLastItem) {
    return true;
  }
  const currentNotificationDate = notificationList[index]?.date;
  const nextNotificationDate = notificationList[index + 1]?.date;
  if (currentNotificationDate && nextNotificationDate) {
    return !moment(currentNotificationDate).isSame(nextNotificationDate, "day");
  }
  return false;
}

const refactorData = (message) => {
  let refineData = [];
  if (message._docs.length > 0) {
    for (let i = 0; i < message._docs.length; i++) {
      // console.log(message._docs[i]);
      refineData.push(message._docs[i]._data);
    }
    return refineData;
  }
  return refineData;
};

const refactorMessageData = (message) => {
  let refineData = [];
  if (message._docs.length > 0) {
    for (let i = 0; i < message._docs.length; i++) {
      // console.log(message._docs[i]);
      refineData.push(message._docs[i]._data);
    }
    return refineData;
  }
  return refineData;
};

const checkIfObjectExistsOrNot = (obj, key) => {
  if (obj.hasOwnProperty(key)) {
    return true;
  } else {
    return false;
  }
};

function checkHttps(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.protocol === "https:";
}

function notificationCount() {
  const userData = getUserData(DataHandler.getStore().getState());
  if (userData?.id) {
    DataHandler.getStore().dispatch(
      notificationUnreadCount.request({
        parameter: `?receiver_id=${userData?.id}`,
      })
    );
  }
}

function getCountryCode(mobileNumber) {
  const countryCode = `+${
    splitCountryCode(mobileNumber) + splitPhoneNumber(mobileNumber)
  }`;
  const phoneNumber = parsePhoneNumber(countryCode)?.country;

  return phoneNumber;
}

function splitCountryCode(mobileNumber) {
  const countryCode = parsePhoneNumber(mobileNumber).countryCallingCode;

  return countryCode;
}

function splitPhoneNumber(mobileNumber) {
  const phoneNumber = parsePhoneNumber(mobileNumber).nationalNumber;

  return phoneNumber;
}

function onShare(title, message) {
  Share.share({
    title,
    message,
  });
}

function ObjectToFormData(data, uri) {
  const formData = new FormData();
  for (let i = 0; i < Object.keys(data).length; i++) {
    formData.append(`${Object.keys(data)[i]}`, `${Object.values(data)[i]}`);
  }
  formData.append("file", uri);
  return formData;
}

function successStatusCode(value) {
  const obj = {
    200: 200,
    201: 201,
    202: 202,
    203: 203,
    204: 204,
  };
  for (const key in obj) {
    if (obj[key] === value) {
      return true;
    }
  }
  return false;
}

function isDarkMode() {
  return Appearance.getColorScheme() === "dark";
}

function markedDatesArray(inputArray) {
  if (inputArray.length == 0) {
    return {};
  }
  const result = {};

  inputArray.forEach((item) => {
    if (item.date) {
      result[item.date] = {
        marked: true,
        dotColor: Colors.WHITE,
        selectedColor: Colors.PRIMARY,
        activeOpacity: 0,
        selected: true,
        customStyles: {
          container: {
            borderRadius: Metrics.ratio(5),
            height: Metrics.ratio(35),
            width: Metrics.ratio(35),
          },
        },
      };
    }
  });

  return result;
}

function convertDateTime(date) {
  const itemDate = new Date(date);
  const nextDay = new Date(itemDate);
  nextDay.setDate(itemDate.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);
  return nextDay;
}

export default {
  checkAppStoreVersion,
  isPlatformAndroid,
  isPlatformIOS,
  getPlatform,
  convert24HrTo12,
  translucentApp,
  setStatusBarLight,
  setStatusBarDark,
  isNotEmpty,
  isEmpty,
  isArray,
  clone,
  cloneDeep,
  getTimeDiffInMinutes,
  compareDeep,
  getDateFromNow,
  formatDate,
  makeRandomString,
  formatDate2,
  stringToDateObject,
  compareDates,
  setStatusBarStyle,
  showAlertConfirm,
  removeFormatLocalNumber,
  toFixedIfNecessary,
  showMessage,
  concatDataArray,
  concatDataMultipleArray,
  getFormattedTime,
  showCustomMessage,
  showDateNotification,
  dayFromNow,
  isEqual,
  copyTextToClipBoard,
  isDevice14Pro,
  objectToQueryString,
  excludeCountryCode,
  formatDateUTC,
  showDateNotificationFromLast,
  dateFromNow,
  refactorData,
  refactorMessageData,
  checkIfObjectExistsOrNot,
  checkHttps,
  notificationCount,
  getCountryCode,
  splitCountryCode,
  splitPhoneNumber,
  onShare,
  ObjectToFormData,
  successStatusCode,
  isDarkMode,
  markedDatesArray,
  convertDateTime,
  omit,
};
