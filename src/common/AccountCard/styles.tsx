/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: Metrics.ratio(12),
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageView: {
    height: Metrics.ratio(60),
    width: Metrics.ratio(60),
    borderRadius: Metrics.ratio(60) / 2,
  },
})
