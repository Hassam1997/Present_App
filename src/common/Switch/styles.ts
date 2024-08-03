/** @format */

import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  containerStyle: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(24),
    borderRadius: Metrics.ratio(16),
    padding: Metrics.ratio(2),
  },
  circleStyle: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    borderRadius: Metrics.ratio(100),
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
});
