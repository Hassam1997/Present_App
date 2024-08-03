/** @format */
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";
import { Util } from "../../utils";
export default StyleSheet.create({
  containerSearch: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(10),
    flexDirection: "row",
  },
  bulletContainer: {
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
    borderRadius: Metrics.ratio(20),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  bulletContainerChild: {
    height: Metrics.ratio(13),
    width: Metrics.ratio(13),
    borderRadius: Metrics.ratio(13),
    backgroundColor: Colors.DARK_PINK,
  },
  textContainer: { flex: 1 },
  btnSearch: {
    flex: 1,
    // paddingHorizontal: Metrics.ratio(16),
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
  buttonStyle: {
    marginHorizontal: Metrics.ratio(22),
    marginBottom: Metrics.bottomPadding,
  },
  horizontalContentContainer: {
    paddingTop: Metrics.ratio(10),
    paddingBottom: Metrics.ratio(15),
    // paddingHorizontal: Metrics.ratio(20),
  },
  listGiftContentContainer: {
    paddingTop: Metrics.ratio(10),
    paddingBottom: Metrics.ratio(15),
    paddingHorizontal: Metrics.ratio(16),
  },
  checkBox: {
    // paddingHorizontal: Metrics.ratio(16),
    alignItems: "center",
    justifyContent: "space-between",
  },
  textPadding: {
    paddingLeft: Metrics.ratio(8),
  },
  catagoryButton: {
    height: Metrics.ratio(30),
    width: Metrics.ratio(92),
    justifyContent: "space-evenly",
    borderRadius: Metrics.ratio(5),
    alignItems: "center",
    flexDirection: "row",
    // paddingHorizontal: Metrics.ratio(5),
  },
  priceButton: {
    height: Metrics.ratio(30),
    width: Metrics.ratio(72),
    justifyContent: "space-evenly",
    borderRadius: Metrics.ratio(5),
    alignItems: "center",
    marginLeft: Metrics.ratio(15),
    flexDirection: "row",
    paddingHorizontal: Metrics.ratio(5),
  },
  gradientView: {
    flexDirection: "row",
  },
  containerStyleHeader: {
    paddingHorizontal: Metrics.ratio(5),
  },
  buttonView: {
    flexDirection: "row",
    width: Metrics.screenWidth,
    justifyContent: "space-between",
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(12),
    // bottom: Metrics.ratio(10),
  },
  newUserButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    width: Metrics.screenWidth * 0.43,
  },
  saveButton: {
    color: Colors.TITLE_TEXT,
    bottom: Util.isPlatformIOS() ? 1 : 2,
  },
  loginButton: {
    width: Metrics.screenWidth * 0.43,
  },
  imageStyle: {
    tintColor: Colors.HEART_GREY,
  },
});
