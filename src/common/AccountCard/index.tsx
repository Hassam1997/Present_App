/** @format */

import React from "react";
import { Image } from "react-native";
import styles from "./styles";
import Block from "../Block";
import { ButtonView, ImageView } from "../../components";
import { Text } from "..";
import { Colors, Images } from "../../theme";
import { MyRegistryUtil, UserUtil } from "../../dataUtils";

const AccountCard: React.FC<AccountCardProps> = ({
  data,
  onPress,
  rightIcon = Images.icons.arrowRightIcon,
  imageStyle,
  iconStyle,
  disabled,
  showAdmin,
}) => {
  return (
    <ButtonView style={styles.container} onPress={onPress} disabled={disabled}>
      <Block row center>
        <Block marginRight={16}>
          <ImageView
            source={{
              uri:
                UserUtil.image(data) != ""
                  ? UserUtil.image(data)
                  : MyRegistryUtil.member_image(data),
            }}
            style={[styles.imageView, imageStyle]}
            borderRadius={50}
            placeholderStyle={[styles.imageView]}
          />
        </Block>
        <Text p size={14} medium>
          {UserUtil.full_name(data) != ""
            ? UserUtil.full_name(data)
            : MyRegistryUtil.member_full_name(data)}
        </Text>
      </Block>
      {showAdmin ? (
        <Text samiBold size={14} color={Colors.APP_TEXT}>
          Admin
        </Text>
      ) : (
        <ButtonView onPress={onPress}>
          <Image source={rightIcon} style={[iconStyle]} />
        </ButtonView>
      )}
    </ButtonView>
  );
};

export default AccountCard;
