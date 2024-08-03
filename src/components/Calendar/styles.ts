/** @format */

import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

const styles = StyleSheet.create({
  calendarBtn: {
    position: "absolute",
    right: 0,
    top: 17,
  },
  calendarIcon: {
    height: Metrics.ratio(25),
    width: Metrics.ratio(25),
  },
  container: {
    marginHorizontal: Metrics.ratio(Metrics.PaddingHorizontalValue),
  },
  calendarHeader: {
    color: Colors.BLACK,
    marginRight: "auto",
    fontSize: Fonts.size.size_17,
    paddingBottom: Metrics.ratio(20),
  },
  stripCalendarStyle: {
    height: Metrics.ratio(120),
    paddingTop: Metrics.ratio(20),
    paddingBottom: Metrics.ratio(10),
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
  },
  dayContainerStyle: {
    borderRadius: Metrics.ratio(5),
    width: Metrics.ratio(45),
    height: Metrics.ratio(45),
    paddingTop: 8,
  },
  dateNumberStyle: {
    color: Colors.BLACK,
    fontWeight: "500",
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
  },
  highlightDateNumberStyle: {
    color: Colors.WHITE,
    fontWeight: "500",
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
  },
  dateNameStyle: {
    color: Colors.APP_TEXT,
    fontWeight: "400",
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_14,
    textTransform: "capitalize",
  },
  highlightDateNameStyle: {
    color: Colors.WHITE,
    fontWeight: "400",
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_14,
    textTransform: "capitalize",
  },
})

export default styles
