/** @format */

import React from "react"
import { StyleProp, Text, ViewStyle } from "react-native"
import styles from "./styles"
import Block from "../Block"

interface SeperatorProps {
  single?: boolean
  containerStyle?: StyleProp<ViewStyle>
}

const Seperator: React.FC<SeperatorProps> = ({
  single,
  containerStyle,
}: any) => {
  return (
    <>
      {single ? (
        <Block style={[styles.container, containerStyle] as ViewStyle}>
          <Block style={styles.singleSeperator} />
        </Block>
      ) : (
        <Block style={styles.container}>
          <Block style={styles.seperator} />
          <Text style={styles.text}>or</Text>
          <Block style={styles.seperator} />
        </Block>
      )}
    </>
  )
}

export default Seperator
