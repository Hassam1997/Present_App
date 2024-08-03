/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
import { Util } from "../../utils"
export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Metrics.ratio(13),
  },
  buttonContainer: {
    marginTop: Metrics.ratio(12),
  },
  policyText: {
    color: Colors.APP_TEXT,
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
    marginTop: Metrics.ratio(26),
    alignSelf: "center",
    width: Metrics.screenWidth * 0.9,
    textAlign: "center",
  },
  polictTextPrimary: {
    top: Util.isPlatformIOS() ? 3 : 5,
  },
  customCardContainer: {
    paddingHorizontal: Metrics.ratio(5),
    marginBottom: Metrics.ratio(10),
  },
  btnSearch: {
    flex: 3,
    paddingLeft: Metrics.ratio(10),
    paddingRight: Metrics.ratio(20),
  },
  searchIcon: {
    tintColor: Colors.DARK_GREY,
    width: 24,
    height: 24,
  },
  catagoryButton: {
    height: Metrics.ratio(30),
    width: Metrics.ratio(92),
    justifyContent: "space-evenly",
    borderRadius: Metrics.ratio(5),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: Metrics.ratio(5),
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
    marginBottom: Metrics.ratio(10),
  },
  containerStyleHeader: {
    paddingHorizontal: Metrics.ratio(5),
  },
})
