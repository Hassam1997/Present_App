/** @format */

import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useImperativeHandle, useState, useEffect } from "react";

import { DATE_PICKER_TYPE } from "../../config/Constants";
import moment from "moment";
import { Platform, Keyboard } from "react-native";
import { Metrics } from "../../theme";
import { Util } from "../../utils";

const DatePickerModal = (props, forwardedRef) => {
  //set default state
  const [modalInfo, setInfo] = useState({
    mode: DATE_PICKER_TYPE.DATE,
    onSelected: undefined,
    isVisiable: false,
    format: "",
    date: "",
    extraProps: {},
    displayMode: "inline",
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // hide modal function
  const hideDatePicker = () => {
    setInfo({ ...modalInfo, isVisiable: false });
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: (data) => {
      const { extraProps, ...rest } = modalInfo;
      setInfo({ ...rest, ...data, isVisiable: true });
    },
  }));

  // handle date select click
  const handleConfirm = (date) => {
    // hide datepicker
    hideDatePicker();
    // check onSelected
    if (modalInfo.onSelected) {
      //  format date and call onSelected
      modalInfo.onSelected(date, moment(date).valueOf());
    }
  };

  // set selected date when popup open
  // const currentDate = Util.stringToDateObject(
  //   modalInfo.date,
  //   AppUtil.getDateFormat(modalInfo.mode),
  // );

  const currentDate = modalInfo.date ? new Date(modalInfo.date) : new Date();

  // main render
  return (
    <DateTimePickerModal
      isVisible={modalInfo.isVisiable}
      mode={modalInfo.mode}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      date={currentDate}
      modalStyleIOS={{
        maxHeight: isKeyboardVisible ? Metrics.screenHeight * 0.65 : null,
        paddingBottom: Metrics.bottomPadding,
      }}
      // isDarkModeEnabled={Util.isDarkMode() ? false : true}
      // display="inline"
      display={
        // Platform.OS === "android"
        //   ? "default"
        //   : modalInfo.mode === "time"
        //   ? null
        //   :
        modalInfo.displayMode
      }
      {...modalInfo.extraProps}
    />
  );
};
export default React.forwardRef(DatePickerModal);
