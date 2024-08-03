/** @format */

import React, { useImperativeHandle, useState } from "react";
import { Image } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import { Util } from "../../utils";
import { ButtonView } from "../../components";
import { Block, Text } from "../../common";

const AlertModal = (props, forwardedRef) => {
  const [data, setData] = useState({
    description: undefined,
    isVisible: false,
    callback: () => {},
  });

  // hide modal function
  const hideModal = () => {
    setData({ ...data, isVisible: false });
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: (options = data) => {
      setData({ ...options, isVisible: true });
    },
    hide: hideModal,
  }));

  const {
    title,
    description,
    callback,
    isVisible,
    OKButton,
    callbackNo,
    acceptTitle = "Delete",
    declineTitle = "Cancel",
    backDrop,
  } = data;

  return (
    <Modal
      backdropTransitionOutTiming={0}
      style={styles.modal}
      isVisible={isVisible}
      useNativeDriver={Util.isPlatformAndroid()}
      backdropOpacity={0.3}
      // animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      <Block style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Block style={styles.row}>
          {OKButton ? null : (
            <ButtonView
              style={styles.button}
              onPress={() => {
                hideModal();
                setTimeout(() => {
                  callbackNo && callbackNo();
                }, 500);
              }}
            >
              <Text
                style={styles.buttonText1}
                accessibilityLabel={"Cancel btn"}
              >
                {declineTitle}
              </Text>
            </ButtonView>
          )}
          <Block style={styles.buttonSeparator} />
          <ButtonView
            style={styles.button}
            onPress={() => {
              hideModal();
              setTimeout(() => {
                callback && callback();
              }, 500);
            }}
          >
            {OKButton ? (
              <Text style={styles.buttonText}>{"Ok"}</Text>
            ) : (
              <Text style={styles.buttonText} accessibilityLabel={"Logout btn"}>
                {acceptTitle}
              </Text>
            )}
          </ButtonView>
        </Block>
      </Block>
    </Modal>
  );
};

export default React.forwardRef(AlertModal);
