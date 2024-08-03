/** @format */

import React, { useState } from "react";
import { Image, Text, View, FlatList, Alert } from "react-native";
import { Seperator, Switch } from "../../common";
import { ButtonView, Loader } from "../../components";
import { SETTING_DATA, SOCIAL_SETTING_DATA } from "../../dummyData";
import { Colors, Images } from "../../theme";
import { DataHandler, NavigationService, Util } from "../../utils";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  authLogout,
  authUpdateProfile,
  getNotification,
  getUserData,
} from "../../ducks/auth";

const Settings = ({ route, navigation }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const notificationToggle = useSelector(getNotification);
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggleChange = () => {
    dispatch(
      authUpdateProfile.request({
        payloadApi: {
          notification_enabled: !notificationToggle,
        },
      })
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const onPressItem = () => {
      if (item?.label === "Logout") {
        DataHandler.getAlertModalRef().show({
          title: "Log out",
          description: "Are you sure you want to logout?",
          acceptTitle: "Log out",
          callback: () => {
            dispatch(
              authLogout.request({
                cb: () => {
                  NavigationService.reset("Login");
                },
              })
            );
          },
        });
      } else if (item?.label === "Delete Account") {
        NavigationService.navigate("DeleteAccount");
      } else if (item?.route) {
        if (!Util.isEmpty(item?.param)) {
          NavigationService.navigate(item?.route, item?.param);
        } else {
          NavigationService.navigate(item?.route);
        }
      }
    };

    return (
      <ButtonView
        style={styles.cardView}
        onPress={onPressItem}
        accessibilityLabelKey={item.testLabel}
      >
        <View style={styles.imageView}>
          <Image source={item.icon} />
        </View>
        <Text
          style={[
            styles.titleStyle,
            item.label === "Delete Account" && {
              color: Colors.RADISH_PINK,
            },
          ]}
        >
          {item.label}
        </Text>
        {item.label !== "Delete Account" && item.label !== "Logout" && (
          <Image source={Images.icons.arrowRightIcon} />
        )}
      </ButtonView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pushNotifications}>
        <View style={styles.imageView}>
          <Image source={Images.icons.bellIcon} />
        </View>
        <Text style={styles.titleStyle}>{"Push Notifications"}</Text>
        <Switch
          value={notificationToggle}
          onChange={onToggleChange}
          toggleColor={Colors.PRIMARY_PINK}
        />
      </View>
      <Seperator single containerStyle={styles.seperatorStyle} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        bounces={false}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <Seperator single containerStyle={styles.seperatorStyle} />
        )}
        data={userData?.provider == null ? SETTING_DATA : SOCIAL_SETTING_DATA}
      />
      <Loader type={[authLogout.type, authUpdateProfile.type]} />
    </View>
  );
};

export default Settings;
