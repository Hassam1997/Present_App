/** @format */

import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  card: {
    paddingVertical: Metrics.ratio(16),
  },
  imageSyle: {
    width: Metrics.ratio(87),
    height: Metrics.ratio(87),
    borderRadius: Metrics.ratio(5),
    marginRight: Metrics.ratio(10),
    alignItems: "center",
    justifyContent: "center",
  },
  giftImageStyle: {
    width: Metrics.ratio(47),
    height: Metrics.ratio(47),
  },
  imageSylePlaceholder: {
    width: Metrics.ratio(87),
    height: Metrics.ratio(87),
    borderRadius: Metrics.ratio(5),
  },
  imageProfileSyle: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    borderRadius: Metrics.ratio(30),
    marginRight: Metrics.ratio(8),
  },
  birthdaySyle: {
    marginRight: Metrics.ratio(5),
  },
  titleTextStyle: {
    maxWidth: Metrics.screenWidth * 0.5,
  },
  circleCheckStyle: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    borderRadius: Metrics.ratio(10),
    marginRight: Metrics.ratio(8),
  },
  marginRight: {
    marginRight: Metrics.ratio(15),
  },
  checkBoxStyle: {
    marginRight: Metrics.ratio(10),
  },
  imageStyle: {
    width: Metrics.ratio(24),
    height: Metrics.ratio(24),
  },
  crossStyles: {
    position: "absolute",
    top: 10,
    right: 0,
    width: Metrics.ratio(21),
    height: Metrics.ratio(21),
    borderRadius: Metrics.ratio(11),
  },
  activeStyles: {
    position: "absolute",
    bottom: 10,
    right: 0,
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(9),
    borderRadius: Metrics.ratio(5),
    borderWidth: 0.8,
  },
  ratingText: {
    position: "absolute",
    right: 8,
    top: 4,
    color: Colors.BLACK,
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.medium,
  },
  purchaseButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
