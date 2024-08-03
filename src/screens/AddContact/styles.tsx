/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    marginBottom: Metrics.ratio(50),
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
    borderRadius: Metrics.ratio(40),
  },
  uploadText: {
    marginTop: Metrics.ratio(6),
  },
  textInputView: {
    marginTop: Metrics.ratio(15),
  },
  btnStyle: {
    marginTop: Metrics.ratio(30),
    marginBottom: Metrics.ratio(50),
  },
  interestBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Metrics.screenWidth * 0.8,
  },
  interestMetaBlock: {
    flexDirection: "row",
    marginVertical: Metrics.ratio(10),
    flexWrap: "wrap",
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(10),
    backgroundColor: Colors.PINK,
    marginHorizontal: Metrics.ratio(5),
    borderRadius: Metrics.ratio(20),
    borderWidth: 1,
    borderColor: Colors.DARK_PINK,
  },
});
