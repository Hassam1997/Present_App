import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export const styles = StyleSheet.create({
  activeIndicator: {
    backgroundColor: "#BC2F27",
    height: 5,
    width: 5,
    borderRadius: 50,
    marginBottom: 8,
    position: "absolute",
    top: 12,
  },
  icon: {
    height: Metrics.ratio(28),
    width: Metrics.ratio(28),
    marginTop: Metrics.ratio(10),
  },
  iconPlaceholder: {
    height: Metrics.ratio(28),
    width: Metrics.ratio(28),
    borderRadius: Metrics.ratio(50),
  },
  labelFont: {
    fontSize: Fonts.size.size_12,
    marginTop: Metrics.ratio(6),
    fontFamily: Fonts.manrope.regular,
    color: Colors.DARK_GREY,
  },
  labelFontInActive: {
    fontSize: Fonts.size.size_12,
    marginTop: Metrics.ratio(6),
    fontFamily: Fonts.manrope.semiBold,
    color: Colors.PRIMARY,
  },
});
