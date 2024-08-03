/** @format */
import { StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../theme";
export default StyleSheet.create({
  mainView: {},
  container: {
    borderRadius: Metrics.ratio(6),
  },
  btnStyleContainer: {
    width: Metrics.ratio(24),
    height: Metrics.ratio(24),
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.APP_TEXT,
    borderWidth: 1,
  },

  textStyle: {
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_14,
    color: Colors.WHITE,
    width: Metrics.screenWidth * 0.8,
    marginHorizontal: Metrics.ratio(6),
  },
  darkTextStyle: {
    fontSize: Fonts.size.size_17,
    paddingLeft: Metrics.ratio(16),
    color: Colors.DARK_GREY,
  },
});
