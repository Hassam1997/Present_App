/** @format */

import { Image } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Images } from "../../theme";
import { ButtonView, ImageView } from "../../components";
import styles from "./styles";
import Block from "../Block";
import { Text } from "..";
import { UserUtil } from "../../dataUtils";
import { Util } from "../../utils";

const CareProviderCard = ({
  onPress,
  data,
  index,
  onMessagePress,
  chatModule,
}) => {
  const TagView = onPress ? ButtonView : Block;
  return (
    <TagView style={[styles.cardContainer]} onPress={onPress}>
      <ImageView
        source={
          Util.isPlatformIOS()
            ? { uri: UserUtil.image(data) }
            : UserUtil.image(data) != ""
            ? { uri: UserUtil.image(data) }
            : Images.images.placeholder
        }
        style={styles.imageView}
        placeholderStyle={styles.imageView}
        resizeMode="cover"
      />
      <Block style={styles.innerContainer}>
        <Block style={styles.textContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {UserUtil.name(data)}
          </Text>
          {chatModule == false && (
            <>
              <Block style={styles.subView}>
                <Text style={styles.subTitle}>{UserUtil.purpose(data)}</Text>
                <Image source={Images.icons.starIcon} />
                <Text style={styles.distance}>{UserUtil.rating(data)}</Text>
              </Block>
              <Text style={styles.subTitle}>
                {Math.round(UserUtil.distance(data) / 1000).toFixed(2)} km
              </Text>
            </>
          )}
        </Block>
        {chatModule == false && (
          <ButtonView
            style={styles.imageContainer}
            onPress={() => onMessagePress(data)}
          >
            <Image source={Images.icons.messageIcon} />
          </ButtonView>
        )}
      </Block>
    </TagView>
  );
};

CareProviderCard.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.any,
  index: PropTypes.any,
  onMessagePress: PropTypes.func,
  chatModule: PropTypes.bool,
};

CareProviderCard.defaultProps = {
  onPress: () => {},
  data: null,
  index: null,
  onMessagePress: () => {},
  chatModule: false,
};

export default CareProviderCard;
