/** @format */

import { StyleSheet } from "react-native"
import { Colors, Metrics } from "../../theme"

const styles: StyleSheetProps = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageView: {
    height: Metrics.ratio(230),
    width: Metrics.ratio(260),
  },
  textView: {
    marginVertical: Metrics.ratio(25),
  },
  subText: {
    textAlign: "center",
    width: Metrics.screenWidth * 0.85,
  },
  buttonStyle: {
    width: Metrics.screenWidth * 0.9,
    marginTop: Metrics.ratio(40),
  },
})

export default styles
