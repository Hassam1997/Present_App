/** @format */

import React, { useImperativeHandle, useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import { Util } from "../../utils";
import { ButtonView } from "../../components";
import { Block, Text } from "../../common";
import { Colors } from "../../theme";

interface BottomSheetData {
  title: string;
  isVisible: boolean;
  dataSet: any[];
  callback: (item: any) => void;
}

interface BottomSheetProps {
  forwardedRef: React.Ref<any>;
}

const BottomSheet = React.forwardRef<any, BottomSheetProps>(
  (props, forwardedRef) => {
    const [data, setData] = useState<BottomSheetData>({
      title: "",
      isVisible: false,
      dataSet: [],
      callback: () => {},
    });

    // hide modal function
    const hideModal = () => {
      setData({ ...data, isVisible: false });
    };

    // show and hide functions for ref
    useImperativeHandle(forwardedRef, () => ({
      show: (options: BottomSheetData = data) => {
        setData({ ...options, isVisible: true });
      },
      hide: hideModal,
    }));

    const { title, callback, isVisible, dataSet } = data;

    return (
      <Modal
        backdropTransitionOutTiming={0}
        style={styles.modal}
        isVisible={isVisible}
        useNativeDriver={Util.isPlatformAndroid()}
        coverScreen={true}
        animationIn={"fadeInUp"}
        animationOut={"fadeOutDown"}
        backdropOpacity={0.3}
      >
        <Block style={styles.mainContainer}>
          <Block style={styles.subContainer}>
            <Block style={styles.titleView}>
              <Text style={styles.title}>{title}</Text>
            </Block>
            <Block>
              {dataSet.map((item: any, index: number) => (
                <ButtonView
                  disableRipple={true}
                  key={index.toString()}
                  style={styles.dataView}
                  onPress={() => {
                    hideModal();
                    setTimeout(() => {
                      callback && callback(item);
                    }, 500);
                  }}
                >
                  <Text style={styles.textStyle}>
                    {item?.title ?? item?.name}
                  </Text>
                </ButtonView>
              ))}
            </Block>
          </Block>
          <ButtonView
            style={styles.cancelButton}
            disableRipple={true}
            onPress={hideModal}
          >
            <Text medium color={Colors.APP_TEXT} size={14}>
              Cancel
            </Text>
          </ButtonView>
        </Block>
      </Modal>
    );
  }
);

export default BottomSheet;
