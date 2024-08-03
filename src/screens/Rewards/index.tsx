import React, { useState } from "react";
import { Image, View, FlatList, Alert } from "react-native";
import { Block, Seperator, Switch, Text } from "../../common";
import { ButtonView, FlatListApi } from "../../components";
import { authGetReward, getIdentifierListData } from "../../ducks/auth";
import { REWARD_DATA, SETTING_DATA } from "../../dummyData";
import { Colors, Images } from "../../theme";
import { DataHandler, NavigationService } from "../../utils";
import styles from "./styles";

const Rewards = ({ route, navigation }: IsNavigationRequiredProps) => {
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const onPressItem = () => {};

    return (
      <Block
        style={styles.cardView}
        onPress={onPressItem}
        accessibilityLabelKey={item.testLabel}
      >
        <Block row>
          <Image source={Images.images.rewardGreen} />
          <Block flex style={styles.innerCard}>
            <Block row paddingTop={8}>
              <Text size={14} color={Colors.TITLE_TEXT} style={styles.codeView}>
                {"Code:"}
              </Text>
              <Text size={14} color={Colors.TITLE_TEXT}>
                {item.code}
              </Text>
            </Block>
            <Block row paddingTop={8}>
              <Text style={styles.codeView} size={14} color={Colors.TITLE_TEXT}>
                {"Discount:"}
              </Text>
              <Text size={14} color={Colors.TITLE_TEXT}>
                {item.discount}
              </Text>
            </Block>
            <Block row paddingTop={8}>
              <Text size={14} color={Colors.TITLE_TEXT} style={styles.codeView}>
                {"Expiry:"}
              </Text>
              <Text size={14} color={Colors.TITLE_TEXT}>
                {item.expiry}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <View style={styles.container}>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <Block height={10} />}
        actionType={authGetReward.type}
        selectorData={getIdentifierListData}
        requestAction={authGetReward.request}
        identifier={"REWARDS"}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </View>
  );
};

export default Rewards;
