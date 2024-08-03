/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  imageBackground: {
    width: Metrics.ratio(323),
    height: Metrics.ratio(170),
    marginLeft: Metrics.ratio(16),
    overflow: "hidden",
    borderRadius: Metrics.ratio(10),
  },
  contentContainer: {
    paddingHorizontal: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(18),
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: Metrics.ratio(81),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(2),
    backgroundColor: Colors.SKY_BLUE_1,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  categoryContainerCustomize: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: Metrics.ratio(100),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(2),
    backgroundColor: Colors.PURPLE02,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  calendarIcon: {
    tintColor: Colors.BLUE,
    width: Metrics.ratio(13),
    height: Metrics.ratio(13),
    marginRight: Metrics.ratio(5),
  },
  calendarCustomizeIcon: {
    tintColor: Colors.TEXT_PURPLE,
    width: Metrics.ratio(13),
    height: Metrics.ratio(13),
    marginRight: Metrics.ratio(5),
  },
  categoryText: {
    color: Colors.BLUE,
    fontSize: Fonts.size.size_12,
  },
  categoryCustomizeText: {
    color: Colors.TEXT_PURPLE,
    fontSize: Fonts.size.size_12,
  },
  titleText: {
    color: Colors.WHITE,
    marginVertical: Metrics.ratio(10),
    height: Metrics.ratio(60),
  },
  dateText: {
    color: Colors.WHITE,
  },
  buttonView: {
    alignItems: "center",
    width: Metrics.ratio(115),
    height: Metrics.ratio(24),
    borderRadius: Metrics.ratio(20),
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  buttonText: {
    color: Colors.BLUE,
    fontSize: Fonts.size.size_13,
  },
})
