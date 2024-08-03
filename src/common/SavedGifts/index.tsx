/** @format */

import React from "react";
import { Block, Seperator, GiftCard } from "../";
import styles from "./styles";
import { NavigationService } from "../../utils";
import { PRODUCT_DETAILS_SAVE_GIFT } from "../../data";
import { FlatListApi, Loader } from "../../components";
import {
  getSavedGift,
  registrySavedGifts,
  registryStarredGifts,
} from "../../ducks/myregistery";
import { useDispatch } from "react-redux";
import { EventsDataUtil } from "../../dataUtils";
import { URL_LINK } from "../../config/Constants";
import { Linking } from "react-native";

const SavedGifts = ({ getSearch }: any) => {
  const dispatch = useDispatch();

  const onCardPress = (item: any) => {
    if (EventsDataUtil.platform(item) == URL_LINK.LINK) {
      // Linking.openURL(EventsDataUtil.buy_link(item));
      NavigationService.navigate("ContentPages", {
        url: EventsDataUtil.buy_link(item),
        heading: "Product Detail",
      });
      return;
    }
    NavigationService.navigate("ProductDetail", {
      isCustomised: true,
      isButtonHide: true,
      data: item,
    });
  };

  const onStarPress = (item: ItemProps) => {
    dispatch(
      registryStarredGifts.request({
        payloadApi: {
          saved_type: item?.saved_type,
          model_id: item?.model_id,
          product_id: item?.id,
        },
        identifier: "saved_gifts",
        cb: () => {
          dispatch(
            registrySavedGifts.request({
              payloadApi: {
                page: 1,
                limit: 10,
              },
              reset: true,
            })
          );
        },
      })
    );
  };

  const renderItem = ({ item, index }: RenderItemProps) => {
    return (
      <>
        <GiftCard item={item} onPress={onCardPress} onStarPress={onStarPress} />
        <Loader type={registryStarredGifts.type} />
      </>
    );
  };

  return (
    <Block flex>
      <FlatListApi
        payload={{
          search: getSearch(),
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listGiftContentContainer}
        ItemSeparatorComponent={() => (
          <Seperator
            single
            containerStyle={{
              marginVertical: 10,
            }}
          />
        )}
        actionType={registrySavedGifts.type}
        selectorData={getSavedGift}
        requestAction={registrySavedGifts.request}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </Block>
  );
};

export default React.memo(SavedGifts);
