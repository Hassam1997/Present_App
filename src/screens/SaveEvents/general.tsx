/** @format */

import React from "react";
import { FlatListApi } from "../../components";
import { Block, CircleCheck, Seperator } from "../../common";
import { Metrics } from "../../theme";
import styles from "./styles";
import { CIRCLE_CHECK_BUTTON_TYPE, EVENT_TYPES } from "../../config/Constants";
import { eventGetGeneral, getGeneralEventList } from "../../ducks/events";
import { Util } from "../../utils";
import { EventsDataUtil } from "../../dataUtils";

const GeneralEvents = ({
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
          event_type: EVENT_TYPES.GENERAL,
        }}
        customEmptyViewStyle={{
          flexGrow: 1,
        }}
        actionType={eventGetGeneral.type}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        selectorData={getGeneralEventList}
        requestAction={eventGetGeneral.request}
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

export default React.memo(GeneralEvents);
