/** @format */

import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
  },
  textStyle: {
    marginTop: Metrics.ratio(16),
  },
  imageView: {
    marginTop: Metrics.ratio(24),
    width: Metrics.ratio(100),
  },
  imageStyle: {
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Metrics.ratio(40),
    overflow: "hidden",
  },
  uploadText: {
    marginTop: Metrics.ratio(6),
  },
  textInputView: {
    marginTop: Metrics.ratio(15),
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
    paddingTop: Metrics.ratio(10),
    paddingBottom: Metrics.ratio(30),
    backgroundColor: Colors.WHITE,
  },
  imageSliderView: {
    marginTop: Metrics.ratio(15),
    alignItems: "center",
  },
  crossIconStyle: {
    position: "absolute",
    right: -28,
    bottom: 28,
    height: 24,
    width: 24,
  },
  imageViewStyle: {
    height: Metrics.ratio(45),
    width: Metrics.ratio(45),
    borderRadius: Metrics.ratio(45) / 2,
  },
  addButton: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: Metrics.ratio(20),
  },
  iconStyle: {
    tintColor: Colors.WHITE,
  },
  addMemberButton: {
    height: Metrics.ratio(24),
    width: Metrics.ratio(24),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_PINK,
    borderRadius: Metrics.ratio(3),
  },
})
