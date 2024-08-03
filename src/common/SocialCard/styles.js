/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.WHITE,
    width: Metrics.screenWidth,
    alignItems: "center",
  },
  cardContainer: {
    width: Metrics.screenWidth * 0.94,
    paddingVertical: Metrics.ratio(8),
    backgroundColor: Colors.WHITE,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    left: Metrics.ratio(10),
  },
  socialIcon: {
    left: Metrics.ratio(20),
  },
  socialIconInsta: {
    left: Metrics.ratio(30),
  },
  desc: {
    width: Metrics.screenWidth * 0.82,
    marginVertical: Metrics.ratio(10),
  },
  bannerView: {
    height: Metrics.ratio(150),
    width: Metrics.screenWidth * 0.94,
  },
  buttonStyle: {
    alignSelf: "flex-end",
    marginTop: Metrics.ratio(15),
  },
  clipboardButton: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    paddingVertical: Metrics.ratio(8),
    paddingHorizontal: Metrics.ratio(18),
    borderRadius: 20,
  },
  shareButton: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    paddingVertical: Metrics.ratio(8),
    paddingHorizontal: Metrics.ratio(18),
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY,
  },
  likeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Metrics.screenWidth * 0.94,
    alignItems: "center",
    marginTop: Metrics.ratio(13),
  },
  likeText: {
    paddingHorizontal: Metrics.ratio(5),
  },
  view: {
    textDecorationLine: "underline",
    marginVertical: Metrics.ratio(15),
    alignSelf: "flex-end",
  },
  descText: {
    lineHeight: Metrics.ratio(18),
    textAlign: "justify",
  },
  buttonView: {
    width: Metrics.screenWidth * 0.3,
    alignSelf: "flex-end",
  },
  imageView: {
    height: Metrics.ratio(35),
    width: Metrics.ratio(35),
    borderRadius: Metrics.ratio(35) / 2,
    overflow: "hidden",
  },
});

export default styles;
