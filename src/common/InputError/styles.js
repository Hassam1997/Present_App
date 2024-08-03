/** @format */

import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  errorText: {
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_12,
    color: Colors.ERRORINPUT,
    marginTop: Metrics.ratio(8),
    marginLeft: Metrics.ratio(10),
  },
});
