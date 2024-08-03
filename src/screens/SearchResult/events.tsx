/** @format */

import React, { FC } from "react";
import { Image } from "react-native";
import { Block, DateTimer, Seperator, Text } from "../../common";
import { Images } from "../../theme";
import styles from "./styles";
import { EVENTS_DATE_FORMAT, EVENT_TYPES } from "../../config/Constants";
import { ButtonView, FlatListApi } from "../../components";
import { NavigationService, Util } from "../../utils";
import { getSearchEvents, homeGlobalSearch } from "../../ducks/home";
import { EventsDataUtil } from "../../dataUtils";

const Events = ({ query, isApiObject }: any) => {
  const renderItems = ({ item, index }: RenderItemProps) => {
    const isGeneralType =
      EventsDataUtil.event_type(item) === EVENT_TYPES.GENERAL;
    const eventType =
      EventsDataUtil.event_type(item) === EVENT_TYPES.GENERAL
        ? "General"
        : "Customized";
    return (
      <ButtonView
        onPress={() => {
          NavigationService.navigate("EventDetail", {
            isGeneral:
              EventsDataUtil.event_type(item) === EVENT_TYPES.GENERAL
                ? EVENT_TYPES.GENERAL
                : EVENT_TYPES.CUSTOMIZED,
            event_id: EventsDataUtil.id(item),
          });
        }}
        key={index}
        style={styles.cardContainer}
      >
        <Text samiBold>
          {Util.formatDate(EventsDataUtil.date(item), EVENTS_DATE_FORMAT)}
        </Text>
        <Block
          style={
            isGeneralType
              ? styles.categoryContainerBlue
              : styles.categoryContainerPink
          }
        >
          <Image
            resizeMode="contain"
            source={
              isGeneralType
                ? Images.icons.calendar2
                : Images.icons.calendarCustomized
            }
          />
          <Text style={styles.categoryText}>{eventType}</Text>
        </Block>

        <Text samiBold body>
          {EventsDataUtil.title(item)}
        </Text>
        {new Date() < new Date(EventsDataUtil.date(item)) && (
          <DateTimer
            date={EventsDataUtil.date(item)}
            containerStyle={styles.timeRemaining}
            textStyle={styles.timeRemainingText}
          />
        )}
      </ButtonView>
    );
  };

  return (
    <FlatListApi
      payload={{
        page: 1,
        limit: 10,
      }}
      actionType={homeGlobalSearch.type}
      selectorData={getSearchEvents}
      requestAction={homeGlobalSearch.request}
      renderItem={renderItems}
      keyExtractor={(item, index) => `${item.id}+${index}`}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <Seperator single containerStyle={{ marginVertical: 10 }} />
      )}
      ListFooterComponent={() => <Block height={50} />}
    />
  );
};

export default React.memo(Events);
