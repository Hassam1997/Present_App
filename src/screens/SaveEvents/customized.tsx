/** @format */

import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { ButtonView, FlatListApi } from "../../components";
import { Block, CircleCheck, Seperator, Text } from "../../common";
import { Colors, Metrics } from "../../theme";
import styles from "./styles";
import { EventsDataUtil } from "../../dataUtils";
import { Util } from "../../utils";
import { CIRCLE_CHECK_BUTTON_TYPE, EVENT_TYPES } from "../../config/Constants";
import { eventGetCustom, getCustomEventList } from "../../ducks/events";

const CustomizedEvents = ({
  onPress,
  selectedIdentifier,
  getSearch,
  onPressTitile,
}: EventProps) => {
  const renderItems = ({ item, index }: RenderItemProps) => {
    const firstIndex = index == 0;
    const selected = Util.isEqual(selectedIdentifier, EventsDataUtil.id(item))
      ? true
      : false;
    return (
      <Block
        style={[
          styles.buttonContainer,
          {
            marginTop: firstIndex ? Metrics.ratio(10) : 0,
          },
        ]}
      >
        <CircleCheck
          buttonType={CIRCLE_CHECK_BUTTON_TYPE.RADIO}
          title={EventsDataUtil.title(item)}
          identifier={EventsDataUtil.id(item)}
          isSelected={selected}
          containerStyle={styles.bulletContainer}
          onPressButton={(id: string) => {
            onPress(id);
            onPressTitile(EventsDataUtil.title(item));
          }}
          radioStyle={styles.bulletContainerChild}
        />
      </Block>
    );
  };

  return (
    <Block flex>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          search: getSearch(),
          event_type: EVENT_TYPES.CUSTOMIZED,
        }}
        customEmptyViewStyle={{
          flexGrow: 1,
        }}
        actionType={eventGetCustom.type}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        selectorData={getCustomEventList}
        requestAction={eventGetCustom.request}
        renderItem={renderItems}
        ItemSeparatorComponent={() => (
          <Seperator single containerStyle={styles.seperatorStyle} />
        )}
        ListFooterComponent={() => <Block height={20} />}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </Block>
  );
};

export default React.memo(CustomizedEvents);
