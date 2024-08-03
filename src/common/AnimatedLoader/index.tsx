/** @format */

import React, { useEffect, useRef } from "react"
import { Animated, Easing } from "react-native"
import styles from "./styles"
import Lottie from "lottie-react-native"
import { Images } from "../../theme"

interface AnimatedLoaderProps {
  imageSource?: any
}

const AnimatedLoader = ({ imageSource }: AnimatedLoaderProps) => {
  return (
    <Lottie
      style={styles.lottieStyle}
      source={Images.lottie.loader}
      autoPlay
      loop
    />
  )
}

export default AnimatedLoader
