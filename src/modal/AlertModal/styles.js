/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  modal: {
    margin: 50,
  },
  mainContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(60, 60, 67, 0.36)",
  },
  title: {
    lineHeight: 22,
    textAlign: "center",
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.manrope.semiBold,
    color: Colors.TITLE_TEXT,
  },
  description: {
    lineHeight: 18,
    fontFamily: Fonts.manrope.regular,
    textAlign: "center",
    color: Colors.TITLE_TEXT,
    fontSize: Fonts.size.size_14,
    marginTop: Metrics.ratio(2),
    marginBottom: Metrics.ratio(16),
    width: Metrics.screenWidth * 0.45,
  },
  button: {
    flex: 1,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.manrope.medium,
    color: Colors.TITLE_TEXT,
  },
  buttonText1: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.manrope.regular,
    color: Colors.TITLE_TEXT,
  },
  buttonSeparator: {
    width: 0.5,
    backgroundColor: "rgba(60, 60, 67, 0.36)",
  },
});
