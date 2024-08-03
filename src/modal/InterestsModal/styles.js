/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

const ImageContainer = Metrics.screenWidth * 0.32;
const ImageHeight = Metrics.screenWidth * 0.27;

export default StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
    // position: 'absolute',
    // bottom: 0,
  },
  mainContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(16),
    paddingBottom: Metrics.bottomPadding,
    height: Metrics.screenHeight * 0.9,
    // height: 700,
  },
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
  headerBackView: {
    height: Metrics.ratio(24),
    width: Metrics.ratio(24),
    tintColor: Colors.BLACK,
  },
  listContainer: {
    // flex: 1,
    paddingBottom: Metrics.ratio(10),
  },
  containerStyle: {
    width: Metrics.screenWidth - 40,
  },
  itemContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: Metrics.ratio(30),
  },
  halfContainer: {
    height: ImageContainer / 2,
  },
  textStyle: {
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_16,
    color: Colors.blackShade,
  },
  imageStyle: {
    marginRight: Metrics.ratio(20),
  },
  descriptionStyle: { marginVertical: 12 },
  crossContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 7,
  },
  cancelText: {
    fontFamily: Fonts.manrope.bold,
    fontSize: Fonts.size.size_14,
    color: Colors.APP_TEXT,
  },
  cancelWithTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    // marginHorizontal: 16,
  },
  titleText: {
    fontFamily: Fonts.manrope.bold,
    fontSize: Fonts.size.size_17,
    color: Colors.TITLE_TEXT,
    marginLeft: Metrics.ratio(10),
    // textAlign: "center",
    // flex: 0.8,
  },
  cancelTitleText: {
    marginLeft: 30,
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_16,
    color: Colors.grey,
  },
  imageContainer: {
    position: "absolute",
    left: 50,
    right: 50,
    alignItems: "center",
  },
  imageBorderContainer: {
    height: ImageContainer,
    width: ImageContainer,
    borderWidth: Metrics.ratio(11),
    borderRadius: ImageContainer / 2,
    borderColor: "white",
    overflow: "hidden",
  },
  image: {
    height: ImageHeight,
    width: ImageHeight,
    borderRadius: ImageHeight / 2,
  },
  buttonTextStyle: {
    color: Colors.purply,
    fontFamily: Fonts.manrope.bold,
    fontSize: Fonts.size.size_20,
  },
  buttonStyle: {
    marginBottom: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(20),
    borderWidth: 1,
    borderColor: Colors.purply,
  },
});
