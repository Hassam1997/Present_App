/** @format */
import { StyleSheet } from "react-native"
import { Colors, Metrics } from "../../theme"
export default StyleSheet.create({
  containerStyle: {
    paddingHorizontal: Metrics.ratio(14),
    backgroundColor: Colors.WHITE,
  },
  txtStyle: {
    marginTop: Metrics.ratio(16),
    lineHeight: Metrics.ratio(24),
    paddingRight: Metrics.ratio(16),
  },
  etEmailStyle: {
    marginTop: Metrics.ratio(15),
  },
  btnStyle: {
    marginTop: Metrics.ratio(30),
  },
  inputStyle: {
    marginTop: Metrics.ratio(15),
  },
})
