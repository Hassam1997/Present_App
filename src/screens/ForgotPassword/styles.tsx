/** @format */
import { StyleSheet } from "react-native"
import { Colors, Metrics } from "../../theme"
export default StyleSheet.create({
  containerStyle: {
    paddingHorizontal: Metrics.ratio(14),
    backgroundColor: Colors.WHITE,
  },
  txtStyle: {
    marginTop: Metrics.ratio(10),
    lineHeight: Metrics.ratio(24),
  },
  etEmailStyle: {
    marginTop: Metrics.ratio(15),
  },
  btnStyle: {
    marginTop: Metrics.ratio(30),
  },
})
