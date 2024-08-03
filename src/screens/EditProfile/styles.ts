/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
  },
  textStyle: {
    marginTop: Metrics.ratio(16),
  },
  imageView: {
    marginTop: Metrics.ratio(24),
    width: Metrics.ratio(100),
  },
  imageStyle: {
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Metrics.ratio(40),
    overflow: "hidden",
  },
  uploadText: {
    marginTop: Metrics.ratio(6),
  },
  textInputView: {
    marginTop: Metrics.ratio(15),
  },
  imageIcon: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(89),
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    paddingHorizontal: Metrics.ratio(22),
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    paddingTop: Metrics.ratio(10),
    paddingBottom: Metrics.ratio(30),
    backgroundColor: Colors.WHITE,
  },
});
