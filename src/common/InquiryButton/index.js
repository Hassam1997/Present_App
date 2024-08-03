/** @format */

import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Block from "../Block";
import { Text } from "..";
import { Colors, Images } from "../../theme";
import { ButtonView } from "../../components";

const InquiryButton = ({ onPress }) => {
  return (
    <ButtonView style={styles.container} onPress={onPress}>
      <Image
        source={Images.icons.messageIcon}
        style={{
          tintColor: Colors.WHITE,
        }}
      />
      <Text medium size={16} color={Colors.WHITE}>
        Send Inquiry
      </Text>
    </ButtonView>
  );
};

InquiryButton.propTypes = {
  onPress: PropTypes.func,
};
InquiryButton.defaultProps = {
  onPress: () => {},
};

export default InquiryButton;
