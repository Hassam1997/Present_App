// @flow
import { Platform } from "react-native";
import KeyboardManager from "react-native-keyboard-manager";

function setEnable(enable = true) {
  if (Platform.OS === "ios") {
    KeyboardManager.setEnable(enable);
    KeyboardManager.setEnableAutoToolbar(enable);
  }
}

function enableManagerOnly(enable = true) {
  if (Platform.OS === "ios") {
    KeyboardManager.setEnable(enable);
  }
}

function setToolbarEnable(enable = true) {
  if (Platform.OS === "ios") {
    KeyboardManager.setToolbarPreviousNextButtonEnable(enable);
  }
}

function setToolbarPreviousNextButtonEnable(enable = true) {
  if (Platform.OS === "ios") {
    KeyboardManager.setToolbarPreviousNextButtonEnable(enable);
    KeyboardManager.setEnableAutoToolbar(enable);
  }
}

export default {
  enableManagerOnly,
  setEnable,
  setToolbarPreviousNextButtonEnable,
  setToolbarEnable,
};
