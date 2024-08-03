/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    paddingBottom: Metrics.bottomPadding,
  },
  textStyle: {
    left: Metrics.ratio(16),
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_12,
    color: Colors.APP_TEXT,
  },
  textInputView: {
    marginTop: Metrics.ratio(15),
  },
  btnStyle: {
    marginTop: Metrics.ratio(30),
  },
  checkboxView: {
    flexDirection: "row",
    alignItems: "center",
  },
  createButton: {
    height: Metrics.ratio(24),
    width: Metrics.ratio(24),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_PINK,
    borderRadius: Metrics.ratio(4),
  },
  addImage: {
    height: Metrics.ratio(15),
    width: Metrics.ratio(15),
    right: 1,
  },
  reminderButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrics.ratio(20),
  },
  reminderTextStyle: {
    left: Metrics.ratio(16),
    fontFamily: Fonts.manrope.semiBold,
    fontSize: Fonts.size.size_14,
    color: Colors.PRIMARY_PINK,
  },
  crossIconStyle: {
    position: "absolute",
    right: -2,
    top: -6,
  },
  crossIcon: {
    tintColor: Colors.TITLE_TEXT,
  },
  imageSliderView: {
    marginTop: Metrics.ratio(15),
    flexDirection: "row",
  },
  imageView: {
    height: Metrics.ratio(45),
    width: Metrics.ratio(45),
    borderRadius: Metrics.ratio(45) / 2,
  },
  flatlistView: {
    paddingTop: Metrics.ratio(10),
  },
  iconStyle: {
    tintColor: Colors.PRIMARY_PINK,
  },
  addButton: {
    width: Metrics.ratio(80),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  seperatorStyle: {
    marginVertical: Metrics.ratio(5),
    marginBottom: Metrics.ratio(15),
  },
  timeRemainingStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.ratio(115),
    borderRadius: Metrics.ratio(20),
    height: Metrics.ratio(28),
    borderColor: Colors.DARK_GREY,
    borderWidth: 1,
  },
  timeRemainingText: {
    marginHorizontal: Metrics.ratio(5),
    color: Colors.DARK_GREY,
    fontSize: Fonts.size.size_14,
  },
  timeRemaining: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.ratio(115),
    borderRadius: Metrics.ratio(20),
    height: Metrics.ratio(26),
    borderColor: Colors.DARK_GREY,
    borderWidth: 1,
    marginTop: Metrics.ratio(10),
    backgroundColor: Colors.TIME_BG,
  },
});
