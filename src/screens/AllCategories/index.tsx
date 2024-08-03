/** @format */

import React, { useState } from "react";
import { Block, GradientView, Text } from "../../common";
import styles from "./styles";
import {
  ButtonView,
  FlatListApi,
  ImageView,
  ProductCard,
} from "../../components";
import { FlatList, Image } from "react-native";
import { CATEGORY, PRESENT_SELECTION_DATA } from "../../dummyData";
import SearchInput from "../../common/SearchInput";
import { Colors, Fonts, Images } from "../../theme";
import { DataHandler, NavigationService } from "../../utils";
import { title } from "../../utils/NavigatorHelper";
import { PRODUCT_REPORT_OPTION_DATA } from "../../config/Constants";
import { ACENDING_DECENDING_OPTIONS } from "../../data";
import { getCategories, homeCategories } from "../../ducks/home";
import { DashBoardUtil } from "../../dataUtils";
import { useDebounce } from "../../hooks";

const AllCategories = ({ route, navigation }: IsNavigtionProps) => {
  const [isValue, setValue] = useState<string>("");
  const [isIdentifier, setIdentifier] = useState<string>("name");
  const debouncedSearchTerm = useDebounce(isValue, 500);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...title("All Categories", 17, Fonts.manrope.bold, true),
    });
  }, [navigation]);

  const onChangeText = (text: isTypeString) => {
    setValue(text);
  };

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm;
    }
    return "";
  };

  const renderItems = ({ item, index }: RenderItemProps) => {
    return (
      <ButtonView
        style={[styles.itemContainer]}
        onPress={() => {
          NavigationService.navigate("AllProducts", {
            headerTitle: DashBoardUtil.name(item),
            categoryId: [item.id],
          });
        }}
        debounceTime={0}
      >
        <ImageView
          source={{ uri: DashBoardUtil.image(item) }}
          style={styles.imageStyle}
          resizeMode="cover"
          placeholderStyle={styles.placeholderImageStyle}
        />
        <Text style={styles.textStyle}> {DashBoardUtil.name(item)}</Text>
      </ButtonView>
    );
  };

  const renderHeader = () => {
    return (
      <Block style={styles.containerStyleHeader}>
        <SearchInput
          onFilter={() => {
            DataHandler.getBottomSheetModalRef().show({
              title: "Select Option",
              dataSet: ACENDING_DECENDING_OPTIONS,
              callback: (item) => {
                if (item?.identifier == "acending") {
                  setIdentifier("name");
                } else {
                  setIdentifier("-name");
                }
              },
            });
          }}
          isFiltered={true}
          filterIcon={Images.icons.sortFilter}
          style={styles.btnSearch}
          iconStyle={styles.searchIcon}
          placeHolder={"Search"}
          image={Images.icons.search}
          value={isValue}
          onChangeText={onChangeText}
          setValue={(e) => {
            setValue(e);
          }}
        />
      </Block>
    );
  };

  return (
    <Block style={styles.containerStyle}>
      {renderHeader()}
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          search: getSearch(),
          ordering: isIdentifier,
        }}
        contentContainerStyle={styles.listContainerStyle}
        showsVerticalScrollIndicator={false}
        actionType={homeCategories.type}
        selectorData={getCategories}
        requestAction={homeCategories.request}
        renderItem={renderItems}
        keyExtractor={(item, index) => `${item.id}+${index}`}
        // ListHeaderComponent={renderHeader}
      />
    </Block>
  );
};

export default AllCategories;
