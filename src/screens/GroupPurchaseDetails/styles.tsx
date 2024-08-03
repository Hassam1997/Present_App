/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
import { Util } from "../../utils";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    paddingBottom: Metrics.bottomPadding,
  },
  containerStyle: {
    width: Metrics.ratio(174),
    // marginLeft: Metrics.ratio(15),
  },
  textStyle: {
    marginTop: Metrics.ratio(16),
  },
  sectioHeaderStyle: {
    paddingHorizontal: 0,
    width: Metrics.screenWidth - 30,
    marginLeft: Metrics.ratio(16),
  },
  contentnContainerStyle: { paddingHorizontal: Metrics.ratio(16) },
  imageView: {
    marginTop: Metrics.ratio(24),
    width: Metrics.ratio(100),
  },
  imageStyle: {
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(40),
  },
  seperatorStyle: {
    marginVertical: 0,
    marginTop: Metrics.ratio(5),
    marginBottom: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(16),
  },
  uploadText: {
    marginTop: Metrics.ratio(6),
  },
  textInputView: {
    marginTop: Metrics.ratio(15),
  },
  btnStyle: {
    // marginTop: Metrics.ratio(30),
    marginHorizontal: Metrics.ratio(16),
    marginBottom: Metrics.bottomPadding,
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
  iconImageStyle: {
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
    marginRight: Metrics.ratio(10),
    tintColor: Colors.TITLE_TEXT,
  },
  distrubationStyle: {
    // flex: 1,
    borderWidth: 1,
    borderRadius: Metrics.ratio(10),
    borderColor: Colors.BORDER_GREY,
    marginTop: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(18),
    paddingVertical: Metrics.ratio(20),
    marginHorizontal: Metrics.ratio(16),
  },
  buttonView: {
    flexDirection: "row",
    width: Metrics.screenWidth,
    justifyContent: "space-between",
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(12),
    // bottom: Metrics.ratio(10),
  },
  newUserButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    width: Metrics.screenWidth * 0.43,
  },
  saveButton: {
    color: Colors.TITLE_TEXT,
    bottom: Util.isPlatformIOS() ? 1 : 2,
  },
  loginButton: {
    width: Metrics.screenWidth * 0.43,
  },
  indicatorStyle: {
    backgroundColor: Colors.PRIMARY_PINK,
    height: 3,
    borderRadius: 10,
    overflow: "hidden",
    width: Metrics.screenWidth * 0.04,
    marginLeft: Metrics.screenWidth * 0.105,
  },
  indicatorContainerStyle: {
    backgroundColor: Colors.WHITE,
    alignSelf: "center",
  },
  tabbarStyle: {
    backgroundColor: Colors.WHITE,
  },
  labelStyle: {
    color: Colors.GREEN,
    textTransform: "capitalize",
    fontSize: Metrics.generatedFontSize(14),
    fontFamily: Fonts.manrope.bold,
    textAlign: "center",
  },
  tabStyle: {
    // padding: Metrics.ratio(5),
    width: Metrics.screenWidth / 4.08,
    // left: Metrics.ratio(14),
  },
  iconImageStyleHeader: {
    transform: [{ rotate: "90deg" }],
  },
});
