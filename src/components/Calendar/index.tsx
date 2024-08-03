/** @format */

import React from "react";
import { Image } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { Colors, Images } from "../../theme";
import moment from "moment";
import styles from "./styles";
import { Block } from "../../common";
import ButtonView from "../ButtonView";

const today = moment(); // Assuming today's date
const markedDatesArray = [
  {
    date: today,
    customStyles: {},
    // dots: [
    //   {
    //     color: Colors.SKY_BLUE_BORDER, // Change the color as needed
    //     selectedColor: Colors.SKY_BLUE_BORDER, // Change the selected color as needed
    //   },
    //   {
    //     color: Colors.PINK, // Change the color as needed
    //     selectedColor: Colors.PRIMARY_PINK, // Change the selected color as needed
    //   },
    // ],
  },
];
interface IPropCalendar {
  OnCalendarPress: () => void;
  onDateSelect?: any;
  eventDate?: any;
}
const Calendar = ({
  OnCalendarPress,
  onDateSelect,
  eventDate,
}: IPropCalendar) => (
  <Block style={styles.container}>
    <CalendarStrip
      // scrollable
      // maxDate={today}
      selectedDate={eventDate != "" ? eventDate : undefined}
      markedDates={[
        {
          date: eventDate,
        },
      ]}
      calendarAnimation={{ type: "sequence", duration: 30 }}
      daySelectionAnimation={{
        type: "background",
        duration: 200,
        highlightColor: Colors.SKY_BLUE_BORDER,
      }}
      dayContainerStyle={styles.dayContainerStyle}
      style={styles.stripCalendarStyle}
      calendarHeaderStyle={styles.calendarHeader}
      calendarColor={Colors.WHITE}
      dateNumberStyle={styles.dateNumberStyle}
      highlightDateNumberStyle={styles.highlightDateNumberStyle}
      dateNameStyle={styles.dateNameStyle}
      highlightDateNameStyle={styles.highlightDateNameStyle}
      iconContainer={{ display: "none" }}
      markedDatesStyle={{ marginTop: 5 }}
      onDateSelected={(date: any) => {
        onDateSelect && onDateSelect(date._d);
      }}
    />
    <ButtonView style={styles.calendarBtn} onPress={OnCalendarPress}>
      <Image
        source={Images.icons.calendar1}
        style={styles.calendarIcon}
        resizeMode="contain"
      />
    </ButtonView>
  </Block>
);

export default React.memo(Calendar);
