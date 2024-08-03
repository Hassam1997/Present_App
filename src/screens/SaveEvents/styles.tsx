/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
export default StyleSheet.create({
  containerSearch: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(5),
  },
  bulletContainer: {
    height: Metrics.ratio(22),
    width: Metrics.ratio(22),
    borderRadius: Metrics.ratio(20),
  },
  bulletContainerChild: {
    height: Metrics.ratio(14),
    width: Metrics.ratio(14),
  },
  textContainer: { flex: 1 },
  btnSearch: {
    flex: 1,
    paddingLeft: Metrics.ratio(10),
    color: Colors.APP_TEXT,
  },
  searchIcon: {
    tintColor: Colors.APP_TEXT,
    width: 18,
    height: 18,
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: Metrics.ratio(10),
  },
  indicatorStyle: {
    backgroundColor: Colors.PRIMARY_PINK,
    height: 3,
    borderRadius: 10,
    overflow: "hidden",
    width: Metrics.screenWidth * 0.04,
    marginLeft: Metrics.ratio(40),
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
    width: Metrics.screenWidth / 3.36,
    right: Metrics.ratio(4),
  },
  seperatorStyle: {
    marginVertical: Metrics.ratio(10),
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
})
