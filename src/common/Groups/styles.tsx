/** @format */

import { StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  cardView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarStyle: {
    height: Metrics.ratio(50),
    width: Metrics.ratio(50),
    borderRadius: Metrics.ratio(50),
  },
  checkBoxView: {
    flex: 1,
    marginLeft: Metrics.ratio(14),
  },
  checkBoxContainer: {
    borderRadius: Metrics.ratio(30),
  },
  titleTextStyle: {
    fontFamily: Fonts.manrope.medium,
    flex: 1,
  },
  subContainer: {
    paddingTop: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(16),
    flexGrow: 1,
  },
});
