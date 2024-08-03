/** @format */

import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
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
  },
  policyText: {
    color: Colors.APP_TEXT,
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
    marginTop: Metrics.ratio(26),
    alignSelf: "center",
    width: Metrics.screenWidth * 0.9,
    textAlign: "center",
  },
  polictTextPrimary: {
    top: 3,
  },
})
