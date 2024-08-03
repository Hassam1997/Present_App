/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Metrics.ratio(5),
    marginVertical: Metrics.ratio(20),
    justifyContent: "center",
  },
  seperator: {
    height: Metrics.ratio(1),
    backgroundColor: Colors.seperator,
    width: Metrics.screenWidth * 0.41,
    opacity: 0.15,
  },
  text: {
    marginHorizontal: Metrics.ratio(6),
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.manrope.regular,
    color: Colors.DARK_GREY,
  },
  singleSeperator: {
    height: Metrics.ratio(1),
    backgroundColor: Colors.seperator,
    width: Metrics.screenWidth * 0.92,
    opacity: 0.15,
  },
})
