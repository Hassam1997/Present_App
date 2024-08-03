/** @format */

import React, { FC, useCallback, useState } from "react";
import { FlatListApi, ProductCard } from "../../components";
import { NavigationService } from "../../utils";
import styles from "./styles";
import { getSearchProducts, homeGlobalSearch } from "../../ducks/home";
import { Block } from "../../common";

const TopProducts = ({ query, isApiObject }: any) => {
  const navigationHandler = () => NavigationService.navigate("ProductDetail");

  const renderItems = useCallback(
    ({ item, index }: RenderItemProps) => (
      <ProductCard
        customStyle={styles.customCardContainer}
        data={item}
        index={index}
        onPress={navigationHandler}
      />
    ),
    []
  );

  return (
    <Block flex>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          query: query,
          ...isApiObject,
        }}
        actionType={homeGlobalSearch.type}
        numColumns={2}
        selectorData={getSearchProducts}
        requestAction={homeGlobalSearch.request}
        renderItem={renderItems}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </Block>
  );
};

export default React.memo(TopProducts);
