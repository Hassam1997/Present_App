let store = null;
let isInternetConnected = false;
let topLoaderRef = null;
let datePickerModalRef = null;
let bottomSheetModalRef = null;
let alertModalRef = null;
let flashAlertModalRef = null;
let attachmentModalRef = null;
let interestModalRef = null;

function setStore(value) {
  store = value;
}

function getStore() {
  return store;
}

function getStoreState() {
  return store?.getState() ?? {};
}

function dispatchAction(action) {
  const { dispatch } = store;
  dispatch(action);
}

function setInternetConnected(connected) {
  isInternetConnected = connected;
}

function getIsInternetConnected() {
  return isInternetConnected;
}

function setTopLoaderRef(value) {
  topLoaderRef = value;
}

function getTopLoaderRef() {
  return topLoaderRef;
}

function setDatePickerModalRef(value) {
  datePickerModalRef = value;
}

function getDatePickerModalRef() {
  return datePickerModalRef;
}

function setBottomSheetModalRef(value) {
  bottomSheetModalRef = value;
}

function getBottomSheetModalRef() {
  return bottomSheetModalRef;
}

function setAlertModalRef(value) {
  alertModalRef = value;
}

function getAlertModalRef() {
  return alertModalRef;
}

function setFlashAlertModalRef(value) {
  flashAlertModalRef = value;
}

function getFlashAlertModalRef() {
  return flashAlertModalRef;
}

function setAttachmentModalRef(value) {
  attachmentModalRef = value;
}

function getAttachmentModalRef() {
  return attachmentModalRef;
}

function setInterestModalRef(value) {
  interestModalRef = value;
}

function getInterestModalRef() {
  return interestModalRef;
}

export default {
  setStore,
  getStore,
  setInternetConnected,
  getIsInternetConnected,
  getStoreState,
  dispatchAction,
  setTopLoaderRef,
  getTopLoaderRef,
  setDatePickerModalRef,
  getDatePickerModalRef,
  setBottomSheetModalRef,
  getBottomSheetModalRef,
  setAlertModalRef,
  getAlertModalRef,
  setFlashAlertModalRef,
  getFlashAlertModalRef,
  setAttachmentModalRef,
  getAttachmentModalRef,
  setInterestModalRef,
  getInterestModalRef,
};
