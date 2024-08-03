/** @format */

import React, { useRef, useEffect, useState } from "react"
import { Animated, ViewStyle } from "react-native"
import styles from "./styles"
import Block from "../Block"
import { Colors } from "../../theme"

interface AnimatedImageProps {
  delay: number
  imageSource: any
  setState?: (e: any) => any
}

const AnimatedImage = ({ delay, imageSource }: AnimatedImageProps) => {
  const [value, setVal] = useState(false)
  const activeDotIndex = useRef(new Animated.Value(0)).current
  const fadeAni = useRef<Animated.Value>(new Animated.Value(0)).current
  useEffect(() => {
    //make fadein <-> fadeout loop
    // Animated.sequence([
    //   Animated.delay(delay),
    //   Animated.loop(
    //     Animated.sequence([
    //       Animated.timing(fadeAni, {
    //         toValue: 1,
    //         duration: 1000,
    //         useNativeDriver: true,
    //       }),
    //       Animated.delay(3000),
    //       Animated.timing(fadeAni, {
    //         toValue: 0,
    //         duration: 1000,
    //         useNativeDriver: true,
    //       }),
    //       Animated.delay(1500),
    //     ])
    //   ),
    // ]).start()
    const fadeInDuration = 1000
    const fadeOutDuration = 1000
    const delayDuration = 3000

    const fadeIn = () => {
      return Animated.timing(fadeAni, {
        toValue: 1,
        duration: fadeInDuration,
        useNativeDriver: true,
      })
    }

    const fadeOut = () => {
      return Animated.timing(fadeAni, {
        toValue: 0,
        duration: fadeOutDuration,
        useNativeDriver: true,
      })
    }

    const sequence = Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.sequence([
          fadeIn(),
          Animated.delay(delayDuration),
          fadeOut(),
          Animated.delay(delayDuration / 2),
        ])
      ),
    ])

    // Add an event listener to the opacity animation
    const listenerId = fadeAni.addListener(({ value }) => {
      // The value ranges from 0 to 1. We can consider it as 0 or 1 for simplicity.
      const newState = value === 1 ? true : false
      setVal(newState)
    })

    sequence.start(() => {
      // Remove the event listener when the animation sequence completes
      fadeAni.removeListener(listenerId)
    })

    // Clean up the effect to remove the listener if the component unmounts
    return () => {
      fadeAni.removeListener(listenerId)
    }
  }, [])

  return (
    <>
      <Animated.Image
        style={[
          styles.imageView,
          {
            opacity: fadeAni,
          },
        ]}
        source={imageSource}
      />
      <Block style={styles.dotView}>
        <Block
          style={
            [
              styles.dotStyle,
              {
                backgroundColor: value ? Colors.DARK_GREY : "white",
              },
            ] as ViewStyle
          }
        />
        <Block
          style={
            [
              styles.dotStyle,
              {
                backgroundColor: !value ? Colors.DARK_GREY : "white",
              },
            ] as ViewStyle
          }
        />
      </Block>
    </>
  )
}

export default AnimatedImage

/** @format */

// import React, { useState, useEffect } from "react"
// import { View, Text, Animated } from "react-native"
// import { ButtonView } from "../../components"

// const AnimatedImage = () => {
//   const [state, setState] = useState(false)
//   const position = new Animated.Value(0) // Initial position value

//   useEffect(() => {
//     const duration = 1000 // Adjust the animation duration in milliseconds

//     Animated.timing(position, {
//       toValue: state ? 200 : 0, // Target position based on state value
//       duration: duration,
//       useNativeDriver: true,
//     }).start()
//   }, [state, position])

//   return (
//     <View style={{ flex: 1, backgroundColor: "gray" }}>
//       <Animated.View
//         style={{
//           height: 100,
//           width: 100,
//           borderRadius: 100,
//           borderWidth: 1,
//           transform: [{ translateX: position }], // Apply translation animation
//           position: "absolute",
//           backgroundColor: "red",
//         }}>
//         <Text>red</Text>
//       </Animated.View>
//       <Animated.View
//         style={{
//           height: 100,
//           width: 100,
//           borderRadius: 100,
//           borderWidth: 1,
//           transform: [{ translateX: Animated.subtract(200, position) }], // Apply reverse translation animation
//           position: "absolute",
//           backgroundColor: "blue",
//         }}>
//         <Text>blue</Text>
//       </Animated.View>
//       <View style={{ height: 300 }}></View>
//       <ButtonView
//         onPress={() => {
//           setState(!state)
//         }}>
//         <Text>ssssss</Text>
//       </ButtonView>
//     </View>
//   )
// }

// export default AnimatedImage
