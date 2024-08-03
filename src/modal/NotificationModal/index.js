/** @format */

import React, { useImperativeHandle, useState } from "react";
import { Image, View } from "react-native";
import Modal from "react-native-modal";
import { AppButton, Block, GradientView, Seperator, Text } from "../../common";
import { ButtonView } from "../../components";
import dummyData from "../../dummyData";
import { Colors, Images } from "../../theme";
import styles from "./styles";

const NotificationModal = (props, forwardedRef) => {
  const [data, setData] = useState({
    data: {},
    isVisible: false,
    onResetPress: () => {},
    onPress: () => {},
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

  return (
    <Modal
      backdropTransitionOutTiming={0}
      onBackdropPress={hideModal}
      style={styles.modal}
      isVisible={data.isVisible}
    >
      <GradientView style={styles.mainContainer}>
        <Block flex middle>
          <Image
            source={Images.icons.notificationModalIcon}
            style={styles.imageStyle}
          />
          <Text size={16} color={Colors.WHITE} samiBold>
            {"Reminder"}
          </Text>
          <Block marginTop={10}>
            <Text size={14} color={Colors.WHITE}>
              {"Upcoming event"}
            </Text>
            <Text size={14} color={Colors.WHITE} samiBold>
              {"Birthday of Lucas"}
            </Text>
          </Block>
        </Block>
        <ButtonView style={styles.thanksStyle} onPress={hideModal}>
          <Text size={14} color={Colors.WHITE} samiBold>
            {"Got it, thanks!"}
          </Text>
        </ButtonView>
      </GradientView>
    </Modal>
  );
};

export default React.forwardRef(NotificationModal);
