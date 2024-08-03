/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
import { Util } from "../../utils"
export default StyleSheet.create({
  containerSearch: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    // paddingHorizontal: Metrics.ratio(16),
    paddingBottom: Metrics.ratio(6),
    paddingTop: Util.isPlatformAndroid()
      ? Metrics.statusBarHeight - 32
      : Util.isDevice14Pro()
      ? Metrics.statusBarHeight + 42
      : Metrics.statusBarHeight - 2,
  },
  btnSearch: {
    flex: 1,
    // paddingHorizontal: Metrics.ratio(16),
    paddingLeft: Metrics.ratio(10),
    color: Colors.APP_TEXT,
  },
  searchIcon: {
    tintColor: Colors.DARK_GREY,
    width: 24,
    height: 24,
  },
  indicatorStyle: {
    backgroundColor: Colors.DARK_PINK,
    height: 5,
    color: "red",
    marginLeft: 38,
    borderRadius: 20,
    overflow: "hidden",
    alignContent: "center",
    width: Metrics.screenWidth * 0.05,
  },
  indicatorContainerStyle: {
    alignItems: "center",
  },
  customCardContainer: {
    paddingHorizontal: Metrics.ratio(5),
    marginBottom: Metrics.ratio(10),
  },
  tabbarStyle: {
    paddingBottom: 2,
    backgroundColor: Colors.WHITE,
    width: Metrics.screenWidth,
  },
  labelStyle: {
    color: Colors.GRAY,

    backgroundColor: Colors.GRAY,
    fontSize: Metrics.ratio(20),
  },
  cardContainer: {
    justifyContent: "space-evenly",
    flex: 1,
    paddingHorizontal: Metrics.ratio(15),
    paddingRight: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(10),
  },
  tabStyle: {
    width: Metrics.screenWidth / 4.5,
    left: Metrics.ratio(4),
  },
  categoryContainerBlue: {
    justifyContent: "center",
    flexDirection: "row",
    width: Metrics.ratio(100),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(10),
    marginVertical: Metrics.ratio(12),
    backgroundColor: Colors.SKY_BLUE,
    borderColor: Colors.SKY_BLUE_BORDER,
    borderWidth: 1,
  },
  categoryContainerPink: {
    justifyContent: "center",
    flexDirection: "row",
    width: Metrics.ratio(119),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(10),
    marginVertical: Metrics.ratio(12),
    backgroundColor: Colors.PINK,
    borderColor: Colors.DARK_PINK,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: Fonts.size.size_12,
    marginHorizontal: Metrics.ratio(5),
    color: Colors.BLACK,
  },
  timeRemaining: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.ratio(115),
    borderRadius: Metrics.ratio(20),
    height: Metrics.ratio(28),
    backgroundColor: Colors.LIGHT_GREY1,
    borderColor: Colors.DARK_GREY,
    borderWidth: 1,
    marginVertical: Metrics.ratio(10),
  },
  timeRemainingText: {
    marginHorizontal: Metrics.ratio(5),
    color: Colors.DARK_GREY,
  },
  filterIconContainer: {
    position: "absolute",
    right: 15,
    top: 14,
    zIndex: 1000,
  },
  filterValueLength: {
    width: Metrics.ratio(16),
    height: Metrics.ratio(16),
    position: "absolute",
    zIndex: 1000,
    right: -6,
    top: -5,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 14,
    backgroundColor: Colors.DARK_PINK,
  },
  filterValueLengthText: {
    color: Colors.WHITE,
    fontSize: Metrics.ratio(10),
  },
})
