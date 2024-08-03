/** @format */

import { View, StyleSheet, Text, Image } from "react-native"
import PropTypes from "prop-types"
import React from "react"

import { AppStyles, Metrics, Images, Fonts, Colors } from "../../../theme"
// import { strings } from "../../../utils/i18n";
// import { Image, Text } from "../..";

const EmptyViewApi = (props) => {
  const { emptyMessage, text } = props
  return (
    <View style={[AppStyles.container, AppStyles.alignCenterView]}>
      <Image source={Images.images.search} style={styles.image} />
      <Text style={styles.message}>{emptyMessage}</Text>
    </View>
  )
}

EmptyViewApi.propTypes = {
  emptyMessage: PropTypes.string,
}

EmptyViewApi.defaultProps = {
  emptyMessage: "No Result Found",
}

export default EmptyViewApi

const styles = StyleSheet.create({
  message: {
    width: "80%",
    textAlign: "center",
    lineHeight: Metrics.ratio(24),
    marginTop: Metrics.ratio(15),
    fontSize: Fonts.size.size_18,
    color: Colors.PRIMARY,
  },
  image: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
    tintColor: Colors.PRIMARY,
  },
})
