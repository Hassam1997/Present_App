/** @format */

import React, { FC, useCallback } from "react"
import { FlatListApi, ProductCard } from "../../components"
import { SectionHeader } from "../../common"
import { NavigationService } from "../../utils"
import styles from "./styles"
import { PRESENT_SELECTION_DATA } from "../../dummyData"
import { getTopProducts, homeTopProducts } from "../../ducks/home"

const TopProducts = ({ arrayKey }: any) => {
  const navigationHandler = () => NavigationService.navigate("ProductDetail")

  const renderItems = useCallback(
    ({ item, index }: ProductCardProps) => (
      <ProductCard
        customStyle={styles.containerStyle}
        data={item}
        index={index}
        onPress={navigationHandler}
        imageAbsoluteTop
        arrayKey={arrayKey}
      />
    ),
    [PRESENT_SELECTION_DATA]
  )
  return (
    <>
      <SectionHeader
        text="Top Products"
        onPress={() => {
          NavigationService.navigate("AllProducts", {
            headerTitle: "Top Products",
          })
        }}
      />
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
        }}
        actionType={homeTopProducts.type}
        isrefreshControl={true}
        selectorData={getTopProducts}
        requestAction={homeTopProducts.request}
        renderItem={renderItems}
        horizontal={true}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </>
  )
}

export default React.memo(TopProducts)
