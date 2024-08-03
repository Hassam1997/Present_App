/** @format */

import React from "react";
import { FlatListApi, ProductCard } from "../../components";
import { SectionHeader } from "../../common";
import { NavigationService } from "../../utils";
import styles from "./styles";
import { getAllProducts, homeAllProducts } from "../../ducks/home";

const AllProducts = ({ arrayKey }: any) => {
  const navigationHandler = () => NavigationService.navigate("ProductDetail");
  const renderItems = ({ item, index }: RenderItemProps) => {
    return (
      <ProductCard
        customStyle={styles.containerStyle}
        data={item}
        index={index}
        imageAbsoluteTop
        arrayKey={arrayKey}
      />
    );
  };

  return (
    <>
      <SectionHeader
        text="All Products"
        onPress={() => NavigationService.navigate("AllProducts")}
      />
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
        }}
        actionType={homeAllProducts.type}
        numColumns={2}
        isrefreshControl={true}
        onEndReached={() => {}}
        selectorData={getAllProducts}
        requestAction={homeAllProducts.request}
        renderItem={renderItems}
        keyExtractor={(item, index) => `${item.id}+${index}`}
        style={styles.flatlistView}
      />
    </>
  );
};

export default React.memo(AllProducts);
