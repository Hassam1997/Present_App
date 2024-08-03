/** @format */

import { StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  cardView: {
    flexDirection: "row",
    alignItems: "center",
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
  imageBackgroundStyle: {
    height: Metrics.ratio(172),
    borderRadius: Metrics.ratio(5),
    overflow: "hidden",
    paddingVertical: Metrics.ratio(20),
    paddingHorizontal: Metrics.ratio(22),
    marginBottom: Metrics.ratio(16),
  },
  buttonStyle: {
    backgroundColor: Colors.WHITE,
  },
  textStyle: {
    color: Colors.PRIMARY,
  },
  fbIcon: {
    position: "absolute",
    right: -5,
    zIndex: 99999,
    bottom: -5,
    height: Metrics.ratio(18),
    width: Metrics.ratio(18),
  },
});
