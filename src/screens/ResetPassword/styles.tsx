/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
export default StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
  },
  txtStyle: {
    marginTop: Metrics.ratio(10),
    lineHeight: Metrics.ratio(24),
  },
  etPassStyle: {
    marginTop: Metrics.ratio(15),
  },
  btnStyle: {
    marginTop: Metrics.ratio(40),
  },
})
