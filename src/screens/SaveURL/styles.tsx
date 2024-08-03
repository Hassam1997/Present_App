/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
export default StyleSheet.create({
  containerSearch: {
    backgroundColor: Colors.WHITE,
    flexGrow: 1,
    justifyContent: "space-between",
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
  etURLStyle: {
    height: Metrics.ratio(117),
    borderRadius: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(10),
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
    color: Colors.TITLE_TEXT,
  },
});
