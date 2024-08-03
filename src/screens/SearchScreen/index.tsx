/** @format */

import React, { useState } from "react"
import { Block, Text } from "../../common"
import styles from "./styles"
import { DataHandler, NavigationService, Util } from "../../utils"
import { ButtonView, FlatListApi, Loader } from "../../components"
import SearchInput from "../../common/SearchInput"
import { Images } from "../../theme"
import { useDebounce } from "../../hooks"
import { Image } from "react-native"
import {
  getSearchHistory,
  homeDeleteSearchHistory,
  homeGlobalSearch,
} from "../../ducks/home"
import { useDispatch, useSelector } from "react-redux"
import { DashBoardUtil } from "../../dataUtils"

const SearchScreen = ({ route }: IsRouteRequiredProps) => {
  const dispatch = useDispatch()
  const historyData = useSelector(getSearchHistory)
  const isContact = route?.params?.isContact ?? false
  const isRegistry = route?.params?.isRegistry ?? false

  const [inputText, setInputText] = useState("")
  const [isLoader, setLoader] = useState(false)
  const debouncedSearchTerm = useDebounce(inputText, 500)

  const onChangeText = (text: isTypeString) => {
    setInputText(text)
  }

  const getSearch = () => {
    if (inputText) {
      return debouncedSearchTerm.trim()
    }
    return ""
  }

  const searchResult = (data?: any) => {
    setLoader(true)
    dispatch(
      homeGlobalSearch.request({
        payloadApi: {
          page: 1,
          limit: 10,
          query: data ?? getSearch(),
        },
        reset: true,
        cb: () => {
          NavigationService.navigate("SearchResult", {
            selectedSearchValue: data ?? getSearch(),
            isRegistry: isRegistry,
          })
          setLoader(false)
        },
      })
    )
  }

  const handleDeleteItem = (index: isTypeNumber) => {
    DataHandler.getAlertModalRef().show({
      title: "Remove History",
      description: "Are you sure you want to remove this history?",
      acceptTitle: "Remove",
      callback: () => {
        dispatch(
          homeDeleteSearchHistory.request({
            payloadApi: {
              id: index,
            },
            cb: () => {
              Util.showCustomMessage(
                "The history has been deleted successfully!",
                "success"
              )
            },
          })
        )
      },
    })
  }

  const renderItem = ({ item, index }: ProductItemProps) => {
    return (
      <ButtonView
        debounceTime={0}
        style={styles.renderView}
        onPress={() => {
          if (isContact) {
            NavigationService.navigate("ContactDetail", { data: item })
          } else {
            searchResult(DashBoardUtil.keyword(item))
          }
        }}>
        <Block row center>
          <Image source={Images.icons.search} style={styles.searchIconRecent} />
          <Text style={styles.titleStyle}>{DashBoardUtil.keyword(item)}</Text>
        </Block>
        {inputText == "" && (
          <ButtonView
            debounceTime={0}
            onPress={() => {
              handleDeleteItem(DashBoardUtil.id(item))
            }}
            style={styles.cancelButton}>
            <Image source={Images.icons.cross} style={styles.cancelStyle} />
          </ButtonView>
        )}
      </ButtonView>
    )
  }

  const renderHeader = () => {
    return (
      <Block style={styles.headerStyle}>
        <Text bold style={styles.recentText}>
          Recent Searches
        </Text>
      </Block>
    )
  }

  function renderSearchInput() {
    return (
      <>
        <Block style={styles.containerSearch}>
          <SearchInput
            value={inputText}
            onChangeText={onChangeText}
            setValue={(e) => {
              setInputText(e)
            }}
            style={styles.btnSearch}
            iconStyle={styles.searchIcon}
            onCancel={() => NavigationService.pop()}
            placeHolder={"Search"}
            image={Images.icons.search}
            getSearch={searchResult}
          />
        </Block>
        <Block style={styles.flatListView}>
          <FlatListApi
            payload={{
              page: 1,
              limit: 10,
            }}
            actionType={homeGlobalSearch.type}
            showsVerticalScrollIndicator={false}
            selectorData={getSearchHistory}
            requestAction={homeGlobalSearch.request}
            renderItem={renderItem}
            ListFooterComponent={() => <Block height={20} />}
            ListHeaderComponent={
              historyData.length > 0 && inputText == "" ? renderHeader : null
            }
            keyExtractor={(item, index) => `${item.id}+${index}`}
          />
        </Block>
      </>
    )
  }

  return (
    <Block style={styles.container}>
      {renderSearchInput()}
      <Loader
        type={[isLoader && homeGlobalSearch.type, homeDeleteSearchHistory.type]}
      />
    </Block>
  )
}

export default SearchScreen
