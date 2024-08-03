/** @format */

//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from "react";
import { Images, Metrics, AppStyles, Colors, Fonts } from "../theme";
import { Image } from "react-native";
import { ButtonView, ImageButton, ImageView } from "../components";
import { NavigationService } from "../utils";
import { Block, Text } from "../common";
const headerColor = {
  headerStyle: {
    backgroundColor: "#313131",
    borderBottomWidth: 0,
  },
};
const removeBorder = {
  headerStyle: {
    borderBottomWidth: 0,
  },
};
const removeHeader = {
  headerShown: false,
};
const headerTransparent = {
  headerTransparent: true,
};
const removeHeaderLeft = {
  headerLeft: false,
};
const backImage = (tintColor = Colors.secondary.azure) => {
  return {
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Image
        source={Images.general.arrowLeftIcon}
        style={{
          marginLeft: Metrics.baseMargin,
        }}
      />
    ),
  };
};
const title = (headerTitle, fontSize, fontFamily, border) => ({
  headerTitle,
  headerStyle: {
    elevation: border ? 1 : 0,
    shadowColor: border ? Colors.HEADER_BORDER : Colors.WHITE,
    borderBottomWidth: border ? 1 : 0,
    borderBottomColor: border ? Colors.HEADER_BORDER : Colors.WHITE,
  },
  headerTitleStyle: {
    color: Colors.TITLE_TEXT,
    fontSize: fontSize,
    fontFamily: fontFamily,
  },
});
const customHeader = (
  headerTitle,
  onPress = () => NavigationService.pop()
) => ({
  headerTitle,
  headerStyle: {
    // elevation: border ? 1 : 0,
    // shadowColor: border ? Colors.HEADER_BORDER : Colors.WHITE,
  },
  headerTitleStyle: {
    color: Colors.TITLE_TEXT,
    fontSize: Metrics.ratio(17),
  },
  headerLeft: () => (
    <ButtonView
      onPress={onPress}
      style={{
        marginLeft: 10,
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={Images.icons.cross}
        style={{
          height: Metrics.ratio(25),
          width: Metrics.ratio(25),
        }}
      />
    </ButtonView>
  ),
});
const defaultNavOptions = (navOptions) => {
  return {
    defaultNavigationOptions: ({ navigation }) => navOptions,
  };
};
const navOptions = (navOptions) => {
  return {
    navigationOptions: ({ navigation }) => navOptions,
  };
};
const backButton = (
  onPress = () => NavigationService.pop(),
  image = Images.icons.arrowLeftIcon
) => {
  return {
    headerLeft: (props) => (
      <ButtonView
        onPress={onPress}
        style={{
          height: 24,
          width: 24,
          ...AppStyles.centerAligned,
          marginLeft: 10,
        }}
      >
        <Image source={image} resizeMode="contain" />
      </ButtonView>
    ),
  };
};
const logoTitle = (title) => {
  return {
    headerTitle: "",
    headerLeft: (props) => (
      <Block
        row
        style={{
          ...AppStyles.centerAligned,
          marginLeft: 16,
        }}
      >
        <Image
          source={Images.icons.kinektIcon}
          resizeMode="contain"
          style={{
            width: Metrics.ratio(36),
            height: Metrics.ratio(36),
          }}
        />
        <Text
          bold
          size={18}
          color={Colors.FILTER}
          style={{ marginLeft: Metrics.ratio(6) }}
        >
          {title}
        </Text>
      </Block>
    ),
  };
};
const homeHeader = (
  title,
  subTitle,
  profileImage = Images.images.careprovider
) => {
  return {
    headerTitle: "",
    headerLeft: (props) => (
      <Block
        style={{
          marginLeft: 16,
        }}
      >
        <Block row>
          <Block>
            <ImageView
              source={{ uri: profileImage ?? "" }}
              style={{ width: 35, height: 35, borderRadius: 35 / 2 }}
              borderRadius={50}
              placeholderStyle={{ width: 35, height: 35, borderRadius: 35 / 2 }}
            />
          </Block>
          <Block
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              bold
              style={{ fontSize: Fonts.size.size_14, color: Colors.BLACK }}
            >
              {title}
            </Text>
            <Text style={{ fontSize: Fonts.size.size_14, color: Colors.BLACK }}>
              {subTitle}
            </Text>
          </Block>
        </Block>
      </Block>
    ),
  };
};
const badgeButton = (icon, onPress, count) => {
  return {
    headerRight: (props) => (
      <ButtonView
        style={{
          ...AppStyles.centerAligned,
          marginRight: 13,
          padding: 3,
        }}
        onPress={onPress}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: Metrics.ratio(22),
            height: Metrics.ratio(22),
          }}
        />
        {count > 0 ? (
          <Block
            row
            style={{
              ...AppStyles.centerAligned,
              width: 18,
              height: 18,
              borderRadius: 18 / 2,
              backgroundColor: Colors.PRIMARY,
              position: "absolute",
              right: -1,
              bottom: 10,
              borderWidth: 1,
              borderColor: Colors.white,
            }}
          >
            <Text medium size={8} color={Colors.WHITE}>
              {count}
            </Text>
          </Block>
        ) : null}
      </ButtonView>
    ),
  };
};

const headerRightButton = (
  title,
  onPress,
  fontsize = 14,
  fontColor = Colors.SKY_BLUE_BORDER
) => {
  return {
    headerRight: (props) => (
      <ButtonView
        style={{
          ...AppStyles.centerAligned,
          marginRight: 16,
          padding: 3,
        }}
        onPress={onPress}
      >
        <Text samiBold size={fontsize} color={fontColor}>
          {title}
        </Text>
      </ButtonView>
    ),
  };
};
const headerRightImage = (
  onPress,
  image = Images.icons.notification,
  imageStyle = {}
) => {
  return {
    headerRight: (props) => (
      <ButtonView
        style={{
          ...AppStyles.centerAligned,
          marginRight: 16,
          padding: 3,
          paddingVertical: 10,
        }}
        onPress={onPress}
      >
        <Image source={image} style={imageStyle} />
      </ButtonView>
    ),
  };
};

const imageButton = (source, onPress) => {
  return {
    headerRight: (props) => (
      <ImageButton
        style={{
          ...AppStyles.centerAligned,
          marginRight: 13,

          alignSelf: "flex-end",
        }}
        source={source}
        onPress={onPress}
      />
    ),
  };
};

export {
  headerColor,
  removeBorder,
  headerTransparent,
  removeHeader,
  removeHeaderLeft,
  backImage,
  title,
  defaultNavOptions,
  navOptions,
  backButton,
  logoTitle,
  badgeButton,
  headerRightButton,
  imageButton,
  headerRightImage,
  homeHeader,
  customHeader,
};
