/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    marginBottom: Metrics.ratio(85),
  },
  mainContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  subContainer: {
    alignItems: "center",
    width: Metrics.screenWidth * 0.3,
    marginVertical: Metrics.ratio(10),
  },
  text: {
    color: Colors.LIGHT_GREY,
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.regular,
    paddingTop: Metrics.ratio(5),
  },
});
