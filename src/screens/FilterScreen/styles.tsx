/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    marginBottom: Metrics.ratio(90),
  },
  seperatorStyle: {
    marginVertical: Metrics.ratio(10),
  },
  buttonContiner: {
    backgroundColor: Colors.WHITE,
    position: "absolute",
    width: Metrics.screenWidth,
    bottom: 0,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    paddingBottom: Metrics.ratio(20),
    paddingTop: 20,
  },
  buttonView: {
    flexDirection: "row",
    width: Metrics.screenWidth,
    justifyContent: "space-between",
    paddingHorizontal: Metrics.ratio(16),
    bottom: Metrics.ratio(10),
  },
  newUserButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    width: Metrics.screenWidth * 0.43,
  },
  saveButton: {
    color: Colors.TITLE_TEXT,
  },
  loginButton: {
    width: Metrics.screenWidth * 0.43,
  },
  circleView: {
    bottom: Metrics.ratio(7),
    alignItems: "center",
  },
  priceText: {
    fontFamily: Fonts.manrope.semiBold,
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
    bottom: Metrics.ratio(15),
  },
  unselected: {
    backgroundColor: Colors.LIGHT_GREY,
    height: 5,
  },
  selected: {
    backgroundColor: Colors.PRIMARY_PINK,
    height: 5,
  },
  sliderContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
  },
  tagView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Metrics.ratio(40),
  },
})
