/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingVertical: Metrics.ratio(16),
  },
  titleText: {
    marginTop: Metrics.ratio(25),
  },
  titleTextKid: {
    marginTop: Metrics.ratio(5),
  },
  footerView: {
    height: Metrics.ratio(40),
  },
  flatlistView: {
    flexGrow: 1,
  },
  flatlistViewStyle: {
    // flex: 1,
    flexGrow: 1,
    paddingHorizontal: Metrics.ratio(16),
  },
  emptyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: Metrics.ratio(30),
  },
  image: {
    height: Metrics.ratio(117),
    width: Metrics.ratio(157),
    marginBottom: Metrics.ratio(10),
  },
  emptyButton: {
    width: Metrics.screenWidth * 0.9,
    marginTop: Metrics.ratio(30),
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
});
