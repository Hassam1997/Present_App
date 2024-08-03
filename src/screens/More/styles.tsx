/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
export default StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  profileView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Metrics.ratio(16),
  },
  imageView: {
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(80) / 2,
  },
  profileImage: {
    height: Metrics.ratio(64),
    width: Metrics.ratio(64),
  },
  profileButton: {
    margin: Metrics.ratio(10),
    alignItems: "center",
  },
})
