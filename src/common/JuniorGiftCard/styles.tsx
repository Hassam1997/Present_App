/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageView: {
    height: Metrics.ratio(60),
    width: Metrics.ratio(60),
    borderRadius: Metrics.ratio(60) / 2,
    marginRight: Metrics.ratio(16),
  },
  placeholderImageView: {
    height: Metrics.ratio(60),
    width: Metrics.ratio(60),
    borderRadius: Metrics.ratio(60) / 2,
  },
  iconStyle: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    tintColor: Colors.DARK_GREY,
  },
});
