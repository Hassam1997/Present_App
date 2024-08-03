/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

const styles: CalendarStyleProps = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  theme: {
    backgroundColor: Colors.WHITE,
    calendarBackground: Colors.WHITE,
    textSectionTitleColor: Colors.APP_TEXT,
    monthTextColor: Colors.APP_TEXT,
    todayTextColor: Colors.PRIMARY,
    textInactiveColor: Colors.TITLE_TEXT,
    textDayFontWeight: "500",
    textMonthFontWeight: "500",
    arrowColor: Colors.PRIMARY,
    textDayHeaderFontSize: Fonts.size.size_14,
    textDayHeaderFontFamily: Fonts.manrope.regular,
    textDayFontSize: Fonts.size.size_14,
    textDayFontFamily: Fonts.manrope.medium,
  },
  calendar: {
    height: 370,
  },
});

export default styles;
