/** @format */
import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../theme"
export default StyleSheet.create({
  bottomContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  subText: {
    textAlign: "center",
    marginVertical: Metrics.ratio(10),
    width: Metrics.screenWidth * 0.8,
  },
  buttonView: {
    flexDirection: "row",
    width: Metrics.screenWidth * 0.9,
    justifyContent: "space-between",
  },
  newUserButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.WHITE,
    width: Metrics.screenWidth * 0.43,
  },
  loginButton: {
    width: Metrics.screenWidth * 0.43,
  },
  dots: {
    marginTop: Metrics.ratio(18),
    marginBottom: Metrics.ratio(32),
    alignItems: "center",
    width: Metrics.ratio(30),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  policyView: {
    marginVertical: Metrics.ratio(30),
    width: Metrics.screenWidth * 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seperatorView: {
    width: 2,
    height: 15,
    backgroundColor: Colors.PRIMARY,
  },
})
