/** @format */

import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  card: {
    paddingVertical: Metrics.ratio(16),
  },
  imageSyle: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    borderRadius: Metrics.ratio(25),
    marginRight: Metrics.ratio(10),
  },
  imagePlaceholderSyle: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    borderRadius: Metrics.ratio(25),
  },
  imageProfileSyle: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    borderRadius: Metrics.ratio(30),
    marginRight: Metrics.ratio(8),
  },
  textInputStyle: {
    width: Metrics.ratio(87),
    height: Metrics.ratio(32),
    backgroundColor: Colors.INPUT_PRIMARY,
    borderRadius: Metrics.ratio(10),
    padding: 0,
    alignItems: "center",
  },
  birthdaySyle: {
    marginRight: Metrics.ratio(5),
  },
  titleTextStyle: {
    // flex: 1,
    // width: Metrics.screenWidth * 0.696,
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
    width: Metrics.ratio(15),
    height: Metrics.ratio(15),
    tintColor: Colors.WHITE,
  },
  crossStyles: {
    position: "absolute",
    top: 10,
    right: 0,
    width: Metrics.ratio(21),
    height: Metrics.ratio(21),
    borderRadius: Metrics.ratio(11),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BLACK05,
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
});
