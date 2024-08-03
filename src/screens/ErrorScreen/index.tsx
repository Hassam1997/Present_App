/** @format */

import React from "react"

import { Text, View } from "react-native"
import styles from "./styles"

const ErrorScreen: React.FC<ErrorBoundaryProps> = React.memo(
  ({ errorText }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.icon}> Error🐛</Text>
        <Text style={styles.text}> {errorText}</Text>
      </View>
    )
  }
)

ErrorScreen.defaultProps = {
  errorText: "somethingwrong",
}

export default ErrorScreen
