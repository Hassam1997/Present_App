/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
export default StyleSheet.create({
  containerSearch: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  btnSearch: {
    flex: 1,
    paddingLeft: Metrics.ratio(10),
    color: Colors.APP_TEXT,
  },
  searchIcon: {
    tintColor: Colors.DARK_GREY,
    width: 24,
    height: 24,
  },
  bottomContainer: {
    paddingHorizontal: Metrics.ratio(22),
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    paddingTop: Metrics.ratio(10),
    paddingBottom: Metrics.ratio(30),
    backgroundColor: Colors.WHITE,
  },
  imageSliderView: {
    marginVertical: Metrics.ratio(15),
  },
  imageView: {
    height: Metrics.ratio(45),
    width: Metrics.ratio(45),
    borderRadius: Metrics.ratio(45) / 2,
  },
  crossIconStyle: {
    position: "absolute",
    right: -3,
    bottom: 30,
  },
  indicatorStyle: {
    backgroundColor: Colors.PRIMARY_PINK,
    height: 3,
    borderRadius: 10,
    overflow: "hidden",
    width: Metrics.screenWidth * 0.04,
    marginLeft: Metrics.ratio(42),
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
    width: Metrics.screenWidth / 5,
    left: Metrics.ratio(8),
  },
})
