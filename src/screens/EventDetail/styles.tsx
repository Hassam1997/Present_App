/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    paddingTop: Metrics.ratio(16),
    paddingBottom: Metrics.bottomPadding,
  },
  listViewContainer: {
    flexDirection: "row",
  },
  nameText: {
    width: Metrics.screenWidth * 0.3,
    fontFamily: Fonts.manrope.medium,
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
  },
  valueText: {
    width: Metrics.screenWidth * 0.5,
    fontFamily: Fonts.manrope.regular,
    fontSize: Fonts.size.size_14,
    color: Colors.TITLE_TEXT,
  },
  addBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  addView: {
    backgroundColor: Colors.PRIMARY_PINK,
    height: Metrics.ratio(24),
    width: Metrics.ratio(24),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Metrics.ratio(5),
  },
  categoryContainerBlue: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: Metrics.ratio(100),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(8),
    backgroundColor: Colors.SKY_BLUE,
    borderColor: Colors.SKY_BLUE_BORDER,
    borderWidth: 1,
    alignItems: "center",
  },
  categoryContainerPink: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: Metrics.ratio(119),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(4),
    backgroundColor: Colors.PINK,
    borderColor: Colors.DARK_PINK,
    borderWidth: 1,
    alignItems: "center",
  },
  seperatorStyle: {
    marginVertical: Metrics.ratio(5),
    marginBottom: Metrics.ratio(15),
  },
  addButton: {
    width: Metrics.ratio(80),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconStyle: {
    tintColor: Colors.PRIMARY_PINK,
  },
  crossIcon: {
    tintColor: Colors.TITLE_TEXT,
  },
  timeRemainingStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.ratio(115),
    borderRadius: Metrics.ratio(20),
    height: Metrics.ratio(28),
    borderColor: Colors.DARK_GREY,
    borderWidth: 1,
  },
  timeRemainingText: {
    marginHorizontal: Metrics.ratio(5),
    color: Colors.DARK_GREY,
    fontSize: Fonts.size.size_14,
  },
  timeRemaining: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.ratio(115),
    borderRadius: Metrics.ratio(20),
    height: Metrics.ratio(26),
    borderColor: Colors.DARK_GREY,
    borderWidth: 1,
    marginTop: Metrics.ratio(10),
    backgroundColor: Colors.TIME_BG,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
  },
})
