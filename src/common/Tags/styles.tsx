/** @format */
/** @format */
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  blockView: {
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(12),
    borderWidth: 1,
    marginHorizontal: Metrics.ratio(4),
    marginVertical: Metrics.ratio(8),
    borderRadius: Metrics.ratio(5),
    backgroundColor: Colors.WHITE,
    borderColor: Colors.DISABLE_BUTTON,
  },
});
