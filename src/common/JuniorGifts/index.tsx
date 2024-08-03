/** @format */

import React from "react";
import { Block, JuniorGiftCard, Seperator } from "../";
import styles from "./styles";
import { NavigationService } from "../../utils";
import { FlatListApi } from "../../components";
import { getJuniorGift, registryJuniorGifts } from "../../ducks/myregistery";
import { MyRegistryUtil } from "../../dataUtils";

const JuniorGifts = ({ getSearch }: any) => {
  const onCardPress = (item: any) => {
    NavigationService.navigate("JuniorGiftDetail", {
      headerTitle: MyRegistryUtil.full_name(item),
      data: item,
    });
  };

  return (
    <Block flex>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          search: getSearch(),
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listGiftContentContainer}
        ItemSeparatorComponent={() => <Seperator single />}
        actionType={registryJuniorGifts.type}
        selectorData={getJuniorGift}
        requestAction={registryJuniorGifts.request}
        renderItem={({ item }: RenderItemProps) => (
          <JuniorGiftCard item={item} onPress={onCardPress} />
        )}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </Block>
  );
};

export default React.memo(JuniorGifts);
