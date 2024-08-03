/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    paddingBottom: Metrics.bottomPadding,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  textStyle: {
    marginTop: Metrics.ratio(10),
  },
  imageView: {
    marginTop: Metrics.ratio(15),
    width: Metrics.ratio(100),
  },
  imageStyle: {
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
  },
  uploadText: {
    marginTop: Metrics.ratio(6),
  },
  textInputView: {},
  policyTextView: {
    marginVertical: Metrics.ratio(20),
    justifyContent: "center",
  },
  policyText: {
    marginVertical: Metrics.ratio(10),
  },
  polictTextPrimary: {
    top: 3,
  },
  btnStyle: {
    marginTop: Metrics.ratio(30),
  },
  txtChangePass: {
    marginTop: 10,
    color: Colors.TITLE_TEXT,
  },
});
