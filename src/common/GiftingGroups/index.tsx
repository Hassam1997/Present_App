/** @format */

import React, { useState } from "react";
import { FlatList } from "react-native";
import { Block, GiftCard, HorizontalSelectOptionsItem, Text } from "../";
import { Colors } from "../../theme";
import styles from "./styles";
import { horizontalListGiftsGroupsOption } from "../../data";
import { ButtonView, FlatListApi } from "../../components";
import { NavigationService } from "../../utils";
import { useSelector } from "react-redux";
import {
  getGiftingGroups,
  registryGiftingGroup,
} from "../../ducks/myregistery";
import { MyRegistryUtil } from "../../dataUtils";
import { STATUS } from "../../config/Constants";

const GiftingGroups = ({ showHeader = true, getSearch }: any) => {
  const giftingGroupData = useSelector(getGiftingGroups);
  const [isAddedByMe, setIsAddedByMe] = useState(false);
  const [newIdentifier, setNewIdetifier] = useState("all");

  const onCardPress = (item: any) => {
    NavigationService.navigate("GroupPurchaseDetails", {
      isActive: item.status == "Active" ? true : false,
      headerTitle: item.title,
      groupData: item,
    });
  };
  const headerComponennt = () => {
    return (
      <>
        <Block>
          <FlatList
            horizontal
            data={horizontalListGiftsGroupsOption}
            renderItem={({ item }) => (
              <HorizontalSelectOptionsItem
                item={item}
                selectedState={newIdentifier}
                setSelectedState={(item) => {
                  setNewIdetifier(item);
                }}
              />
            )}
            contentContainerStyle={styles.horizontalContentContainer}
            ItemSeparatorComponent={() => <Block width={10} />}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />
        </Block>
        <Block row style={styles.checkBox} space={"between"}>
          <Block row>
            <ButtonView debounceTime={0} onPress={() => setIsAddedByMe(false)}>
              <Text
                color={isAddedByMe ? Colors.APP_TEXT : Colors.PRIMARY_PINK}
                size={14}
                samiBold
              >
                {"Created by me"}
              </Text>
            </ButtonView>
            <ButtonView onPress={() => setIsAddedByMe(true)}>
              <Text
                color={isAddedByMe ? Colors.PRIMARY_PINK : Colors.APP_TEXT}
                size={14}
                samiBold
                marginLeft={15}
              >
                {"Added me"}
              </Text>
            </ButtonView>
          </Block>

          <ButtonView
            onPress={() => {
              NavigationService.navigate("GroupPurchase");
            }}
          >
            <Text
              color={Colors.PRIMARY_PINK}
              size={14}
              samiBold
              style={styles.textPadding}
            >
              + Group Purchase
            </Text>
          </ButtonView>
        </Block>
      </>
    );
  };

  const renderItems = ({ item, index }: RenderItemProps) => {
    return (
      <GiftCard
        item={item}
        onPress={onCardPress}
        showStatus
        isActive={MyRegistryUtil.status(item) == STATUS.ACTIVE}
        isPast={MyRegistryUtil.status(item) == STATUS.PAST}
        isStar={false}
      />
    );
  };

  return (
    <Block flex>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          ...(newIdentifier != "all" ? { status: newIdentifier } : null),
          ...(isAddedByMe ? { filter: "added_me" } : null),
          search: getSearch(),
        }}
        style={
          giftingGroupData.length > 0 ? null : styles.listGiftContentContainer
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listGiftContentContainer}
        ItemSeparatorComponent={() => <Block height={10} />}
        actionType={registryGiftingGroup.type}
        selectorData={getGiftingGroups}
        requestAction={registryGiftingGroup.request}
        renderItem={renderItems}
        ListHeaderComponent={() => (showHeader ? headerComponennt() : <></>)}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </Block>
  );
};

export default React.memo(GiftingGroups);
