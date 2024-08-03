/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    paddingVertical: Metrics.ratio(10, 10),
    borderRadius: 10,
    width: Metrics.screenWidth * 0.94,
    alignItems: "center",
    paddingHorizontal: Metrics.ratio(10),
  },
  imageView: {
    height: Metrics.ratio(40),
    width: Metrics.ratio(40),
    borderRadius: Metrics.ratio(40) / 2,
    overflow: "hidden",
  },
  innerContainer: {
    marginLeft: Metrics.ratio(15),
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    width: Metrics.screenWidth * 0.68,
  },
  imageContainer: {
    padding: Metrics.ratio(10),
  },
  title: {
    color: Colors.TEXT_GREY,
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.manrope.medium,
    width: Metrics.screenWidth * 0.7,
  },
  subTitle: {
    color: Colors.LIGHT_GREY,
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.regular,
    marginTop: Metrics.ratio(3),
    marginRight: Metrics.ratio(6),
  },
  distance: {
    color: Colors.LIGHT_GREY,
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.regular,
    marginLeft: Metrics.ratio(6),
    top: 1,
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
