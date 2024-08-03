import { StyleSheet, Platform } from "react-native";
import { Colors, Metrics } from "../../theme";
export default StyleSheet.create({
  btnStyle: {
    alignSelf: "center",
    padding: 2,
  },
  imageStyle: {
    height: Metrics.ratio(34),
    width: Metrics.ratio(34),
    borderRadius: Metrics.ratio(34 / 2),
  },
});
