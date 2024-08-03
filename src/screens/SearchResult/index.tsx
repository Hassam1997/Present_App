/** @format */

import React, { useCallback, useState } from "react";
import {
  ActivityTopTab,
  Block,
  GiftingGroups,
  JuniorGifts,
  MyGifts,
  SavedGifts,
  Text,
  TrackGifts,
} from "../../common";
import styles from "./styles";
import { Images, Metrics } from "../../theme";
import { NavigationService } from "../../utils";
import SearchInput from "../../common/SearchInput";
import { Image } from "react-native";
import { ButtonView } from "../../components";
import Products from "./products";
import Events from "./events";
import { PRESENT_SELECTION_DATA } from "../../dummyData";
import { MyRegistryRoutes } from "../../data";
import { homeGlobalSearch } from "../../ducks/home";

const SearchResult = ({ route }: ISearchProps) => {
  const { selectedSearchValue } = route?.params;
  const isRegistry = route.params?.isRegistry ?? false;
  const [isApiObject, setApiObject] = useState<any>({});
  const [queryParameter, setQueryParameter] =
    useState<any>(selectedSearchValue);

  const callBack = (data: any) => {
    NavigationService.goBack();
    setApiObject(data);
  };

  const [index, setIndex] = useState<number>(0);

  const renderMyRegistryScene = ({ route }: any) => {
    switch (route.key) {
      case "MyGifts":
        return <MyGifts showHeader={false} />;
      case "GiftingGroups":
        return <GiftingGroups showHeader={false} />;
      case "TrackGifts":
        return <TrackGifts />;
      case "JuniorGifts":
        return <JuniorGifts />;
      case "SavedGifts":
        return <SavedGifts />;
      default:
        return null;
    }
  };

  const routes = [
    { key: "products", title: "Products" },
    { key: "events", title: "Events" },
  ];

  const renderProducts = useCallback(
    () => (
      <Block flex paddingHorizontal={Metrics.ratio(10)}>
        <Products query={queryParameter} isApiObject={isApiObject} />
      </Block>
    ),
    []
  );
  const renderEvents = useCallback(
    () => <Events query={queryParameter} isApiObject={isApiObject} />,
    []
  );
  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "products":
        return renderProducts();
      case "events":
        return renderEvents();

      default:
        return null;
    }
  };

  const renderFilterIcon = () => (
    <ButtonView
      onPress={() => {
        if (index == 0) {
          NavigationService.navigate("Filter", {
            dispatchType: homeGlobalSearch,
            callBack: callBack,
            queryParameter: queryParameter,
            selectedFilter: isApiObject,
          });
        } else {
          NavigationService.navigate("Filter", {
            isEventFilter: true,
            dispatchType: homeGlobalSearch,
            callBack: callBack,
            queryParameter: queryParameter,
            selectedFilter: isApiObject,
          });
        }
      }}
      style={styles.filterIconContainer}
    >
      {/* <Block style={styles.filterValueLength}>
        <Text style={styles.filterValueLengthText}>5</Text>
      </Block> */}
      <Image source={Images.icons.filter} />
    </ButtonView>
  );
  return (
    <Block style={styles.containerSearch}>
      <SearchInput
        paddingHorizontal={Metrics.ratio(15)}
        value={selectedSearchValue}
        style={styles.btnSearch}
        iconStyle={styles.searchIcon}
        onCancel={() => NavigationService.pop()}
        placeHolder={"Search"}
        image={Images.icons.search}
        disaled
      />
      <Block flex>
        {!isRegistry && renderFilterIcon()}
        <ActivityTopTab
          setIndexVal={(item: number) => setIndex(item)}
          renderScene={isRegistry ? renderMyRegistryScene : renderScene}
          tabData={isRegistry ? MyRegistryRoutes : routes}
          scrollEnabled
          customStyles={
            !isRegistry
              ? {
                  indicatorStyle: styles.indicatorStyle,
                  indicatorContainerStyle: styles.indicatorContainerStyle,
                  tabbarStyle: styles.tabbarStyle,
                  labelStyle: styles.labelStyle,
                  tabStyle: styles.tabStyle,
                }
              : {}
          }
        />
      </Block>
    </Block>
  );
};

export default SearchResult;
