/** @format */

import { StyleSheet } from "react-native"
import { Colors, Metrics } from "../../theme"

const styles: StyleSheetProps = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Metrics.ratio(16),
  },
  txtStyle: {
    marginTop: Metrics.ratio(16),
    lineHeight: Metrics.ratio(24),
    paddingRight: Metrics.ratio(20),
  },
  btnStyle: {
    marginTop: Metrics.ratio(30),
  },
  inputStyle: {
    marginTop: Metrics.ratio(15),
  },
})

export default styles
