/** @format */

import React, { useCallback, useState } from "react"
import { SectionHeader } from "../../common"
import styles from "./styles"
import { Images } from "../../theme"
import { FlatListApi, Loader, ProductCard } from "../../components"
import { DataHandler, NavigationService, Util } from "../../utils"
import { DATE_MONTH, PRODUCT_REPORT_OPTION_DATA } from "../../config/Constants"
import {
  getGiftEvent,
  getGiftProducts,
  homeGiftProducts,
  homeGiftRelevancy,
} from "../../ducks/home"
import { useDispatch, useSelector } from "react-redux"

const GiftsOnSelectedDate = ({ arrayKey }: any) => {
  const dispatch = useDispatch()
  const giftDate = useSelector(getGiftEvent)
  const navigationHandler = () => NavigationService.navigate("ProductDetail")

  const handleBottomSheet = () => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: PRODUCT_REPORT_OPTION_DATA,
      callback: (data: any) => {
        switch (data.identifier) {
          case "allproducts":
            NavigationService.navigate("AllProducts", {
              headerTitle: `Gifts for ${Util.formatDate(
                giftDate?.event_date,
                DATE_MONTH
              )}`,
            })
            break
          case "relevant":
            dispatch(
              homeGiftRelevancy.request({
                payloadApi: {
                  status: "Relevant",
                  event_id: giftDate?.event_id,
                },
              })
            )
            break
          case "irrelevant":
            dispatch(
              homeGiftRelevancy.request({
                payloadApi: {
                  status: "Irrelevant",
                  event_id: giftDate?.event_id,
                },
                cb: (data: any) => {
                  dispatch(
                    homeGiftProducts.request({
                      payloadApi: {
                        page: 1,
                        limit: 10,
                      },
                      reset: true,
                    })
                  )
                },
              })
            )
            break
          default:
        }
      },
    })
  }
  const renderItems = useCallback(({ item, index }: IPropsgiftProducts) => {
    return (
      <ProductCard
        customStyle={styles.containerStyle}
        data={item}
        index={index}
        onPress={navigationHandler}
        arrayKey={arrayKey}
      />
    )
  }, [])

  return (
    <>
      {!Util.isEmpty(giftDate?.event_date) && (
        <SectionHeader
          text={`Gifts for ${Util.formatDate(
            giftDate?.event_date,
            DATE_MONTH
          )}`}
          secondText
          image={Images.icons.menu}
          onPress={handleBottomSheet}
        />
      )}
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
        }}
        actionType={homeGiftProducts.type}
        isrefreshControl={true}
        selectorData={getGiftProducts}
        requestAction={homeGiftProducts.request}
        renderItem={renderItems}
        horizontal={true}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
      <Loader type={homeGiftRelevancy.type} />
    </>
  )
}

export default React.memo(GiftsOnSelectedDate)
