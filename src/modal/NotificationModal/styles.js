/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

const ImageContainer = Metrics.screenWidth * 0.32;
const ImageHeight = Metrics.screenWidth * 0.27;

export default StyleSheet.create({
  modal: {
    margin: 0,
    // justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    borderRadius: 20,
    paddingTop: Metrics.ratio(10),
    // paddingBottom: Metrics.bottomPadding,
    width: Metrics.screenWidth * 0.72,
    height: Metrics.screenHeight * 0.2758,
    alignItems: "center",
    // justifyContent: "flex-end",
  },
  tagViewStyle: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.CHARCOALGREY,
    marginBottom: 20,
  },
  itemContainer: {
    height: 51,
    flexDirection: "row",
    marginHorizontal: Metrics.ratio(30),
  },
  halfContainer: {
    height: ImageContainer / 2,
  },
  textStyle: {
    color: Colors.black,
    fontSize: Fonts.size.size_12,
    // backgroundColor: 'red',
  },
  selectedTextStyle: {
    fontFamily: Fonts.manrope.semiBold,
    color: Colors.primary,
  },
  thanksStyle: {
    // alignSelf: "flex-end",
    // bottom: 0,
    borderTopWidth: Metrics.ratio(0.5),
    borderColor: Colors.WHITE,
    height: Metrics.ratio(42),
    width: Metrics.screenWidth * 0.72,
    justifyContent: "center",
    alignItems: "center",
  },
  backImageStyle: {
    width: Metrics.screenWidth * 0.872,
    height: Metrics.screenHeight * 0.6939,
    position: "absolute",
    borderRadius: Metrics.ratio(14),
  },
  imageStyle: {
    width: Metrics.ratio(79.08),
    height: Metrics.ratio(58.5),
    marginBottom: Metrics.ratio(20),
  },
  descriptionStyle: { marginVertical: 12 },
  crossContainer: {
    position: "absolute",
    right: 15,
    top: 15,
    width: Metrics.ratio(32),
    height: Metrics.ratio(32),
    borderRadius: Metrics.ratio(16),
    backgroundColor: Colors.black05,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_16,
    color: Colors.grey,
  },
  textBlocks: {
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
  cancelTitleText: {
    marginLeft: 30,
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_16,
    color: Colors.grey,
  },
  resetTitleText: {
    // marginRight: 30,
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
    color: Colors.white,
    fontFamily: Fonts.manrope.bold,
  },
  buttonTextStyle1: {
    fontFamily: Fonts.manrope.bold,
  },
  buttonStyle: {
    width: Metrics.screenWidth * 0.6,
    marginBottom: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(20),
  },
  buttonStyle1: {
    width: Metrics.screenWidth * 0.6,
    borderWidth: 2,
    borderColor: Colors.white,
    marginBottom: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(20),
    backgroundColor: Colors.transparent,
  },
});
