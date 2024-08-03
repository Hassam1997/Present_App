/** @format */

import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { Block, GiftTrackCard, Text, AppButton } from "../";
import { Colors, Images, Metrics } from "../../theme";
import styles from "./styles";
import {
  horizontalListGiftsGroupsOption,
  horizontalListGiftsOption,
} from "../../data";
import { MyGiftGroupData, MyGiftsData, MyGiftTrackData } from "../../dummyData";
import { ButtonView } from "../../components";
import { NavigationService } from "../../utils";

const TrackGifts = () => {
  const [isAmazon, setIsAmazon] = useState(false);

  const onCardPress = (item: any) => {
    // NavigationService.navigate("GroupPurchaseDetails", {
    //   isActive: item.isActive,
    //   headerTitle: item.title,
    // });
  };

  return (
    <Block flex>
      {isAmazon ? (
        <FlatList
          data={MyGiftTrackData}
          renderItem={({ item }) => (
            <GiftTrackCard item={item} onPress={onCardPress} />
          )}
          contentContainerStyle={styles.listGiftContentContainer}
          ItemSeparatorComponent={() => <Block height={1} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <>
          <Text
            size={13}
            color={Colors.APP_TEXT}
            marginVertical={15}
            marginHorizontal={16}
          >
            Connect with Amazon, Target, or Walmart to ensure accurate tracking
            of your purchases and eligibility for the registry completion
            discount.
          </Text>
          <AppButton
            image={Images.icons.amazonIcon}
            title={"Connect with amazon"}
            containerStyle={styles.amazonStyle}
            textStyle={styles.saveButton}
            onPress={() => {
              setIsAmazon(true);
            }}
          />
          <AppButton
            image={Images.icons.walmartIcon}
            title={"Continue with Walmart"}
            containerStyle={styles.walmartStyle}
            textStyle={styles.walmartText}
            onPress={() => {
              setIsAmazon(true);
            }}
          />
          <AppButton
            image={Images.icons.targetIcon}
            title={"Continue with Target"}
            containerStyle={styles.targetStyle}
            textStyle={styles.saveButton}
            onPress={() => {
              setIsAmazon(true);
            }}
          />
        </>
      )}
    </Block>
  );
};

export default React.memo(TrackGifts);
