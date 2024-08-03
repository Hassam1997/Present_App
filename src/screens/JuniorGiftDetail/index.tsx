/** @format */

import React, { FC, useState } from "react";
import {
  ActivityTopTab,
  Block,
  SearchInput,
  SentToSantaTab,
  Text,
} from "../../common";
import styles from "./styles";
import { headerRightImage, title } from "../../utils/NavigatorHelper";
import { NavigationService, Util } from "../../utils";
import { Colors, Fonts, Images, Metrics } from "../../theme";
import { Image } from "react-native";
import { ImageView, Loader } from "../../components";
import { JuniorRoute } from "../../data";
import { useSelector } from "react-redux";
import { getProfileData } from "../../ducks/auth";
import { MyRegistryUtil } from "../../dataUtils";
import { SENT_TO } from "../../config/Constants";
import { useDebounce } from "../../hooks";
import { registryProductsPriority } from "../../ducks/myregistery";

const JuniorGiftDetail: FC<IsRouteRequiredProps> = ({ navigation, route }) => {
  const headerTitle = route?.params?.headerTitle ?? "";
  const [seacrhText, setSeacrhText] = useState("");
  const switchProfile = useSelector(getProfileData);
  const data = route?.params?.data ?? {};
  const debouncedSearchTerm = useDebounce(seacrhText, 500);

  React.useLayoutEffect(() => {
    Util.isEmpty(switchProfile)
      ? navigation.setOptions({
          ...title(headerTitle, 17, Fonts.manrope.bold, true),
        })
      : navigation.setOptions({
          ...headerRightImage(() => {
            NavigationService.navigate("Notification");
          }),
        });
  }, [navigation]);

  const getSearch = () => {
    if (seacrhText) {
      return debouncedSearchTerm;
    }
    return "";
  };
  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "sentToSanta":
        return (
          <SentToSantaTab
            identifierID={MyRegistryUtil.id(data) + SENT_TO.SANTA}
            sent_to={SENT_TO.SANTA}
            id={MyRegistryUtil.id(data)}
            getSearch={getSearch}
            juniorData={data}
          />
        );
      case "sentToParent":
        return (
          <SentToSantaTab
            identifierID={MyRegistryUtil.id(data) + SENT_TO.PARENT}
            sent_to={SENT_TO.PARENT}
            id={MyRegistryUtil.id(data)}
            getSearch={getSearch}
            juniorData={data}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Block flex style={styles.containerStyle}>
      {Util.isEmpty(switchProfile) && (
        <Block style={styles.container}>
          <Block row center>
            <ImageView
              source={{
                uri: switchProfile?.image ?? MyRegistryUtil.image(data),
              }}
              style={styles.imageView}
              borderRadius={Metrics.ratio(40)}
              placeholderStyle={styles.placeholderimageView}
            />
            <Block>
              <Text size={16} medium color={Colors.TITLE_TEXT}>
                {MyRegistryUtil.full_name(data)}
              </Text>
              <Block row marginTop={10}>
                <Image
                  source={Images.icons.calendar1}
                  style={styles.iconStyle}
                />
                <Text
                  p
                  size={14}
                  color={Colors.TITLE_TEXT}
                  medium
                  marginHorizontal={10}
                >
                  {MyRegistryUtil.dob(data)}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      )}
      <Block paddingHorizontal={16}>
        <SearchInput
          value={seacrhText}
          setValue={setSeacrhText}
          onChangeText={setSeacrhText}
          style={styles.btnSearch}
          iconStyle={styles.searchIcon}
          placeHolder={"Search gifts"}
        />
      </Block>
      <ActivityTopTab
        renderScene={renderScene}
        tabData={JuniorRoute}
        customStyles={{
          indicatorStyle: styles.indicatorStyle,
          indicatorContainerStyle: styles.indicatorContainerStyle,
          tabbarStyle: styles.tabbarStyle,
          labelStyle: styles.labelStyle,
          tabStyle: styles.tabStyle,
        }}
      />
      <Loader type={registryProductsPriority.type} />
    </Block>
  );
};
export default JuniorGiftDetail;
