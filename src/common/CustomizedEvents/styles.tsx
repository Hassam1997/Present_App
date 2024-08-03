/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  subContainerStyle: {
    flex: 1,
    marginTop: Metrics.ratio(16),
  },
  calenderButton: {
    flexDirection: "row",
    paddingHorizontal: Metrics.ratio(16),
    alignItems: "center",
  },
  imageStyle: {
    height: Metrics.ratio(18),
    width: Metrics.ratio(18),
    tintColor: Colors.TITLE_TEXT,
    left: Metrics.ratio(2),
  },
  cardContainer: {
    justifyContent: "space-evenly",
    paddingHorizontal: Metrics.ratio(15),
    paddingRight: Metrics.ratio(20),
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
    marginVertical: Metrics.ratio(12),
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
    marginVertical: Metrics.ratio(12),
  },
  categoryText: {
    fontSize: Fonts.size.size_12,
    marginHorizontal: Metrics.ratio(5),
    color: Colors.BLACK,
  },
  timeRemaining: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.ratio(115),
    borderRadius: Metrics.ratio(20),
    height: Metrics.ratio(28),
    borderColor: Colors.DARK_GREY,
    borderWidth: 1,
    marginTop: Metrics.ratio(10),
  },
  timeRemainingText: {
    marginHorizontal: Metrics.ratio(5),
    color: Colors.DARK_GREY,
  },
  horizontalCalendarStyle: {
    bottom: Metrics.ratio(20),
  },
})
