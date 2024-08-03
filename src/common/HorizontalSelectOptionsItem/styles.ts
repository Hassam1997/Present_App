/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  headerView: {
    borderWidth: 1,
    borderRadius: Metrics.ratio(5),
    borderColor: Colors.DISABLE_BUTTON,
  },
  headerViewGradient: {
    paddingVertical: Metrics.ratio(11),
    paddingHorizontal: Metrics.ratio(16),
    borderRadius: Metrics.ratio(5),
  },
});
