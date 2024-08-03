/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
export default StyleSheet.create({
  eventTextWithImagecontainer: {
    alignItems: "center",
    width: Metrics.screenWidth,
    paddingVertical: Metrics.ratio(20),
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: Metrics.ratio(Metrics.PaddingHorizontalValue),
  },
  secondText: {
    color: Colors.DARK_GREY,
  },
  eventTextWithImagecontainerImage: {
    height: Metrics.ratio(24),
    width: Metrics.ratio(24),
  },
});
