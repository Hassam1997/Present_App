/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
export default StyleSheet.create({
  containerStyle: {
    paddingHorizontl: 16,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    flex: 1,
  },
  imageBackground: {
    overflow: "hidden",
    borderRadius: Metrics.ratio(10),
    height: Metrics.ratio(126.38),
    marginHorizontal: Metrics.ratio(Metrics.PaddingHorizontalValue),
  },
  content: {
    flex: 1,
    width: Metrics.ratio(230),
    paddingLeft: Metrics.ratio(22),
    borderRadius: Metrics.ratio(10),
  },
  title: {
    marginVertical: Metrics.ratio(13),
    color: Colors.WHITE,
    fontSize: Fonts.size.size_14,
    paddingRight: Metrics.ratio(20),
  },
  banner: {
    height: Metrics.ratio(34),
    width: Metrics.ratio(200),
    backgroundColor: Colors.LIGHT_GREY,
    flexDirection: "row",
    borderRadius: Metrics.ratio(5),
    paddingLeft: Metrics.ratio(10),
    alignItems: "center",
  },
  textInputStyle: {
    width: Metrics.ratio(115),
    marginHorizontal: Metrics.ratio(10),
    height: Metrics.ratio(34),
    alignItems: "center",
    color: Colors.APP_TEXT,
    padding: 0,
    fontSize: Fonts.size.size_14,
  },
  button: {
    height: Metrics.ratio(34),
    width: Metrics.ratio(36),
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "flex-end",
    borderRadius: Metrics.ratio(5),
    backgroundColor: Colors.PRIMARY_PINK,
  },
  buttonText: {
    color: Colors.RED,
  },

  image: {
    height: Metrics.ratio(129),
    width: Metrics.ratio(98),
  },
  seperatorContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    width: "90%",
    alignSelf: "center",
    marginVertical: Metrics.ratio(10),
  },
  scrollViewContainer: {
    flex: 1,
  },
  giftContainer: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    height: Metrics.ratio(76),
    width: Metrics.screenWidth * 0.92,
    alignSelf: "center",
    borderRadius: Metrics.ratio(10),
    alignItems: "center",
    flexDirection: "row",
    marginVertical: Metrics.ratio(16),
    paddingLeft: Metrics.ratio(15),
    justifyContent: "space-between",
  },
  giftTextView: {
    paddingLeft: Metrics.ratio(15),
    flexWrap: "wrap",
  },
  giftText: {
    color: Colors.WHITE,
    fontFamily: Fonts.manrope.semiBold,
    fontSize: Fonts.size.size_16,
    width: Metrics.ratio(220),
  },
  eventTextWithImagecontainerImage: {
    tintColor: Colors.WHITE,
    right: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(15),
  },
});
