/** @format */

import React, { useCallback } from "react";
import { FlatListApi, ProductCard } from "../../components";
import { SectionHeader } from "../../common";
import { NavigationService } from "../../utils";
import styles from "./styles";
import { getPresentSelected, homePresentSelected } from "../../ducks/home";

const PresentSelection = ({ arrayKey }: any) => {
  const navigationHandler = () => NavigationService.navigate("ProductDetail");

  const renderItems = useCallback(
    ({ item, index }: ProductCardProps) => (
      <ProductCard
        customStyle={styles.containerStyle}
        data={item}
        index={index}
        onPress={navigationHandler}
        arrayKey={arrayKey}
      />
    ),
    []
  );

  return (
    <>
      <SectionHeader
        text="Present Selected"
        onPress={() =>
          NavigationService.navigate("AllProducts", {
            headerTitle: "Present Selected",
            dispatchType: homePresentSelected,
            dispatchSelector: getPresentSelected,
          })
        }
      />
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
        }}
        actionType={homePresentSelected.type}
        isrefreshControl={true}
        selectorData={getPresentSelected}
        requestAction={homePresentSelected.request}
        renderItem={renderItems}
        horizontal={true}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </>
  );
};
export default React.memo(PresentSelection);
