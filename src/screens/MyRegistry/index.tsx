/** @format */

import React, { useState } from "react";
import {
  Block,
  ActivityTopTab,
  MyGifts,
  GiftingGroups,
  TrackGifts,
  JuniorGifts,
  SavedGifts,
} from "../../common";
import styles from "./styles";
import { Fonts, Images, Metrics } from "../../theme";

import { NavigationService } from "../../utils";
import SearchInput from "../../common/SearchInput";
import { headerRightImage, title } from "../../utils/NavigatorHelper";
import { SELECT_EVENTS } from "../../dummyData";
import { MyRegistryRoutes } from "../../data";
import { useDebounce } from "../../hooks";

const MyRegistry = ({ navigation }: any) => {
  const [generalData, setGeneralData] = useState(SELECT_EVENTS);
  const [state, setState] = useState({
    inputText: "",
  });
  const [headerTitle, setHeaderTitle] = useState<string>("My Registry");

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...title(`${headerTitle}`, 16, Fonts.manrope.bold),
      ...headerRightImage(() => {
        NavigationService.navigate("Notification");
      }),
    });
  }, [navigation, headerTitle]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "MyGifts":
        return <MyGifts getSearch={getSearch} />;
      case "GiftingGroups":
        return <GiftingGroups getSearch={getSearch} />;
      case "TrackGifts":
        return <TrackGifts />;
      case "JuniorGifts":
        return <JuniorGifts getSearch={getSearch} />;
      case "SavedGifts":
        return <SavedGifts getSearch={getSearch} />;
      default:
        return null;
    }
  };

  return (
    <Block style={styles.containerSearch}>
      <Block paddingHorizontal={16}>
        <SearchInput
          value={isValue}
          onChangeText={onChangeText}
          style={styles.btnSearch}
          iconStyle={styles.searchIcon}
          placeHolder={"Search gifts, order ID, junior profile...."}
          image={Images.icons.search}
          setValue={(e) => {
            setValue(e);
          }}
        />
      </Block>
      <ActivityTopTab
        renderScene={renderScene}
        tabData={MyRegistryRoutes}
        scrollEnabled={true}
        setIndexVal={(e: number, route: any) => {
          setHeaderTitle(e == 0 ? "My Registry" : route[e]?.title);
        }}
        customStyles={{
          tabStyle: styles.tabStyle,
          indicatorStyle: styles.indicatorStyle,
        }}
      />
    </Block>
  );
};

export default MyRegistry;
