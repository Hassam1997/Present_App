/** @format */
import React from "react";
import { Image, View } from "react-native";

import { Text, Block, CircleCheck, Checkbox } from "..";
import { ButtonView } from "../../components";
import { Colors, Images, Metrics } from "../../theme";
import styles from "./styles";

const GiftTrackCard: React.FC<GiftTrackCardProps> = ({ item, onPress }) => {
  return (
    <ButtonView style={styles.card} onPress={() => onPress?.(item)}>
      <Block flex row middle>
        <Image source={item.image} style={styles.imageSyle} />
        <Block flex>
          {item.title && (
            <Block row space={"between"}>
              <Text
                color={Colors.TITLE_TEXT}
                size={12}
                samiBold
                style={styles.titleTextStyle}
              >
                {item.title}
              </Text>
            </Block>
          )}
          {item.trackId && (
            <Text
              color={Colors.PRIMARY_PINK}
              size={12}
              samiBold
              paddingTop={Metrics.ratio(8)}
            >
              {`ID:${item.trackId}`}
            </Text>
          )}
          {item.deliveryDate && (
            <Block row paddingTop={Metrics.ratio(8)}>
              <Block row>
                <Image source={Images.icons.boxTick} />
                <Text
                  color={Colors.APP_TEXT}
                  size={12}
                  samiBold
                  marginHorizontal={6}
                >
                  {item.deliveryDate}
                </Text>
              </Block>
              <Block row paddingHorizontal={10}>
                <Image source={Images.icons.truckFast} />
                <Text
                  color={Colors.APP_TEXT}
                  size={12}
                  samiBold
                  marginHorizontal={6}
                >
                  {item.deliveryDate}
                </Text>
              </Block>
            </Block>
          )}
        </Block>
      </Block>
    </ButtonView>
  );
};

export default GiftTrackCard;
