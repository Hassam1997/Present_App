/** @format */

import { StyleSheet } from "react-native"
import { Colors, Metrics } from "../../theme"

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: Metrics.ratio(5),
  },
  imageContainer: {
    height: Metrics.ratio(150),
    overflow: "hidden",
    borderRadius: Metrics.ratio(10),
    backgroundColor: Colors.LIGHT_GREY,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: Metrics.ratio(150),
    width: Metrics.ratio(175),
    borderRadius: Metrics.ratio(10),
  },
  priceTypeContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: Metrics.ratio(78),
    borderRadius: Metrics.ratio(8),
    paddingVertical: Metrics.ratio(5),
    top: 10,
    left: 10,
    backgroundColor: Colors.PINK,
  },
  priceTypeContainerAbsoluteTop: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: Metrics.ratio(105),
    borderBottomRightRadius: Metrics.ratio(8),
    paddingVertical: Metrics.ratio(8),
    top: 0,
    left: 0,
    backgroundColor: Colors.BLACK,
  },
  priceTypeImage: {
    width: Metrics.ratio(15),
    height: Metrics.ratio(15),
  },
  wishlistButton: {
    position: "absolute",
    width: Metrics.ratio(24),
    borderRadius: Metrics.ratio(5),
    top: 10,
    right: 10,
    padding: 8,
    paddingHorizontal: 15,
  },
  wishlistIcon: {
    tintColor: Colors.DARK_PINK,
    right: 10,
    bottom: 8,
  },
  brandIcon: {
    width: Metrics.ratio(70),
    height: Metrics.ratio(15),
    marginVertical: Metrics.ratio(10),
  },
  productDescription: {
    fontSize: Metrics.ratio(12),
    width: Metrics.screenWidth * 0.4,
    height: Metrics.ratio(50),
  },
  priceText: {
    marginTop: Metrics.ratio(10),
  },
  salePrice: {
    fontSize: Metrics.ratio(14),
    marginTop: Metrics.ratio(5),
    color: Colors.APP_TEXT,
    textDecorationLine: "line-through",
  },
  priceType: {
    color: Colors.DARK_PINK,
    fontSize: Metrics.ratio(10),
  },
  presentText: { color: Colors.WHITE, fontSize: Metrics.ratio(10) },
  selected: { color: Colors.DARK_PINK, fontSize: Metrics.ratio(10) },
  createButton: {
    height: Metrics.ratio(26),
    width: Metrics.ratio(26),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_PINK,
    position: "absolute",
    borderRadius: Metrics.ratio(4),
    bottom: Metrics.ratio(10),
    right: Metrics.ratio(10),
  },
  addImage: {
    height: Metrics.ratio(16.421),
    width: Metrics.ratio(16.421),
  },
})

export default styles
