/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: Metrics.ratio(10),
    alignItems: "center",
    justifyContent: "center",
    height: Metrics.ratio(50),
    flexDirection: "row",
  },
  buttonTextStyle: {
    color: Colors.WHITE,
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.bold,
  },
  imageStyle: {
    marginRight: Metrics.ratio(10),
  },
})
