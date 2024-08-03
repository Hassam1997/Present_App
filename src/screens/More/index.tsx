/** @format */

import React, { FC } from "react";
import { Block, Seperator, Text } from "../../common";
import styles from "./styles";
import { headerRightImage } from "../../utils/NavigatorHelper";
import { NavigationService } from "../../utils";
import { FlatList, Image } from "react-native";
import { Colors, Images, Metrics } from "../../theme";
import { ButtonView, ImageView } from "../../components";
import {
  JUNIOR_CRAD_DATA,
  JUNIOR_PROFILE,
  JUNIOR_PROFILE_CRAD_DATA,
} from "../../dummyData";
import { PROFILE_LIST } from "../../data";
import ScrollViewApi from "../../components/ScrollViewApi";
import { authGetProfile, getUserData } from "../../ducks/auth";
import { UserUtil } from "../../dataUtils";

const More: FC<IsNavigationRequiredProps> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...headerRightImage(() => {
        NavigationService.navigate("Notification");
      }),
    });
  }, [navigation]);

  const renderItem = ({ item, index }: RenderItemProps) => {
    return (
      <ButtonView
        onPress={() => {
          NavigationService.navigate("ConfirmPassword", {
            isSwitchProfile: item,
          });
        }}
        style={styles.profileButton}
      >
        <ImageView
          source={{ uri: UserUtil.image(item) }}
          style={styles.profileImage}
          placeholderStyle={styles.profileImage}
          borderRadius={8}
        />
        <Text samiBold size={13} color={Colors.TITLE_TEXT} marginTop={16}>
          {item.title}
        </Text>
      </ButtonView>
    );
  };

  const renderContent = (apiData) => {
    return (
      <Block flex style={styles.containerStyle}>
        <Block style={styles.profileView}>
          <Block row center>
            <ImageView
              source={{ uri: apiData.image }}
              style={styles.imageView}
              placeholderStyle={styles.imageView}
              borderRadius={40}
            />
            <Block marginLeft={10}>
              <Text samiBold size={15} color={Colors.TITLE_TEXT}>
                {UserUtil.full_name(apiData)}
              </Text>
              <Text medium size={12} color={Colors.TITLE_TEXT}>
                {UserUtil.email(apiData)}
              </Text>
            </Block>
          </Block>
          <ButtonView
            onPress={() => {
              NavigationService.navigate("EditProfile");
            }}
          >
            <Image source={Images.icons.editIcon} />
          </ButtonView>
        </Block>
        <Block paddingHorizontal={Metrics.ratio(16)}>
          {UserUtil.phoneNumberOnly(apiData) != "" && (
            <Block row marginTop={10}>
              <Image source={Images.icons.callIcon} />
              <Text medium size={12} color={Colors.TITLE_TEXT} left={10}>
                {UserUtil.phone_number(apiData)}
              </Text>
            </Block>
          )}
          <Block row marginTop={10}>
            <Image source={Images.icons.locationIcon} />
            <Text medium size={12} color={Colors.TITLE_TEXT} left={10}>
              {UserUtil.address(apiData)}
            </Text>
          </Block>
        </Block>
        <Seperator single={true} />
        <Block
          row
          align
          space={"between"}
          paddingHorizontal={Metrics.ratio(16)}
        >
          <Text samiBold size={15} color={Colors.TITLE_TEXT}>
            Junior Profiles
          </Text>
          <ButtonView
            onPress={() => {
              NavigationService.navigate("JuniorProfileListing");
            }}
          >
            <Text samiBold size={14} color={Colors.PRIMARY_PINK}>
              View All
            </Text>
          </ButtonView>
        </Block>
        <Block marginLeft={5}>
          <FlatList
            data={UserUtil.juniors(apiData)}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Block>
        <Block paddingHorizontal={Metrics.ratio(16)} marginTop={16}>
          {PROFILE_LIST.map((item, index) => {
            return (
              <ButtonView
                key={index.toString()}
                onPress={() => {
                  NavigationService.navigate(item?.route);
                }}
              >
                <Block row align space={"between"}>
                  <Block row align>
                    <Image source={item.icon} />
                    <Text medium size={14} color={Colors.TITLE_TEXT} left={10}>
                      {item.title}
                    </Text>
                  </Block>
                  <Image source={Images.icons.arrowRightIcon} />
                </Block>
                {PROFILE_LIST.length - 1 != index && <Seperator single />}
              </ButtonView>
            );
          })}
        </Block>
      </Block>
    );
  };
  return (
    <>
      <Block flex backgroundColor={Colors.WHITE}>
        <ScrollViewApi
          // payload={{ id: event_id }}
          actionType={authGetProfile.type}
          requestAction={authGetProfile.request}
          selectorData={getUserData}
          content={renderContent}
          showsVerticalScrollIndicator={false}
        />
      </Block>
    </>
  );
};
export default More;
