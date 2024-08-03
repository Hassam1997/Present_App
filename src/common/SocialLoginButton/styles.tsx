/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.WHITE,
    borderRadius: Metrics.ratio(10),
    alignItems: "center",
    justifyContent: "center",
    height: Metrics.ratio(50),
    borderWidth: 1,
    flexDirection: "row",
    marginTop: Metrics.ratio(20),
  },
  buttonTextStyle: {
    color: Colors.BLACK,
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
  },
  imageStyle: {
    marginRight: Metrics.ratio(14),
  },
})
