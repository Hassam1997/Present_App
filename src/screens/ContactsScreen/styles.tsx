/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
export default StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  btnSearch: {
    flex: 3,
    paddingLeft: Metrics.ratio(10),
  },
  searchIcon: {
    tintColor: Colors.DARK_GREY,
    width: 24,
    height: 24,
  },
  indicatorStyle: {
    backgroundColor: Colors.PRIMARY_PINK,
    height: 3,
    borderRadius: 10,
    overflow: "hidden",
    width: Metrics.screenWidth * 0.04,
    marginLeft: Metrics.ratio(53),
  },
  indicatorContainerStyle: {
    backgroundColor: Colors.WHITE,
  },
  tabbarStyle: {
    backgroundColor: Colors.WHITE,
  },
  labelStyle: {
    color: Colors.GREEN,
    textTransform: "capitalize",
    fontSize: Metrics.generatedFontSize(14),
    fontFamily: Fonts.manrope.bold,
    textAlign: "center",
  },
  tabStyle: {
    padding: Metrics.ratio(5),
    width: Metrics.screenWidth / 3.9,
    left: Metrics.ratio(14),
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
});
