/** @format */

import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
  },
  mainContainer: {
    width: Metrics.screenWidth,
    alignSelf: "center",
    paddingHorizontal: Metrics.ratio(10),
    paddingBottom: Metrics.bottomPadding,
  },
  subContainer: {
    overflow: "hidden",
    borderRadius: Metrics.ratio(15),
  },
  titleView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    paddingVertical: Metrics.ratio(15),
    borderTopRightRadius: Metrics.ratio(15),
  },
  title: {
    lineHeight: 22,
    textAlign: "center",
    fontSize: Fonts.size.size_17,
    fontFamily: Fonts.manrope.bold,
    color: Colors.TITLE_TEXT,
  },
  textStyle: {
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
    color: Colors.TITLE_TEXT,
    textAlign: "center",
  },
  messageView: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageView: {
    marginLeft: Metrics.ratio(16),
  },
  dataView: {
    backgroundColor: Colors.WHITE,
    borderTopColor: Colors.BOTTOM_SHEET_SEPERATOR,
    borderTopWidth: 0.5,
    paddingVertical: 15,
  },
  cancelButton: {
    backgroundColor: Colors.WHITE,
    marginTop: Metrics.ratio(10),
    borderRadius: Metrics.ratio(15),
    height: Metrics.ratio(60),
    alignItems: "center",
    justifyContent: "center",
  },
})
