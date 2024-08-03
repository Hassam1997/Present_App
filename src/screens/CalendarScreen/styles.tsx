/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
import { Util } from "../../utils"
export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  topTabContainer: {
    paddingHorizontal: 16,
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
  createButton: {
    height: Metrics.ratio(46),
    width: Metrics.ratio(46),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_PINK,
    position: "absolute",
    borderRadius: Metrics.ratio(8),
    bottom: Metrics.ratio(30),
    right: Metrics.ratio(16),
  },
  addImage: {
    height: Metrics.ratio(30),
    width: Metrics.ratio(30),
  },
})
