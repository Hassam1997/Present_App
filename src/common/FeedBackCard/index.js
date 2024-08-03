/** @format */

import { Image, Linking } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Colors, Images } from "../../theme";
import { ButtonView, ImageView } from "../../components";
import styles from "./styles";
import Block from "../Block";
import { StarRating, Text } from "..";
import { RATING_TYPE, STAR_SIZE } from "../../config/Constants";
import { NavigationService, Util } from "../../utils";
import { UserUtil } from "../../dataUtils";

const FeedBackCard = ({
  onPress,
  data,
  index,
  onButtonPress,
  isBanner,
  style,
  identifier,
}) => {
  const TagView = onPress ? ButtonView : Block;
  return (
    <TagView style={[styles.cardContainer, style]} onPress={onPress}>
      <Text p size={12} color={Colors.GREY}>
        {UserUtil.date(data)}
      </Text>
      <Block style={styles.titleView}>
        <Block row center>
          <ImageView
            source={
              Util.isPlatformIOS()
                ? { uri: UserUtil.biz_logo(data) }
                : UserUtil.biz_logo(data) != ""
                ? { uri: UserUtil.biz_logo(data) }
                : Images.images.placeholder
            }
            style={styles.imageView}
            placeholderStyle={styles.imageView}
            resizeMode="cover"
          />
          <Text p size={14} color={Colors.TEXT_GREY} style={styles.title}>
            {UserUtil.name(data)}
          </Text>
        </Block>
        {UserUtil.reward_points(data) && identifier == "completed" && (
          <Text samiBold size={18} color={Colors.PRIMARY}>
            {UserUtil.reward_points(data)}pt
          </Text>
        )}
      </Block>
      {identifier == "completed" && (
        <Block left style={styles.starView}>
          <StarRating
            size={STAR_SIZE.SMALL}
            unSelectedColor={Colors.GRAY97}
            rating={UserUtil.feedback_rating(data)}
            type={RATING_TYPE.RATING_WITHOUT_COUNT}
          />
        </Block>
      )}
      <Block style={styles.desc}>
        <Text
          p
          size={13}
          color={data?.rating ? Colors.FILTER : Colors.CANCEL_TEXT}
        >
          {UserUtil.message(data)}
        </Text>
      </Block>
      {isBanner && (
        <ImageView
          source={
            Util.isPlatformIOS()
              ? { uri: UserUtil.feedback_completed_banner(data) }
              : UserUtil.feedback_completed_banner(data) != ""
              ? { uri: UserUtil.feedback_completed_banner(data) }
              : Images.images.placeholder
          }
          style={styles.bannerView}
          placeholderStyle={styles.bannerView}
          resizeMode="cover"
        />
      )}
      {identifier == "completed" && (
        <>
          <Block row style={styles.clipboardStyle}>
            {Util.checkIfObjectExistsOrNot(data, "revised") &&
              data?.revised?.is_revised && (
                <>
                  <Text
                    p
                    size={12}
                    color={Colors.CANCEL_TEXT}
                    style={styles.clipboardText}
                  >
                    Kindly help us to improve our client experience.
                  </Text>
                  <ButtonView
                    style={styles.clipboardButton}
                    onPress={() => {
                      NavigationService.navigate("ReqFeedback", { data: data });
                    }}
                  >
                    <Text samiBold size={12} color={Colors.PRIMARY}>
                      Revise Feedback
                    </Text>
                  </ButtonView>
                </>
              )}
          </Block>
          {(!Util.checkIfObjectExistsOrNot(data, "revised") ||
            Util.checkIfObjectExistsOrNot(data, "revised")) &&
            !data?.revised?.is_revised && (
              <Block style={styles.socialButton}>
                <ButtonView
                  style={styles.googleButton}
                  onPress={() => {
                    Linking.openURL(UserUtil.feedback_google(data));
                  }}
                >
                  <Image source={Images.icons.googleIcon} />
                  <Text
                    p
                    size={12}
                    color={Colors.FILTER}
                    style={styles.socialText}
                  >
                    Google Business
                  </Text>
                </ButtonView>
                <ButtonView
                  style={styles.googleButton}
                  onPress={() => {
                    Linking.openURL(UserUtil.feedback_facebook(data));
                  }}
                >
                  <Image source={Images.icons.facebookIcon} />
                  <Text
                    p
                    size={12}
                    color={Colors.FILTER}
                    style={styles.socialText}
                  >
                    Facebook Business
                  </Text>
                </ButtonView>
              </Block>
            )}
        </>
      )}
    </TagView>
  );
};

FeedBackCard.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.any,
  index: PropTypes.any,
  onButtonPress: PropTypes.func,
  isBanner: PropTypes.bool,
};

FeedBackCard.defaultProps = {
  onPress: undefined,
  data: null,
  index: null,
  onButtonPress: () => {},
  isBanner: false,
};

export default FeedBackCard;
