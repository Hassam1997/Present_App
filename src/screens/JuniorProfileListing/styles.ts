/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  listGiftContentContainer: {
    paddingTop: Metrics.ratio(20),
    paddingBottom: Metrics.ratio(15),
    paddingHorizontal: Metrics.ratio(16),
  },
  createButton: {
    height: Metrics.ratio(46),
    width: Metrics.ratio(46),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_PINK,
    position: "absolute",
    borderRadius: Metrics.ratio(8),
    bottom: Metrics.ratio(50),
    right: Metrics.ratio(16),
  },
  addImage: {
    height: Metrics.ratio(30),
    width: Metrics.ratio(30),
  },
});
