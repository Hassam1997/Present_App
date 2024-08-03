/** @format */

import React from "react"
import { Image, StyleSheet, View, Text } from "react-native"
import PropTypes from "prop-types"
import { Colors, Images, Metrics } from "../../theme"
import styles from "./styles"

const images = {}

const EmptyView = (props) => {
  const { image, title, text, containerStyle, imageStyle, onWhite } = props

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Image
        resizeMode="contain"
        source={Images.emptyImages[image]}
        style={[styles.image, imageStyle]}
      />
      {title && (
        <Text
          style={StyleSheet.flatten([
            { color: onWhite ? Colors.dark : Colors.WHITE },
            styles.title,
          ])}>
          {title}
        </Text>
      )}
      <Text style={StyleSheet.flatten([styles.text])}>{text}</Text>
    </View>
  )
}

EmptyView.propTypes = {
  arrowTowards: PropTypes.oneOf(["right", "left"]),
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  indented: PropTypes.bool,
  containerStyle: PropTypes.object,
  withoutImage: PropTypes.bool,
  imageStyle: PropTypes.object,
}
EmptyView.defaultProps = {
  arrowTowards: "right",
  image: "location",
  indented: false,
  withoutImage: false,
  withoutArrow: false,
}

export default React.memo(EmptyView)
