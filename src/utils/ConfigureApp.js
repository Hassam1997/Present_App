import { Text, StatusBar, LogBox, TextInput } from "react-native";

import {
  yellowBox,
  allowTextFontScaling,
  allowIQKeyboardManager,
  allowIQKeyboardManagerToolbar,
} from "../config/AppConfig";

import { Util, IQKeyboardManager } from ".";
import { Colors } from "../theme";

export default () => {
  if (__DEV__) {
    //  eslint-disable-next-line no-console
    LogBox.ignoreAllLogs(true);
  }

  if (Util.isPlatformIOS()) {
    // Allow IQKeyboardManager
    IQKeyboardManager.setEnable(allowIQKeyboardManager);

    // Allow Button IQKeyboardManager
    IQKeyboardManager.setToolbarPreviousNextButtonEnable(
      allowIQKeyboardManagerToolbar
    );
  }

  // Allow/disallow font-scaling in app
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = allowTextFontScaling;
};
