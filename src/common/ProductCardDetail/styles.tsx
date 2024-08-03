/** @format */

import { StyleSheet } from "react-native"
import { Colors, Metrics, Fonts } from "../../theme"

export default StyleSheet.create({
  card: {
    paddingVertical: Metrics.ratio(16),
  },
  imageSyle: {
    width: Metrics.ratio(67),
    height: Metrics.ratio(67),
    borderRadius: Metrics.ratio(5),
    marginRight: Metrics.ratio(10),
  },
  placeholderSyle: {
    width: Metrics.ratio(67),
    height: Metrics.ratio(67),
    borderRadius: Metrics.ratio(5),
  },
  crossStyles: {
    paddingHorizontal: Metrics.ratio(6),
    height: Metrics.ratio(30),
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcon: {
    width: 24,
    height: 24,
  },
})
