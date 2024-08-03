/** @format */
import React from "react";
import { Image, Linking, View } from "react-native";

import { Text, Block, CircleCheck, Checkbox } from "..";
import { ButtonView, ImageView } from "../../components";
import { Colors, Images } from "../../theme";
import styles from "./styles";
import { EventsDataUtil } from "../../dataUtils";
import { URL_LINK } from "../../config/Constants";

const ProductCardDetail: React.FC<ProductCardDetailProps> = ({
  item,
  onPress,
  index,
  type,
}) => {
  return (
    <ButtonView
      style={styles.card}
      onPress={() => {
        if (EventsDataUtil.platform(item) == URL_LINK.LINK) {
          Linking.openURL(EventsDataUtil.buy_link(item));
        }
        onPress?.(item);
      }}
    >
      <Block row ign>
        {EventsDataUtil.platform(item) == URL_LINK.LINK ? (
          <Image source={Images.icons.giftBoxIcon} style={styles.imageSyle} />
        ) : (
          <ImageView
            source={{ uri: EventsDataUtil.image(item) }}
            style={styles.imageSyle}
            placeholderStyle={styles.placeholderSyle}
            borderRadius={5}
          />
        )}
        <Block flex>
          <Text color={Colors.TITLE_TEXT} size={12} samiBold>
            {EventsDataUtil.title(item)}
          </Text>
          {EventsDataUtil.platform(item) != URL_LINK.LINK && (
            <Text size={16} samiBold color={Colors.TITLE_TEXT} marginTop={4}>
              {`$ ${EventsDataUtil.price(item)}.00`}
            </Text>
          )}
        </Block>
        <ButtonView style={styles.crossStyles} onPress={() => onPress?.(index)}>
          <Image source={Images.icons.crossIcon} style={styles.crossIcon} />
        </ButtonView>
      </Block>
    </ButtonView>
  );
};

export default ProductCardDetail;
