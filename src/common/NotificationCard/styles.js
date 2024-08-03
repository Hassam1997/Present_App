/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(15),
    alignItems: "center",
  },
  imageView: {
    height: Metrics.ratio(50),
    width: Metrics.ratio(50),
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: { flex: 0.2 },
  textContainer: {
    flex: 1,
    paddingHorizontal: Metrics.ratio(15),
  },
  notificationImage: {
    height: Metrics.ratio(49),
    width: Metrics.ratio(49),
    borderRadius: 5,
    overflow: "hidden",
  },
  innerContainer: {
    paddingLeft: Metrics.ratio(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Metrics.screenWidth * 0.85,
  },

  notificationContainer: {
    flex: 0.2,
  },
  title: {
    color: Colors.TEXT_GREY,
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
  },
  timeContainer: { color: Colors.GRAY, paddingVertical: Metrics.ratio(5) },
});

export default styles;
