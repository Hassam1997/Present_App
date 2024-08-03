/** @format */

import { StyleSheet } from "react-native"
import { Fonts, Metrics, Colors } from "../../theme"

export default StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Metrics.ratio(5),
  },
  container: {
    borderRadius: Metrics.ratio(6),
  },
  btnStyleContainer: {
    width: Metrics.ratio(24),
    height: Metrics.ratio(24),
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.GRAY,
    borderWidth: 1,
  },
  innerCircleStyle: {
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
  },
  textStyle: {
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
    width: Metrics.screenWidth * 0.8,
  },
  radioButton: {
    width: Metrics.ratio(16),
    height: Metrics.ratio(16),
    backgroundColor: Colors.PRIMARY_PINK,
    borderRadius: 20,
  },
})
