/** @format */

import { StyleSheet } from "react-native";
import { Metrics, Fonts, Colors } from "../../theme";

export default StyleSheet.create({
  titleTextStyle: {
    color: Colors.black,
    fontFamily: Fonts.manrope.regular,
  },
  starStyle: {
    marginLeft: 0,
    marginRight: Metrics.ratio(10),
    transform: [],
  },
  starContainer: {
    paddingHorizontal: Metrics.ratio(2),
  },
  countText: {
    marginLeft: Metrics.ratio(5),
    color: Colors.YELLOW,
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.regular,
    alignSelf: "center",
  },
  count: {
    marginLeft: Metrics.ratio(5),
    color: Colors.YELLOW,
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.regular,
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  upto: {
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.regular,
    marginLeft: Metrics.ratio(5),
    color: Colors.YELLOW,
  },
});
