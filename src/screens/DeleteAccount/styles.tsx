/** @format */

import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.ratio(16),
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
    paddingBottom: Metrics.bottomPadding,
  },
  footerStyle: {
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.bottomPadding,
  },
  headerView: {
    marginTop: Metrics.ratio(20),
  },
  gobackButton: {
    backgroundColor: Colors.WHITE,
  },
  gobackText: {
    color: Colors.APP_TEXT,
  },
})
