/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
import { Util } from "../../utils"
export default StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    marginBottom: Metrics.ratio(90),
    paddingBottom: Metrics.ratio(100),
  },
  bottomContainer: {
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(20),
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
    paddingBottom: Metrics.ratio(30),
    paddingTop: 20,
  },
  blackbox: {
    backgroundColor: Colors.BLACK,
    height: Metrics.ratio(25),
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    borderRadius: Metrics.ratio(5),
  },
  amazonIcon: {
    width: Metrics.ratio(70),
    height: Metrics.ratio(20),
  },
  priceView: {
    marginVertical: Metrics.ratio(15),
    width: Metrics.ratio(205),
    justifyContent: "space-between",
    alignItems: "center",
  },
  pinkbox: {
    backgroundColor: Colors.LIGHT_PINK,
    height: Metrics.ratio(25),
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 80,
    borderRadius: Metrics.ratio(5),
    flexDirection: "row",
  },
  graybox: {
    backgroundColor: Colors.LIGHT_GREY_BOX,
    height: Metrics.ratio(30),
    width: Metrics.ratio(80),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Metrics.ratio(8),
    borderRadius: Metrics.ratio(5),
  },
  buttonView: {
    flexDirection: "row",
    width: Metrics.screenWidth,
    justifyContent: "space-between",
    paddingHorizontal: Metrics.ratio(16),
    bottom: Metrics.ratio(10),
  },
  addtogroup: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    marginHorizontal: 16,
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
  giftContainer: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    height: Metrics.ratio(76),
    width: Metrics.screenWidth * 0.92,
    alignSelf: "center",
    borderRadius: Metrics.ratio(5),
    alignItems: "center",
    flexDirection: "row",
    marginVertical: Metrics.ratio(16),
    paddingLeft: Metrics.ratio(15),
  },
  giftTextView: {
    paddingLeft: Metrics.ratio(15),
    flexWrap: "wrap",
  },
  giftText: {
    color: Colors.WHITE,
    fontFamily: Fonts.manrope.semiBold,
    fontSize: Fonts.size.size_16,
  },
  categoryContainerPink: {
    justifyContent: "center",
    flexDirection: "row",
    width: Metrics.ratio(119),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(10),
    marginBottom: Metrics.ratio(9),
    backgroundColor: Colors.PINK,
    borderColor: Colors.DARK_PINK,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: Fonts.size.size_12,
    marginHorizontal: Metrics.ratio(5),
    color: Colors.BLACK,
  },
  imageStyle1: {
    width: Metrics.ratio(32),
    height: Metrics.ratio(32),
    borderRadius: Metrics.ratio(16),
  },
  iconStyles: {
    tintColor: Colors.BLACK,
  },
  dateText: {
    fontSize: Fonts.size.size_14,
    marginHorizontal: Metrics.ratio(5),
    color: Colors.TITLE_TEXT,
  },
  iconImageStyleHeader: {
    transform: [{ rotate: "90deg" }],
  },
})
