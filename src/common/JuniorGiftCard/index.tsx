/** @format */

import React from "react";
import { Image } from "react-native";
import styles from "./styles";
import Block from "../Block";
import { ButtonView, ImageView } from "../../components";
import { Text } from "..";
import { Colors, Images, Metrics } from "../../theme";
import { MyRegistryUtil } from "../../dataUtils";

const JuniorGiftCard: React.FC<JuniorGiftCard> = ({ item, onPress }) => {
  return (
    <ButtonView style={styles.container} onPress={() => onPress?.(item)}>
      <Block row center>
        <ImageView
          source={{ uri: MyRegistryUtil.image(item) }}
          style={styles.imageView}
          borderRadius={Metrics.ratio(60) / 2}
          placeholderStyle={styles.placeholderImageView}
        />
        <Block>
          <Text p size={14} medium>
            {MyRegistryUtil.full_name(item)}
          </Text>
          <Block row marginTop={10}>
            <Image source={Images.icons.calendar1} style={styles.iconStyle} />
            <Text
              p
              size={14}
              medium
              marginHorizontal={10}
              color={Colors.APP_TEXT}
            >
              {MyRegistryUtil.dob(item)}
            </Text>
          </Block>
        </Block>
      </Block>
      <Image source={Images.icons.arrowRightIcon} />
    </ButtonView>
  );
};

export default JuniorGiftCard;
