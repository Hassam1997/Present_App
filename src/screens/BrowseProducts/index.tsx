/** @format */

import React, { useState } from "react"
import { Block } from "../../common"
import styles from "./styles"
import { FlatListApi, ProductCard } from "../../components"
import SearchInput from "../../common/SearchInput"
import { Images } from "../../theme"
import { NavigationService } from "../../utils"
import { getAllProducts, homeAllProducts } from "../../ducks/home"
import { useDebounce } from "../../hooks"

const BrowseProducts = ({ route, navigation }: IsNavigtionProps) => {
  const [inputText, setInputText] = useState<string>("")
  const debouncedSearchTerm = useDebounce(inputText, 500)

  const onChangeText = (text: isTypeString) => {
    setInputText(text)
  }

  const getSearch = () => {
    if (inputText) {
      return debouncedSearchTerm
    }
    return ""
  }

  const renderItems = ({ item, index }: RenderItemProps) => {
    return (
      <ProductCard
        customStyle={styles.customCardContainer}
        data={item}
        index={index}
        onPress={() => {
          NavigationService.goBack()
        }}
      />
    )
  }

  return (
    <Block style={styles.containerStyle}>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          query: getSearch(),
        }}
        actionType={homeAllProducts.type}
        requestAction={homeAllProducts.request}
        numColumns={2}
        selectorData={getAllProducts}
        renderItem={renderItems}
        keyExtractor={(item, index) => `${item.id}+${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SearchInput
            onFilter={() => {
              NavigationService.navigate("FilterScreen")
            }}
            isFiltered={true}
            style={styles.btnSearch}
            iconStyle={styles.searchIcon}
            placeHolder={"Search"}
            image={Images.icons.search}
            value={inputText}
            onChangeText={onChangeText}
            setValue={(e) => {
              setInputText(e)
            }}
          />
        }
      />
    </Block>
  )
}

export default BrowseProducts
