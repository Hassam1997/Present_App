import { StyleSheet } from "react-native";
import { Metrics, Fonts, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.APP_BACKGROUND,
  },
  image: {
    height: Metrics.ratio(154),
    width: Metrics.ratio(170),
  },
  title: {
    marginHorizontal: 40,
    textAlign: "center",
    fontSize: Fonts.size.size_32,
    fontFamily: Fonts.manrope.bold,
    lineHeight: Metrics.ratio(34),
    marginTop: Metrics.ratio(32),
  },
  text: {
    textAlign: "center",
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.manrope.regular,
    marginTop: Metrics.ratio(20),
    color: Colors.FILTER,
  },
});
