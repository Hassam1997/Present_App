/** @format */

import { StyleSheet } from "react-native"
import { Colors, Metrics } from "../../theme"
const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: Colors.DARK_PINK,
    height: 5,
    color: "red",
    marginLeft: 55,
    borderRadius: 20,
    overflow: "hidden",
    alignContent: "center",
    width: Metrics.screenWidth * 0.05,
  },
  indicatorStyleCustom: {
    backgroundColor: Colors.DARK_PINK,
    height: 5,
    color: "red",
    marginLeft: 15,
    borderRadius: 20,
    overflow: "hidden",
    alignContent: "center",
    width: Metrics.screenWidth * 0.05,
  },
  indicatorContainerStyle: {
    alignItems: "center",
  },
  tabbarStyle: {
    paddingBottom: 2,
    backgroundColor: Colors.WHITE,
    width: Metrics.screenWidth,
  },
  labelStyle: {
    color: Colors.GRAY,
  },
  tabStyle: {
    width: Metrics.screenWidth / 3,
  },
})

export default styles
