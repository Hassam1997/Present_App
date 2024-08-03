/** @format */

import { StyleSheet, Platform } from "react-native"

import { Fonts, Colors, Metrics } from "../../theme"

const styles: StyleSheetProps = StyleSheet.create({
  input: {
    paddingBottom: Metrics.ratio(15, 12),
    paddingTop: Metrics.ratio(15, 12),
    paddingHorizontal: Metrics.ratio(15),
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
    fontFamily: Fonts.manrope.regular,
    includeFontPadding: false,
    backgroundColor: Colors.INPUT_PRIMARY,
    marginTop: Metrics.ratio(15),
    borderRadius: Metrics.ratio(10),
    height: Metrics.ratio(50),
    paddingRight: Metrics.ratio(50),
  },
  multline: {
    // height: Metrics.multilineHeight,
    paddingBottom: 24,
  },
  inputContainer: {
    height: 85,
    backgroundColor: "red",
  },
  errorText: {
    // fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.size_12,
    color: Colors.ERRORINPUT,
    marginTop: Metrics.ratio(0),
  },
  hint: {
    marginTop: Metrics.ratio(6),
  },
  title: {
    marginTop: Metrics.ratio(15),
    color: Colors.TITLE_TEXT,
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.semiBold,
  },
  arrowStyle: { marginRight: Metrics.ratio(0), tintColor: Colors.DARK_GREY },
  bottomSpace: { marginBottom: Metrics.ratio(8) },
  topSpace: { marginTop: Metrics.ratio(0) },
  labelText: {
    bottom: Metrics.ratio(0),
    fontSize: Fonts.size.size_12,
  },
  leftIconStyle: {
    width: 49,
    height: 49,
    borderRadius: 24.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 2,
    bottom: -5,
  },
  rightIconStyle: {
    height: Metrics.ratio(46),
    justifyContent: "center",
    bottom: 10,
    top: 15,
    position: "absolute",
    right: 6,
    padding: 8,
    alignItems: "flex-end",
  },
  rightIconStylePhoneInput: {
    height: Metrics.ratio(46),
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 3,
    bottom: 10,
    top: 14,
    paddingleft: 5,
    paddingVertical: 8,
    position: "absolute",
    right: 10,
  },
  inputContaine: {},
  onFocuslabelText: {
    fontFamily: Fonts.manrope.regular,
    bottom: Metrics.ratio(0),
    paddingTop: Metrics.ratio(0),
    fontWeight: "600",
    textTransform: "uppercase",
  },
  textField: {
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_13,
    color: Colors.BLACK,
  },
  //////
  container: {
    height: Metrics.ratio(46),
    marginTop: Metrics.ratio(15),
    backgroundColor: Colors.INPUT_PRIMARY,
    width: Metrics.screenWidth * 0.92,
    borderRadius: Metrics.ratio(10),
  },
  textContainer: {
    borderRadius: Metrics.ratio(50),
  },
  codeStyle: {
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
    fontFamily: Fonts.manrope.regular,
    height: 20,
  },
  textInputStyle: {
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
    fontFamily: Fonts.manrope.regular,
    height: Metrics.ratio(42),
    backgroundColor: Colors.INPUT_PRIMARY,
    width: 40,
  },
  flagButton: {
    width: Metrics.ratio(10),
    marginLeft: Metrics.baseMargin,
  },
  inputTitle: {
    color: Colors.TITLE_TEXT,
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.manrope.regular,
  },
})

export default styles
