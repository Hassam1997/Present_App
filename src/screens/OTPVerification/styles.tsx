/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
export default StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
  },
  txtStyle: {
    marginTop: Metrics.ratio(16),
    lineHeight: Metrics.ratio(24),
    letterSpacing: Metrics.ratio(1),
  },
  cellStyle: {
    fontFamily: Fonts.manrope.semiBold,
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    lineHeight: Metrics.ratio(50),
  },
  focusCellStyle: {
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.OTP_FIELDS,
  },
  containerFieldsStyle: {
    marginTop: Metrics.ratio(20),
  },
  codeFieldStyle: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    borderRadius: 10,
    borderColor: Colors.OTP_BORDER,
    borderWidth: 1,
    marginRight: Metrics.ratio(8),
    backgroundColor: Colors.OTP_FIELDS,
  },
  containerTimerStyle: { marginTop: Metrics.ratio(12) },
  txtTimerStyle: { marginLeft: Metrics.ratio(6) },
  btnSendStyle: {
    marginTop: Metrics.ratio(30),
    flexDirection: "row",
    alignSelf: "center",
    padding: 1,
  },
  btnStyle: {
    marginTop: Metrics.ratio(30),
  },
  verifyText: {
    marginTop: Metrics.ratio(20),
  },
});
