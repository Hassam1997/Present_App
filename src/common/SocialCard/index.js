/** @format */

import { Image, Linking } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Colors, Images } from "../../theme";
import { ButtonView, ImageSlider, ImageView } from "../../components";
import styles from "./styles";
import Block from "../Block";
import { Text } from "..";
import { SocialShareUtil, Util } from "../../utils";
import { SocialUtil } from "../../dataUtils";

const SocialCard = ({ onPress, data, type, detail, style }) => {
  const TagView = onPress ? ButtonView : Block;
  return (
    <Block style={[styles.main, style]}>
      <TagView style={[styles.cardContainer]} onPress={onPress}>
        <Block style={styles.buttonView}>
          <ButtonView
            onPress={() => {
              Linking.openURL(SocialUtil.fullpost(data));
            }}
          >
            <Text p size={14} color={Colors.PRIMARY} style={styles.view}>
              view full post
            </Text>
          </ButtonView>
        </Block>
        <Block style={styles.titleView}>
          <Block row center>
            <ImageView
              source={
                Util.isPlatformIOS()
                  ? { uri: SocialUtil.socialIcon(data) }
                  : SocialUtil.socialIcon(data) != ""
                  ? { uri: SocialUtil.socialIcon(data) }
                  : Images.images.placeholder
              }
              style={styles.imageView}
              placeholderStyle={styles.imageView}
              resizeMode="cover"
            />
            <Text p size={14} color={Colors.TEXT_GREY} style={styles.title}>
              {SocialUtil.title(data)}
            </Text>
            {SocialUtil.platforms(data).includes("facebook") && (
              <Image
                source={Images.icons.facebookIcon}
                style={styles.socialIcon}
              />
            )}
            {SocialUtil.platforms(data).includes("instagram") && (
              <Image
                source={Images.icons.instaIcon}
                style={styles.socialIconInsta}
              />
            )}
          </Block>
          {/* <Text samiBold size={18} color={Colors.PRIMARY}>
            {data?.points}pt
          </Text> */}
        </Block>
        <Block style={styles.desc}>
          <Text p size={13} color={Colors.TEXT_GREY} style={styles.descText}>
            {SocialUtil.message(data)}
          </Text>
        </Block>
        {detail ? (
          <>
            <ImageSlider
              data={SocialUtil.bannerImages(data)}
              paginationRender={true}
              isVideo={SocialUtil.isVideo(data)}
              videoUri={SocialUtil.bannerImages(data)[0]}
            />
            <Block style={styles.likeView}>
              <Block row center>
                <Image source={Images.icons.likeIcon} />
                <Text
                  p
                  size={14}
                  color={Colors.CANCEL_TEXT}
                  style={styles.likeText}
                >
                  {SocialUtil.likeCount(data)}
                </Text>
                <Image source={Images.icons.commentIcon} />
                <Text
                  p
                  size={14}
                  color={Colors.CANCEL_TEXT}
                  style={styles.likeText}
                >
                  {SocialUtil.commentCount(data)}
                </Text>
              </Block>
            </Block>
          </>
        ) : (
          <>
            <ImageSlider
              data={SocialUtil.bannerImages(data)}
              isVideo={SocialUtil.isVideo(data)}
            />
            <Block row style={styles.buttonStyle}>
              {type == "Completed" ? null : (
                <Block style={styles.likeView}>
                  <Block row center>
                    <Image source={Images.icons.likeIcon} />
                    <Text
                      p
                      size={14}
                      color={Colors.CANCEL_TEXT}
                      style={styles.likeText}
                    >
                      {SocialUtil.likeCount(data)}
                    </Text>
                    <Image source={Images.icons.commentIcon} />
                    <Text
                      p
                      size={14}
                      color={Colors.CANCEL_TEXT}
                      style={styles.likeText}
                    >
                      {SocialUtil.commentCount(data)}
                    </Text>
                  </Block>
                  <ButtonView
                    style={styles.shareButton}
                    onPress={() => {
                      SocialShareUtil.SocialShare(
                        SocialUtil.fullpost(data),
                        SocialUtil.postId(data),
                        (success) => {
                          Util.showCustomMessage(success, "success");
                        },
                        (error) => {
                          Util.showCustomMessage(error);
                        }
                      );
                    }}
                  >
                    <Text medium size={12} color={Colors.WHITE}>
                      Share
                    </Text>
                  </ButtonView>
                </Block>
              )}
            </Block>
          </>
        )}
      </TagView>
    </Block>
  );
};

SocialCard.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.any,
  index: PropTypes.any,
  onButtonPress: PropTypes.func,
  type: PropTypes.string,
  detail: PropTypes.bool,
  style: PropTypes.object,
};

SocialCard.defaultProps = {
  onPress: undefined,
  data: null,
  index: null,
  onButtonPress: () => {},
  type: "",
  detail: false,
  style: {},
};

export default SocialCard;
