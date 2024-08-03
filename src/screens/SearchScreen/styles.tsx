/** @format */

import { StyleSheet } from "react-native"
import { Colors, Metrics, Fonts } from "../../theme"
import { Util } from "../../utils"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerSearch: {
    paddingHorizontal: Metrics.ratio(16),
    paddingBottom: Metrics.ratio(6),
    paddingTop: Util.isPlatformAndroid()
      ? Metrics.statusBarHeight - 32
      : Util.isDevice14Pro()
      ? Metrics.statusBarHeight + 42
      : Metrics.statusBarHeight - 2,
  },
  btnSearch: {
    flex: 1,
    paddingLeft: Metrics.ratio(10),
  },
  searchIcon: {
    tintColor: Colors.DARK_GREY,
    width: 24,
    height: 24,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Metrics.ratio(10),
  },
  recentText: {
    fontSize: Fonts.size.size_16,
    color: Colors.BLACK,
  },
  seeAllText: {
    fontSize: Fonts.size.size_14,
    color: Colors.EDIT_TEXT,
  },
  renderView: {
    flexDirection: "row",
    paddingVertical: Metrics.ratio(5),
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchIconRecent: {
    width: 24,
    height: 24,
  },
  titleStyle: {
    left: Metrics.ratio(10),
  },
  cancelStyle: {
    tintColor: Colors.BLACK,
  },
  cancelButton: {
    padding: Metrics.ratio(10),
  },
  emptyView: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  flatListView: {
    paddingHorizontal: Metrics.ratio(16),
    paddingBottom: Metrics.ratio(6),
    flexGrow: 1,
  },
  recentText: {
    fontSize: Fonts.size.size_16,
    color: Colors.BLACK,
  },
})
