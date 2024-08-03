/** @format */
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";
export default StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.WHITE,
    paddingBottom: Metrics.bottomPadding,
    flexGrow: 1,
  },
  imageView: {
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(40),
  },
  editButtonView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Metrics.ratio(6),
  },
  editIconStyle: {
    height: Metrics.ratio(16),
    width: Metrics.ratio(16),
  },
  addButton: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(5),
    paddingHorizontal: Metrics.ratio(16),
  },
  iconStyle: {
    tintColor: Colors.PRIMARY_PINK,
  },
  seperatorStyle: {
    marginVertical: Metrics.ratio(10),
  },
  categoryContainerPink: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: Metrics.ratio(119),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(4),
    backgroundColor: Colors.PINK,
    borderColor: Colors.DARK_PINK,
    borderWidth: 1,
    alignItems: "center",
    margin: Metrics.ratio(16),
  },
  categoryContainerBlue: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: Metrics.ratio(100),
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(6),
    paddingHorizontal: Metrics.ratio(8),
    backgroundColor: Colors.SKY_BLUE,
    borderColor: Colors.SKY_BLUE_BORDER,
    borderWidth: 1,
    alignItems: "center",
    margin: Metrics.ratio(16),
    marginLeft: Metrics.ratio(16),
  },
  contactGroupStyle: {
    paddingTop: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(16),
  },
  cardView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarStyle: {
    height: Metrics.ratio(50),
    width: Metrics.ratio(50),
    borderRadius: Metrics.ratio(50),
  },
  categoryText: {
    fontSize: Fonts.size.size_12,
    marginHorizontal: Metrics.ratio(5),
    color: Colors.BLACK,
  },
});
