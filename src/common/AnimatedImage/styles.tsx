/** @format */

import { StyleSheet } from "react-native"

export default StyleSheet.create({
  imageView: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  dotView: {
    width: 30,
    bottom: 150,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 10,
  },
})
