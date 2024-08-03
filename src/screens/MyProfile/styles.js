/** @format */

import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  subContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Metrics.ratio(15),
    paddingHorizontal: Metrics.ratio(16),
    width: Metrics.screenWidth,
    backgroundColor: Colors.white,
    height: Metrics.ratio(96),
    flexDirection: "row",
  },
  imageView: {
    height: Metrics.ratio(72),
    width: Metrics.ratio(72),
    borderRadius: Metrics.ratio(72) / 2,
    overflow: "hidden",
  },
  titleStyle: {
    marginLeft: Metrics.ratio(7),
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    padding: Metrics.ratio(20),
  },
});
