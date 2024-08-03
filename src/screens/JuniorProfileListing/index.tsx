/** @format */

import React from "react";
import { FlatList, Image } from "react-native";
import { Block, JuniorGiftCard, Seperator } from "../../common";
import { ButtonView, FlatListApi } from "../../components";
import { getJuniorGift, registryJuniorGifts } from "../../ducks/myregistery";
import { JUNIOR_CRAD_DATA } from "../../dummyData";
import { Images } from "../../theme";
import { NavigationService } from "../../utils";
import styles from "./styles";

const JuniorProfileListing = ({
  navigation,
  route,
}: IsNavigationRequiredProps) => {
  const onCardPress = (item: any) => {
    NavigationService.navigate("ConfirmPassword", {
      isSwitchProfile: item,
    });
  };

  return (
    <Block style={styles.container}>
      {/* <FlatList
        data={JUNIOR_CRAD_DATA}
        renderItem={({ item }: RenderItemProps) => (
          <JuniorGiftCard item={item} onPress={onCardPress} />
        )}
        contentContainerStyle={styles.listGiftContentContainer}
        ItemSeparatorComponent={() => <Seperator single />}
        showsVerticalScrollIndicator={false}
      /> */}
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
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
      <ButtonView
        style={styles.createButton}
        onPress={() => {
          NavigationService.navigate("JuniorSignUp", {
            headerTitle: "Add Junior Profile",
          });
        }}
      >
        <Image source={Images.icons.addIcon} style={styles.addImage} />
      </ButtonView>
    </Block>
  );
};

export default JuniorProfileListing;
