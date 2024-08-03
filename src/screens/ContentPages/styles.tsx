/** @format */
import { StyleSheet } from "react-native"
import { Metrics, Colors, Fonts } from "../../theme"
const styles: StyleSheetProps = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
  },
  viewText: { backgroundColor: Colors.WHITE, padding: 20, color: "red" },
  textStyle: {
    fontSize: Fonts.size.size_14,
    color: Colors.GRAY,
    left: Metrics.ratio(10),
    width: Metrics.screenWidth * 0.7,
  },
  checkboxView: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Metrics.ratio(16),
  },
  buttonView: {
    marginBottom: Metrics.bottomPadding,
    paddingTop: Metrics.ratio(10),
  },
})

export default styles
