/** @format */

import React, { useState } from "react";
import { Colors, Metrics } from "../../theme";
import { Block } from "..";
import { Calendar } from "react-native-calendars";
import { Util } from "../../utils";
import { DATE_SERVER_FORMAT } from "../../config/Constants";
import _ from "lodash";
import styles from "./styles";

const FullCalender: React.FC<CalendarProps> = ({
  initialDate,
  onPress,
  selectedDates = [],
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    Util.formatDate(new Date(), DATE_SERVER_FORMAT)
  );

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const [markedDates, setMarkedDates] = useState<{
    [date: string]: {
      selected?: boolean;
      marked: boolean;
      selectedColor?: string;
      dotColor?: string;
      activeOpacity?: number;
      customStyles?: any;
    };
  }>({});

  // "2023-08-29": {
  //   marked: true,
  //   selectedColor: Colors.PRIMARY,
  // },
  // "2023-10-01": {
  //   marked: true,
  //   dotColor: Colors.PRIMARY,
  //   activeOpacity: 0,
  //   selected: true,
  // },
  // "2023-10-03": {
  //   marked: true,
  //   dotColor: Colors.WHITE,
  //   selectedColor: Colors.PRIMARY,
  //   activeOpacity: 0,
  //   selected: true,
  //   customStyles: {
  //     container: {
  //       borderRadius: Metrics.ratio(5),
  //       height: Metrics.ratio(35),
  //       width: Metrics.ratio(35),
  //     },
  //   },
  // },
  // "2023-08-05": { marked: false, dotColor: Colors.PRIMARY, activeOpacity: 0 },
  // "2023-08-07": { marked: false, dotColor: Colors.PRIMARY, activeOpacity: 0 },

  return (
    <Block flex style={styles.container}>
      <Calendar
        hideArrows={true}
        customHeaderTitle={<></>}
        markedDates={Util.markedDatesArray(selectedDates)}
        initialDate={initialDate}
        minDate={new Date().toDateString()}
        onDayPress={(day) => {
          const dateString = day.dateString;
          setSelectedDate(dateString);
          const md = {
            [dateString]: {
              selected: true,
              marked: true,
              dotColor: Colors.WHITE,
              selectedColor: Colors.PRIMARY,
              customStyles: {
                container: {
                  borderRadius: Metrics.ratio(5),
                  height: Metrics.ratio(35),
                  width: Metrics.ratio(35),
                },
                text: {},
              },
            },
          };
          setMarkedDates(md);
          onPress?.(dateString);
        }}
        markingType={"custom"}
        theme={{
          ...styles.theme,
        }}
        monthFormat={"MMMM"}
        disableMonthChange={true}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={false}
      />
    </Block>
  );
};

export default FullCalender;
