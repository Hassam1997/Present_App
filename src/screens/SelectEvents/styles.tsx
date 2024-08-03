/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
import { Util } from "../../utils";
export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Metrics.ratio(16),
    paddingTop: Metrics.ratio(16),
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
  imageSliderView: {
    marginTop: Metrics.ratio(15),
    flexDirection: "row",
  },
  imageView: {
    height: Metrics.ratio(45),
    width: Metrics.ratio(45),
    borderRadius: Metrics.ratio(45) / 2,
  },
  crossIconStyle: {
    position: "absolute",
    right: -2,
    top: -6,
  },
  crossIcon: {
    tintColor: Colors.TITLE_TEXT,
  },
  bottomContainer: {
    paddingHorizontal: Metrics.ratio(22),
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    paddingTop: Metrics.ratio(15),
    paddingBottom: Metrics.ratio(30),
    backgroundColor: Colors.WHITE,
  },
});
