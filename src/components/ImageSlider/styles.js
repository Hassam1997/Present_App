/** @format */

import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerView: {
    height: Metrics.screenHeight * 0.42,
    width: Metrics.screenWidth,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationContainer: {
    alignSelf: "center",
    marginTop: Metrics.ratio(13),
  },
  flatlistStyle: {
    height: Metrics.screenHeight * 0.42,
    width: Metrics.screenWidth,
  },
})

export default styles
