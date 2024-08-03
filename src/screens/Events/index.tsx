/** @format */

import React, { useState } from "react";
import {
  ActivityTopTab,
  AdminEvents,
  AllEvents,
  Block,
  CustomizedEvents,
  GeneralEvents,
  SearchInput,
} from "../../common";
import styles from "./styles";
import { Fonts, Images } from "../../theme";
import { EventRoutes, JuniorEventRoutes } from "../../data";
import { Image } from "react-native";
import { ButtonView } from "../../components";
import { NavigationService, Util } from "../../utils";
import { headerRightImage, title } from "../../utils/NavigatorHelper";
import { getProfileData } from "../../ducks/auth";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks";

const Events = ({ navigation, route }: IsNavigationRequiredProps) => {
  const profileData = useSelector(getProfileData);
  const headerTitle = route?.params?.title ?? "Calendar";
  const [isValue, setValue] = useState<string>("");
  const debouncedSearchTerm = useDebounce(isValue, 500);

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm;
    }
    return "";
  };

  const onChangeText = (text: isTypeString) => {
    setValue(text);
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "allevents":
        return (
          <AllEvents
            hideCalendar={headerTitle == "Upcoming Events"}
            horizontalCalendar
            getSearch={getSearch}
          />
        );
      case "generalevents":
        return (
          <GeneralEvents
            hideCalendar={headerTitle == "Upcoming Events"}
            horizontalCalendar
            getSearch={getSearch}
          />
        );
      case "customizedevents":
        return (
          <CustomizedEvents
            hideCalendar={headerTitle == "Upcoming Events"}
            horizontalCalendar
            getSearch={getSearch}
          />
        );
      default:
        return null;
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...title("Events", 17, Fonts.manrope.bold, true),
      ...headerRightImage(() => {
        NavigationService.navigate("Notification");
      }),
    });
  }, []);

  return (
    <Block style={styles.containerStyle}>
      <Block style={styles.topTabContainer}>
        <SearchInput
          value={isValue}
          onChangeText={onChangeText}
          style={styles.btnSearch}
          iconStyle={styles.searchIcon}
          placeHolder={"Search events"}
          image={Images.icons.search}
          setValue={(e) => {
            setValue(e);
          }}
        />
      </Block>
      <ActivityTopTab
        renderScene={renderScene}
        tabData={EventRoutes}
        scrollEnabled
      />
      {Util.isEmpty(profileData) && (
        <ButtonView
          style={styles.createButton}
          onPress={() => {
            NavigationService.navigate("CreateEvent");
          }}
        >
          <Image source={Images.icons.addIcon} style={styles.addImage} />
        </ButtonView>
      )}
    </Block>
  );
};

export default Events;
