/** @format */

// /** @format */

import React from "react";
import { Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Images, Metrics } from "../../theme";
import { DataHandler, NavigationService, Util } from "../../utils";
import { styles } from "./styles";
import {
  ContactsScreen,
  Events,
  HomeScreen,
  JuniorGiftDetail,
  More,
  MyRegistry,
} from "../../screens";
import { getIsGuestUser, getProfileData, getUserData } from "../../ducks/auth";
import { UserUtil } from "../../dataUtils";
import { ImageView } from "../../components";

const navigationItems = [
  {
    label: "Home",
    accessibilityLabel: "Home tab",
    icon: Images.tabIcons.home,
    iconAct: Images.tabIcons.homeAct,
    component: HomeScreen,
    customIconStyles: {},
  },
  {
    label: "My Registry",
    accessibilityLabel: "registry tab",
    icon: Images.tabIcons.gift,
    iconAct: Images.tabIcons.giftAct,
    component: MyRegistry,
    customIconStyles: {},
  },
  {
    label: "Events",
    accessibilityLabel: "events tab",
    icon: Images.tabIcons.calendar,
    iconAct: Images.tabIcons.calendarAct,
    component: Events,
    customIconStyles: {},
  },
  {
    label: "Contacts",
    accessibilityLabel: "contacts tab",
    icon: Images.tabIcons.user,
    iconAct: Images.tabIcons.userAct,
    component: ContactsScreen,
    customIconStyles: {},
  },
  {
    label: "More",
    accessibilityLabel: "more tab",
    icon: Images.icons.avatar,
    iconAct: Images.icons.avatar,
    component: More,
    customIconStyles: { borderRadius: 28 / 2 },
  },
];

const Tab = createBottomTabNavigator();

export default function BottomTab({ route }) {
  const switchProfile = getProfileData(DataHandler.getStoreState());
  const userData = getUserData(DataHandler.getStoreState());
  const isGuest = getIsGuestUser(DataHandler.getStoreState());
  const isConditionMet = Object.keys(switchProfile).length == 0;

  const renderTabs = () =>
    navigationItems
      .filter((item) => isConditionMet || item.label !== "Contacts")
      .map(
        (
          {
            label,
            icon,
            iconAct,
            accessibilityLabel,
            component,
            customIconStyles,
          },
          index
        ) => {
          return (
            <Tab.Screen
              key={index.toString()}
              name={label}
              component={
                label === "My Registry" && !isConditionMet
                  ? JuniorGiftDetail
                  : component
              }
              listeners={
                !isConditionMet && label === "More"
                  ? {
                      tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();
                        //Any custom code here
                        NavigationService.navigate("ChooseAccount", {
                          juniorProfile: true,
                        });
                      },
                    }
                  : {}
              }
              options={{
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <>
                      {label === "More" ? (
                        <ImageView
                          source={{
                            uri: isGuest
                              ? UserUtil.image(switchProfile)
                              : UserUtil.image(userData),
                          }}
                          style={[styles.icon, customIconStyles]}
                          borderRadius={50}
                          placeholderStyle={[styles.iconPlaceholder]}
                        />
                      ) : (
                        <Image
                          source={
                            label === "More"
                              ? {
                                  uri: isGuest
                                    ? UserUtil.image(switchProfile)
                                    : UserUtil.image(userData),
                                }
                              : iconAct
                          }
                          resizeMode="contain"
                          style={[styles.icon, customIconStyles]}
                        />
                      )}
                      <Text style={styles.labelFontInActive}>{label}</Text>
                    </>
                  ) : (
                    <>
                      {label === "More" ? (
                        <ImageView
                          source={{
                            uri: isGuest
                              ? UserUtil.image(switchProfile)
                              : UserUtil.image(userData),
                          }}
                          style={[styles.icon, customIconStyles]}
                          borderRadius={50}
                          placeholderStyle={[styles.iconPlaceholder]}
                        />
                      ) : (
                        <Image
                          source={
                            label === "More"
                              ? {
                                  uri: isGuest
                                    ? UserUtil.image(switchProfile)
                                    : UserUtil.image(userData),
                                }
                              : icon
                          }
                          resizeMode="contain"
                          style={[styles.icon, customIconStyles]}
                        />
                      )}
                      <Text style={styles.labelFont}>{label}</Text>
                    </>
                  ),
                tabBarLabelStyle: { ...styles.labelFont },
                tabBarShowLabel: false,
                tabBarAccessibilityLabel: accessibilityLabel,
                headerShown: true,
              }}
            />
          );
        }
      );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTitleStyle: {
          color: Colors.BLACK,
        },
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        // Tab Bottom
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarStyle: {
          borderTopWidth: 0,
          height: Util.isPlatformIOS()
            ? Metrics.screenHeight * 0.12
            : Metrics.ratio(80),
          backgroundColor: Colors.BLACK,
        },
        tabBarBackground: () => (
          <Image
            source={Images.images.bottomTabBackgroundImage}
            resizeMode="cover"
            style={{
              width: Metrics.screenWidth,
              backgroundColor: Colors.TRANSPARENT,
            }}
          />
        ),
      }}
    >
      {renderTabs()}
    </Tab.Navigator>
  );
}
