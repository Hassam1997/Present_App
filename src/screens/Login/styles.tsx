/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
import { Util } from "../../utils"
export default StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
  },
  btnStyle: {
    marginTop: Metrics.ratio(32),
  },
  btnForgotPassStyle: {
    marginTop: Metrics.ratio(16),
    padding: 1,
    alignSelf: "flex-start",
  },
  buttonView: {
    marginTop: 0,
  },
  policyText: {
    color: Colors.APP_TEXT,
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
    marginVertical: Metrics.ratio(26),
    alignSelf: "center",
    width: Metrics.screenWidth * 0.9,
    textAlign: "center",
  },
  polictTextPrimary: {
    top: Util.isPlatformIOS() ? 3 : 5,
  },
})
