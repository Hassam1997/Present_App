/** @format */

import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.DELETE_BG,
    paddingVertical: Metrics.ratio(26),
    alignItems: "center",
    paddingHorizontal: Metrics.ratio(16),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
    paddingBottom: Metrics.bottomPadding,
  },
  footerStyle: {
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.bottomPadding,
    paddingHorizontal: Metrics.ratio(16),
  },
  headerView: {
    marginTop: Metrics.ratio(20),
    paddingHorizontal: Metrics.ratio(16),
  },
  gobackButton: {
    backgroundColor: Colors.WHITE,
  },
  gobackText: {
    color: Colors.APP_TEXT,
  },
  checkBoxStyle: {
    borderRadius: Metrics.ratio(30),
  },
  headerTextStyle: {
    textAlign: "center",
    width: Metrics.screenWidth * 0.8,
  },
})
