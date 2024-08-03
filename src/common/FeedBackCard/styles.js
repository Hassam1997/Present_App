/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
const styles = StyleSheet.create({
  cardContainer: {
    width: Metrics.screenWidth * 0.94,
    paddingVertical: Metrics.ratio(8),
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Metrics.ratio(5),
    marginTop: Metrics.ratio(5),
  },
  title: {
    left: Metrics.ratio(10),
  },
  desc: {
    width: Metrics.screenWidth * 0.8,
    marginTop: Metrics.ratio(5),
  },
  starView: {
    marginVertical: Metrics.ratio(2),
  },
  clipboardStyle: {
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Metrics.ratio(13),
  },
  clipboardText: {
    width: Metrics.screenWidth * 0.55,
  },
  clipboardButton: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    paddingVertical: Metrics.ratio(8),
    paddingHorizontal: Metrics.ratio(18),
    borderRadius: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Metrics.ratio(10),
    borderWidth: 1,
    borderColor: Colors.SEPERATOR,
    borderRadius: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(15),
  },
  socialText: {
    paddingLeft: Metrics.ratio(10),
  },
  bannerView: {
    height: Metrics.ratio(165),
    width: Metrics.screenWidth * 0.941,
    marginVertical: Metrics.ratio(10),
  },
  imageView: {
    height: Metrics.ratio(24),
    width: Metrics.ratio(24),
    borderRadius: Metrics.ratio(24) / 2,
    overflow: "hidden",
  },
});

export default styles;
