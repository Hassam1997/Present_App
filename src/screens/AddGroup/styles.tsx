/** @format */
import { StyleSheet } from "react-native"
import { Colors, Metrics } from "../../theme"
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
})
