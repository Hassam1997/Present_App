/** @format */

import React, { useImperativeHandle, useState } from "react";
import { FlatList, Image } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import { Util } from "../../utils";
import { ButtonView } from "../../components";
import { Block, Text } from "../../common";

const AttachmentModal = (props, forwardedRef) => {
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

  const { callback, isVisible, dataSet } = data;

  const renderItem = ({ item, index }) => {
    return (
      <ButtonView
        style={styles.subContainer}
        onPress={() => {
          hideModal();
          setTimeout(() => {
            callback && callback(item.key);
          }, 500);
        }}
      >
        <Image source={item.image} />
        <Text style={styles.text}>{item.title}</Text>
      </ButtonView>
    );
  };

  return (
    <Modal
      backdropTransitionOutTiming={0}
      style={styles.modal}
      isVisible={isVisible}
      useNativeDriver={Util.isPlatformAndroid()}
      backdropOpacity={0.1}
      animationOut={"fadeOut"}
      onBackdropPress={hideModal}
    >
      <Block style={styles.mainContainer}>
        <FlatList data={dataSet} numColumns={3} renderItem={renderItem} />
      </Block>
    </Modal>
  );
};

export default React.forwardRef(AttachmentModal);
