/** @format */

import { View, StyleSheet, Text, Image } from "react-native"
import PropTypes from "prop-types"
import React from "react"

import { AppStyles, Metrics, Images, Colors, Fonts } from "../../../theme"
import { ButtonView } from "../.."

const ErrorViewApi = (props) => {
  const { errorMessage, onPressRetry, containerStyle, onWhite } = props
  return (
    <View
      style={[
        AppStyles.container,
        AppStyles.alignCenterView,
        // { backgroundColor: Colors.white },
        containerStyle,
      ]}>
      {/* <Image
        source={Images.images.internetConnectionError}
        style={styles.image}
      /> */}
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <ButtonView onPress={onPressRetry} style={styles.retryButton}>
        <Text style={styles.retryMessage}>{"retry".toLocaleUpperCase()}</Text>
      </ButtonView>
    </View>
  )
}

ErrorViewApi.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onPressRetry: PropTypes.func.isRequired,
  containerStyle: PropTypes.style,
}

ErrorViewApi.defaultProps = { containerStyle: {} }

export default ErrorViewApi

const styles = StyleSheet.create({
  errorMessage: {
    // width: "80%",
    textAlign: "center",
    lineHeight: Metrics.ratio(24),
    marginTop: Metrics.ratio(32),
    marginBottom: Metrics.ratio(24),
    fontSize: Fonts.size.size_17,
    color: Colors.black,
  },
  retryMessage: {
    fontSize: Fonts.size.size_14,
    color: Colors.WHITE,
  },
  retryButton: {
    paddingVertical: Metrics.midMargin,
    paddingHorizontal: Metrics.baseMargin * 2,
    borderRadius: Metrics.ratio(4),
    backgroundColor: Colors.PRIMARY,
  },
  image: { marginTop: Metrics.ratio(-50) },
})
