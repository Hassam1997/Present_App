/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    // paddingTop: Metrics.ratio(20),
    flex: 1,
    // marginHorizontal: Metrics.ratio(20),
    backgroundColor: Colors.WHITE,
  },
  listContainer: {
    // flex: 1,
    paddingBottom: Metrics.bottomPadding,
    // paddingHorizontal: Metrics.ratio(20),
  },
  buttonStyle: {
    marginTop: 50,
  },
  titleStyle: {
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
    fontFamily: Fonts.manrope.regular,
    flex: 1,
  },
  searchTextStyle: {
    fontSize: Fonts.size.size_16,
    color: Colors.grey,
    fontFamily: Fonts.manrope.light,
    marginLeft: Metrics.ratio(10),
  },
  mainSearchView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Metrics.ratio(20),
  },
  marginPageStyle: {
    marginHorizontal: Metrics.ratio(20),
  },
  pushNotifications: {
    paddingRight: Metrics.ratio(16),
    paddingLeft: Metrics.ratio(16),
    borderColor: "#EFEFEF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Metrics.ratio(15),
    // marginBottom: Metrics.ratio(20),
  },
  imageView: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
    borderRadius: Metrics.ratio(20),
    justifyContent: "center",
    alignItems: "center",
  },
  cardView: {
    backgroundColor: Colors.white,
    // paddingVertical: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(16),
    borderColor: "#EFEFEF",
    flexDirection: "row",
    alignItems: "center",
  },
  seperatorStyle: {
    marginVertical: 10,
  },
});
