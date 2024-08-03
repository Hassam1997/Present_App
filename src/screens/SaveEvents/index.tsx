/** @format */

import React, { useState } from "react";
import { AppButton, Block, ActivityTopTab } from "../../common";
import styles from "./styles";
import { Images, Metrics } from "../../theme";

import { NavigationService, Util } from "../../utils";
import SearchInput from "../../common/SearchInput";
import General from "./general";
import Customized from "./customized";
import { backButton, customHeader } from "../../utils/NavigatorHelper";
import { SELECT_EVENTS } from "../../dummyData";
import { EventsRoutes } from "../../data";
import { getProfileData } from "../../ducks/auth";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks";
import { getCustomEventList, getGeneralEventList } from "../../ducks/events";

const SaveEvents = ({ navigation, route }: IsNavigationRequiredProps) => {
  const profileData = useSelector(getProfileData);
  const getGeneralEventData = useSelector(getGeneralEventList);
  const getCustomEventData = useSelector(getCustomEventList);

  const isEditContact = route?.params?.isEditContact ?? false;
  const onChange = route?.params?.onChange ?? undefined;
  const callback = route?.params?.callback ?? undefined;
  const productData = route?.params?.data ?? undefined;
  const arrayKey = route?.params?.arrayKey ?? "";

  const [eventState, setEventState] = useState<any>("");
  const [selectedIdentifier, setSelectedIdentifier] = useState<any>(0);
  const [isValue, setValue] = useState<string>("");
  const debouncedSearchTerm = useDebounce(isValue, 500);

  const selectionHanlder = (selectedValue: number) => {
    setSelectedIdentifier(selectedValue);
  };

  const selectionEvent = (selectedValue: string) => {
    setEventState(selectedValue);
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "general":
        return (
          <General
            getSearch={getSearch}
            onPress={selectionHanlder}
            onPressTitile={selectionEvent}
            selectedIdentifier={selectedIdentifier}
          />
        );

      case "customized":
        return (
          <Customized
            getSearch={getSearch}
            onPress={selectionHanlder}
            onPressTitile={selectionEvent}
            selectedIdentifier={selectedIdentifier}
          />
        );

      default:
        return null;
    }
  };

  React.useEffect(() => {
    renderHeaderComponent();
  }, [navigation]);

  const renderHeaderComponent = () => {
    navigation.setOptions({
      ...backButton(() => {
        NavigationService.pop();
      }, Images.icons.cross),
      ...customHeader("Select Events"),
    });
  };

  const onChangeText = (text: isTypeString) => {
    setValue(text);
  };

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm;
    }
    return "";
  };

  return (
    <Block style={styles.containerSearch}>
      <SearchInput
        paddingHorizontal={Metrics.ratio(16)}
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
      <ActivityTopTab
        renderScene={renderScene}
        tabData={EventsRoutes}
        count={[
          `General (${getGeneralEventData?.length ?? 0})`,
          `Customized (${getCustomEventData?.length ?? 0})`,
        ]}
        customStyles={{
          indicatorStyle: styles.indicatorStyle,
          indicatorContainerStyle: styles.indicatorContainerStyle,
          tabbarStyle: styles.tabbarStyle,
          labelStyle: styles.labelStyle,
          tabStyle: styles.tabStyle,
        }}
      />
      <Block style={[styles.bottomContainer]}>
        <AppButton
          disabled={selectedIdentifier != 0 ? false : true}
          title={
            isEditContact
              ? "Save"
              : Util.isEmpty(profileData)
              ? "Next"
              : "Send To Parent"
          }
          onPress={() => {
            if (Util.isEmpty(profileData)) {
              if (isEditContact) {
                onChange?.(eventState);
                callback?.(selectedIdentifier);
                NavigationService.goBack();
              } else {
                NavigationService.navigate("SelectMembers", {
                  data: productData,
                  filter_key: selectedIdentifier,
                  arrayKey: arrayKey,
                });
              }
            } else {
              callback?.(selectedIdentifier);
              // Util.showCustomMessage(
              //   "The gift has been Sent to Santa successfully!",
              //   "success"
              // );
              NavigationService.goBack();
            }
          }}
        />
      </Block>
    </Block>
  );
};

export default SaveEvents;
