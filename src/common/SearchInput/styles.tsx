/** @format */
import { StyleSheet } from "react-native"
import { Colors, Metrics, Fonts } from "../../theme"
export default StyleSheet.create({
  mainContainer: {},
  container: {
    height: Metrics.ratio(42),
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: Metrics.ratio(5),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    // paddingHorizontal: Metrics.ratio(14),
    paddingLeft: Metrics.ratio(14),
    marginBottom: Metrics.ratio(15),
    marginTop: Metrics.ratio(10),
    flex: 1,
  },
  parent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  placeHolder: {
    marginHorizontal: Metrics.ratio(10),
    color: Colors.APP_TEXT,
    width: Metrics.screenWidth * 0.62,
  },
  textInputStyle: {
    color: Colors.GRAY,
    fontSize: Fonts.size.size_17,
    marginHorizontal: Metrics.ratio(10),
    height: Metrics.ratio(46, 46),
    flex: 1,
  },
  cancelButton: {
    backgroundColor: Colors.DARK_GREY,
    padding: Metrics.ratio(3),
    borderRadius: Metrics.ratio(20),
    marginRight: Metrics.ratio(14),
  },
  crossRadiusImage: {
    height: Metrics.ratio(12),
    width: Metrics.ratio(12),
    tintColor: Colors.WHITE,
  },
  btnCancelStyle: {
    marginLeft: Metrics.ratio(10),
    justifyContent: "center",
    padding: 2,
    height: Metrics.ratio(46, 46),
    bottom: Metrics.ratio(4),
  },
  searchFilterView: {
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderColor: Colors.GOOGLE_BUTTON_BORDER,
    height: Metrics.ratio(40),
    // paddingHorizontal: Metrics.ratio(11),
    marginLeft: Metrics.ratio(12),
    flex: 1,
  },
})
