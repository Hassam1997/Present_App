/** @format */
import { StyleSheet } from "react-native"
import { Metrics } from "../../theme"
export default StyleSheet.create({
  categoryBlock: {
    alignItems: "center",
    width: Metrics.ratio(110),
    marginLeft: Metrics.ratio(Metrics.PaddingHorizontalValue),
  },
  categoryImage: {
    height: Metrics.ratio(110),
    borderRadius: Metrics.ratio(10),
    width: "100%",
    overflow: "hidden",
  },
  categoryText: {
    marginVertical: Metrics.ratio(8),
    textAlign: "center",
  },
})
