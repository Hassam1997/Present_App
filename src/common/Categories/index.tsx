/** @format */

import React, { FC, useCallback } from "react";
import { Text, SectionHeader } from "../../common";
import styles from "./styles";
import { CATEGORY_DATA } from "../../dummyData";
import { NavigationService } from "../../utils";
import { ButtonView, FlatListApi, ImageView } from "../../components";
import { getCategories, homeCategories } from "../../ducks/home";
import { DashBoardUtil } from "../../dataUtils";
import { Colors } from "../../theme";

const Category: FC = () => {
  const renderItems = useCallback(
    ({ item }: { item: IPropsCategoryItems }) => (
      <ButtonView
        debounceTime={0}
        style={styles.categoryBlock}
        onPress={() => {
          NavigationService.navigate("AllProducts", {
            headerTitle: DashBoardUtil.name(item),
            categoryId: [DashBoardUtil.id(item)],
          });
        }}
      >
        <ImageView
          source={{ uri: DashBoardUtil.image(item) }}
          style={styles.categoryImage}
          resizeMode="cover"
          placeholderStyle={styles.categoryImage}
        />
        <Text
          p
          size={14}
          style={styles.categoryText}
          color={Colors.TITLE_TEXT}
          numberOfLines={2}
        >
          {DashBoardUtil.name(item)}
        </Text>
      </ButtonView>
    ),
    [CATEGORY_DATA]
  );

  return (
    <>
      <SectionHeader
        text="Categories"
        onPress={() => {
          NavigationService.navigate("AllCategories");
        }}
      />
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
        }}
        actionType={homeCategories.type}
        isrefreshControl={true}
        selectorData={getCategories}
        requestAction={homeCategories.request}
        renderItem={renderItems}
        horizontal={true}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </>
  );
};

export default React.memo(Category);
