/** @format */

import { StyleSheet } from "react-native"
import { Colors, Metrics, Fonts } from "../../theme"

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Metrics.bottomPadding,
  },
  itemSeperator: {
    height: Metrics.ratio(1),
    backgroundColor: Colors.SEPERATOR,
    width: Metrics.screenWidth * 0.9,
    alignSelf: "center",
  },
  itemSeperatorLatest: {
    height: Metrics.ratio(10),
  },
  header: {
    fontFamily: Fonts.manrope.medium,
    fontSize: Fonts.size.size_14,
    paddingTop: Metrics.ratio(23),
    paddingBottom: Metrics.ratio(13),
    paddingLeft: Metrics.ratio(15),
  },
  notificationEmptyContainer: {
    height: Metrics.ratio(160),
    width: Metrics.ratio(160),
    borderRadius: Metrics.ratio(160),
    marginBottom: Metrics.ratio(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.LIGHT_GREY,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: { flexGrow: 1 },
  notificationImage: { height: Metrics.ratio(106), width: Metrics.ratio(101) },
})
