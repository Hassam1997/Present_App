/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.WHITE,
    width: Metrics.screenWidth,
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(14),
  },
  textStyle: {
    marginVertical: Metrics.ratio(15),
    width: Metrics.screenWidth * 0.9,
  },
  subView: {
    borderBottomColor: Colors.SEPERATOR,
    marginTop: Metrics.ratio(16),
  },
  socailView: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: Metrics.ratio(10),
  },
  imageStyle: {
    height: Metrics.ratio(34),
    width: Metrics.ratio(34),
    marginRight: Metrics.ratio(10),
  },
});

export default styles;
