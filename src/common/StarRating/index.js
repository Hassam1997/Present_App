/** @format */

import React from "react";
import { View, Text } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import PropTypes from "prop-types";

import { AppStyles, Colors, Images } from "../../theme";
import styles from "./styles";
import { RATING_TYPE, STAR_SIZE } from "../../config/Constants";

const Rating = ({
  rating,
  type,
  count,
  onPress,
  size,
  selectedColor,
  unSelectedColor,
}) => {
  const isDisabled = [
    RATING_TYPE.RATING_WITH_COUNT,
    RATING_TYPE.RATING_WITHOUT_COUNT,
    RATING_TYPE.RATING_WITH_COUNT_TEXT,
  ].includes(type);

  return (
    <View style={AppStyles.rowAligned}>
      <View style={[styles.starContainer]}>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={rating}
          {...{ size, isDisabled }}
          starStyle={styles.starStyle}
          size={size}
          onFinishRating={onPress}
          selectedColor={
            selectedColor ? selectedColor : Colors.macaroniAndCheese
          }
          unSelectedColor={
            unSelectedColor ? unSelectedColor : Colors.unSelectedRating
          }
          starImage={Images.icons.starIconbeta}
        />
      </View>
      {type === RATING_TYPE.RATING_WITH_COUNT_TEXT ? (
        <Text style={styles.countText}>{`${rating} Ratings`}</Text>
      ) : null}
      {type === RATING_TYPE.RATING_WITH_COUNT ? (
        <Text style={styles.count}>{`${rating}`}</Text>
      ) : null}
      {type === RATING_TYPE.RATING_INPUT_WITH_TEXT ? (
        <Text style={styles.upto}>Upto 5</Text>
      ) : null}
    </View>
  );
};

const StarRating = (props) => {
  const { title, type, style, titleStyle, selectedColor, unSelectedColor } =
    props;
  return (
    <View {...{ style }}>
      {title && type === RATING_TYPE.RATING_INPUT ? (
        <Text style={[styles.titleTextStyle, titleStyle]}>{title}</Text>
      ) : null}
      <Rating {...props} />
    </View>
  );
};

StarRating.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  rating: PropTypes.number,
  type: PropTypes.oneOf(Object.values(RATING_TYPE)),
  count: PropTypes.number,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(Object.values(STAR_SIZE)).isRequired,
};
StarRating.defaultProps = {
  type: RATING_TYPE.RATING_INPUT,
  size: STAR_SIZE.XLARGE,
  rating: 0,
};

export default StarRating;
