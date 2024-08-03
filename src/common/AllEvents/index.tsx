/** @format */

import React, { useState, useCallback } from "react";
import { Image } from "react-native";
import { Block, DateTimer, FullCalender, Seperator, Text } from "../../common";
import { Colors, Images } from "../../theme";
import styles from "./styles";
import { ButtonView, Calendar, FlatListApi } from "../../components";
import { DataHandler, NavigationService, Util } from "../../utils";
import {
  DATE_PICKER_TYPE,
  DATE_SERVER_FORMAT,
  EVENTS_DATE_FORMAT,
  EVENTS_MONTH_FORMAT,
  EVENTS_YEAR_FORMAT,
  EVENT_TYPES,
  MONTH_DATE_FORMATE_2,
} from "../../config/Constants";
import { eventGetAll, getAllEventList } from "../../ducks/events";
import { EventsDataUtil } from "../../dataUtils";
import { useSelector } from "react-redux";

const AllEvents = ({ hideCalendar, horizontalCalendar, getSearch }: any) => {
  const getAllEventListData = useSelector(getAllEventList);
  const [initialDate, setInitialDate] = useState<string>(
    Util.formatDate(new Date(), DATE_SERVER_FORMAT)
  );

  const [filterDate, setFilterDate] = useState<string>("");

  const datePickerShow = (onChange?: (date: Date) => void) => {
    DataHandler.getDatePickerModalRef().show({
      mode: DATE_PICKER_TYPE.DATE,
      isMaximum: true,
      isMinimum: false,
      onSelected: (date: Date) => {
        const formattedServerDate = Util.formatDate(date, DATE_SERVER_FORMAT);
        setInitialDate(formattedServerDate);
      },
      date: initialDate,
      extraProps: {
        minimumDate: Util.stringToDateObject("1950-01-01"),
      },
      displayMode: "spinner",
    });
  };

  const headerComponennt = () => {
    return (
      <Block>
        {horizontalCalendar ? (
          <Block style={styles.horizontalCalendarStyle}>
            <Calendar
              OnCalendarPress={() =>
                NavigationService.navigate("CalendarScreen")
              }
              onDateSelect={(date) => {
                setFilterDate(Util.formatDate(date, DATE_SERVER_FORMAT));
              }}
              eventDate={filterDate}
            />
          </Block>
        ) : (
          <Block height={360}>
            <ButtonView
              onPress={() => datePickerShow()}
              style={styles.calenderButton}
            >
              <Text samiBold size={15} color={Colors.TITLE_TEXT}>
                {Util.formatDate(initialDate, MONTH_DATE_FORMATE_2)}
              </Text>
              <Image
                style={styles.imageStyle}
                resizeMode={"contain"}
                source={Images.icons.arrowDownIcon}
              />
            </ButtonView>
            <FullCalender
              initialDate={initialDate}
              selectedDates={getAllEventListData}
              onPress={(date) => {
                console.log("pop[");

                //setFilterDate(Util.formatDate(date, DATE_SERVER_FORMAT));
              }}
            />
            <Seperator single={true} />
          </Block>
        )}
      </Block>
    );
  };

  const renderItems = ({ item, index }: RenderItemProps) => {
    const isGeneralType =
      EventsDataUtil.event_type(item) === EVENT_TYPES.GENERAL;
    const eventType =
      EventsDataUtil.event_type(item) === EVENT_TYPES.GENERAL
        ? "General"
        : EventsDataUtil.event_type(item) === EVENT_TYPES.CUSTOMIZED
        ? "Customized"
        : "Admin";
    return (
      <ButtonView
        onPress={() => {
          NavigationService.navigate("EventDetail", {
            isGeneral:
              EventsDataUtil.event_type(item) === EVENT_TYPES.GENERAL
                ? EVENT_TYPES.GENERAL
                : EventsDataUtil.event_type(item) === EVENT_TYPES.CUSTOMIZED
                ? EVENT_TYPES.CUSTOMIZED
                : EVENT_TYPES.ADMIN,
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
        {new Date() < Util.convertDateTime(EventsDataUtil.date(item)) && (
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
    <Block style={styles.subContainerStyle}>
      {hideCalendar ? (
        <></>
      ) : getAllEventListData.length >= 0 ? (
        headerComponennt()
      ) : (
        <></>
      )}
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          search: getSearch(),
          date: filterDate,
          date__month: Util.formatDate(initialDate, EVENTS_MONTH_FORMAT),
          date__year: Util.formatDate(initialDate, EVENTS_YEAR_FORMAT),
        }}
        actionType={eventGetAll.type}
        showsVerticalScrollIndicator={false}
        selectorData={getAllEventList}
        requestAction={eventGetAll.request}
        // ListHeaderComponent={(item) =>
        //   hideCalendar
        //     ? undefined
        //     : getAllEventListData.length > 0
        //     ? headerComponennt()
        //     : undefined
        // }
        // ListHeaderComponentStyle={{
        //   height: hideCalendar
        //     ? undefined
        //     : horizontalCalendar
        //     ? getAllEventListData.length > 0
        //       ? 120
        //       : undefined
        //     : getAllEventListData.length > 0
        //     ? 320
        //     : undefined,
        // }}
        renderItem={renderItems}
        ItemSeparatorComponent={() => <Seperator single />}
        ListFooterComponent={() => <Block height={50} />}
        keyExtractor={(item, index) => `${item?.id}+${index}`}
      />
    </Block>
  );
};

export default React.memo(AllEvents);
