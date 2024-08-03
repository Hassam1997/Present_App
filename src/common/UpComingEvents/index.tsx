/** @format */

import React, { useCallback } from "react";
import {
  Block,
  Text,
  SectionHeader,
  GradientView,
  DateTimer,
} from "../../common";
import { Images, Metrics } from "../../theme";
import { Image } from "react-native";
import { ButtonView, FlatListApi } from "../../components";
import styles from "./styles";
import { UPCOMING_EVENTS_DATA } from "../../dummyData";
import { NavigationService, Util } from "../../utils";
import { DAY_DATE_YEAR, EVENT_TYPES } from "../../config/Constants";
import { getUpcomingEvents, homeUpcomingEvents } from "../../ducks/home";
import { DashBoardUtil, EventsDataUtil } from "../../dataUtils";
import { useSelector } from "react-redux";
import { getRequestFlag } from "../../ducks/requestFlags";

const UpComingEvents: React.FC<UpcomingEventsProps> = ({ data }) => {
  let homeUpcomingEventsData = useSelector(
    getRequestFlag(homeUpcomingEvents.type)
  );
  const renderItems = useCallback(
    ({ item, index }: IPropsUpcomingEvents) => {
      return (
        <ButtonView
          onPress={() =>
            NavigationService.navigate("EventDetail", {
              isGeneral:
                EventsDataUtil.event_type(item) === EVENT_TYPES.GENERAL
                  ? EVENT_TYPES.GENERAL
                  : EventsDataUtil.event_type(item) === EVENT_TYPES.CUSTOMIZED
                  ? EVENT_TYPES.CUSTOMIZED
                  : EVENT_TYPES.ADMIN,
              event_id: EventsDataUtil.id(item),
            })
          }
        >
          <GradientView
            style={styles.imageBackground}
            type={
              DashBoardUtil.event_type(item) == EVENT_TYPES.GENERAL
                ? "secondary"
                : "primary"
            }
          >
            <Block style={styles.contentContainer}>
              {DashBoardUtil.event_type(item) == EVENT_TYPES.GENERAL ? (
                <Block style={styles.categoryContainer}>
                  <Image
                    resizeMode="contain"
                    source={Images.icons.calendar}
                    style={styles.calendarIcon}
                  />
                  <Text samiBold style={styles.categoryText}>
                    General
                  </Text>
                </Block>
              ) : (
                <Block style={styles.categoryContainerCustomize}>
                  <Image
                    resizeMode="contain"
                    source={Images.icons.calendar1}
                    style={styles.calendarCustomizeIcon}
                  />
                  <Text samiBold style={styles.categoryCustomizeText}>
                    {DashBoardUtil.event_type(item) == EVENT_TYPES.CUSTOMIZED
                      ? "Customized"
                      : "Admin"}
                  </Text>
                </Block>
              )}
              <Text p bold style={styles.titleText} numberOfLines={2}>
                {DashBoardUtil.title(item)}
              </Text>
              <Text samiBold style={styles.dateText}>
                {Util.formatDate(DashBoardUtil.date(item), DAY_DATE_YEAR)}
              </Text>
              <Block style={styles.buttonView}>
                <DateTimer date={DashBoardUtil.date(item)} />
              </Block>
            </Block>
          </GradientView>
        </ButtonView>
      );
    },
    [UPCOMING_EVENTS_DATA]
  );

  return (
    <>
      <SectionHeader
        text="Upcoming Events"
        onPress={() => {
          if (homeUpcomingEventsData?.totalRecords > 4) {
            NavigationService.navigate("CalendarScreen", {
              title: "Upcoming Events",
            });
          }
        }}
        dataLength={homeUpcomingEventsData?.totalRecords}
      />
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
        }}
        actionType={homeUpcomingEvents.type}
        isrefreshControl={true}
        selectorData={getUpcomingEvents}
        requestAction={homeUpcomingEvents.request}
        renderItem={renderItems}
        horizontal={true}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </>
  );
};

export default UpComingEvents;
