/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
const styles = StyleSheet.create({
  container: {
    height: Metrics.ratio(46),
    width: Metrics.screenWidth * 0.42,
    backgroundColor: Colors.PRIMARY,
    borderRadius: Metrics.ratio(50),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: Metrics.ratio(5),
    paddingHorizontal: Metrics.ratio(10),
  },
  imageStyle: {
    tintColor: Colors.WHITE,
  },
});

export default styles;
